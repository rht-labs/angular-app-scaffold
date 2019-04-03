pipeline {

    agent {
        // label "" also could have been 'agent any' - that has the same meaning.
        label "master"
    }

    environment {
        // GLobal Vars
        PIPELINES_NAMESPACE = "labs-ci-cd"
        APP_NAME = "angular-fe"

        JENKINS_TAG = "${JOB_NAME}.${BUILD_NUMBER}".replace("/", "-")
        JOB_NAME = "${JOB_NAME}".replace("/", "-")

        GIT_SSL_NO_VERIFY = true
        GIT_CREDENTIALS = credentials('labs-ci-cd-jenkins-git-password')
        NEXUS_CREDS = credentials('labs-ci-cd-nexus-password')

        GITLAB_DOMAIN = "gitlab-labs-ci-cd.apps.somedomain.com"
        GITLAB_PROJECT = "labs"
        SONAR_SCANNER_HOME = tool "sonar-scanner-tool"
    }

    // The options directive is for configuration that applies to the whole job.
    options {
        buildDiscarder(logRotator(numToKeepStr: '50', artifactNumToKeepStr: '1'))
        timeout(time: 15, unit: 'MINUTES')
        ansiColor('xterm')
        timestamps()
    }

    stages {
        stage("prepare environment for master deploy") {
            agent {
                node {
                    label "master"
                }
            }
            when {
              expression { GIT_BRANCH ==~ /(.*master)/ }
            }
            steps {
                script {
                    // Arbitrary Groovy Script executions can do in script tags
                    env.PROJECT_NAMESPACE = "labs-test"
                    env.NODE_ENV = "test"
                    env.E2E_TEST_ROUTE = "oc get route/${APP_NAME} --template='{{.spec.host}}' -n ${PROJECT_NAMESPACE}".execute().text.minus("'").minus("'")
                }
            }
        }
        stage("prepare environment for develop deploy") {
            agent {
                node {
                    label "master"
                }
            }
            when {
              expression { GIT_BRANCH ==~ /(.*develop)/ }
            }
            steps {
                script {
                    // Arbitrary Groovy Script executions can do in script tags
                    env.PROJECT_NAMESPACE = "labs-dev"
                    env.NODE_ENV = "dev"
                    env.E2E_TEST_ROUTE = "oc get route/${APP_NAME} --template='{{.spec.host}}' -n ${PROJECT_NAMESPACE}".execute().text.minus("'").minus("'")
                }
            }
        }
        stage("Apply cluster configs") {
            agent {
                node {
                    label "jenkins-slave-ansible"
                }
            }
            when {
              expression { GIT_BRANCH ==~ /(.*master|.*develop)/ }
            }
            steps {
                echo '### Apply cluster configs ###'
                sh  '''
                        printenv
                    '''
                sh  '''
                        cd .openshift-applier
                        ansible-galaxy install -r requirements.yml --roles-path=roles
                        ansible-playbook apply.yml -e target=app -i inventory/
                    '''
            }
        }
        stage("node-build") {
            agent {
                node {
                    label "jenkins-slave-npm"
                }
            }
            steps {
                // git branch: 'develop',
                //     credentialsId: 'jenkins-git-creds',
                //     url: 'https://gitlab-labs-ci-cd.apps.somedomain.com/labs/angular-fe.git'
                sh 'printenv'

                echo '### Install deps ###'
                sh 'npm install'

                echo '### Install deps ###'
                sh 'npm run clean'

                echo '### Running linter ###'
                sh 'npm run lint'

                echo '### Running tests ###'
                sh 'npm run test:ci'
                sh 'npm run e2e:ci'

                // echo '### Running sonar scanner ###'
                // script {
                //     def scannerHome = tool 'sonar-scanner-tool';
                //     withSonarQubeEnv('sonar') {
                //         sh "${scannerHome}/bin/sonar-runner"
                //      }
                //  }
                echo '### Running build ###'
                sh '''
                    npm run build
                '''

                // echo '### Running pact tests ###'
                // sh 'npm run pact:test'
                // sh '''
                //     if [ -z "${NODE_ENV}" ];then
                //     echo "We are in feature branch, not publishing Pact contract"
                //     else
                //     npm run pact:publish
                //     fi
                // '''
                // echo '### Checking of Pact Broker returns deployable for our versions ###'
                // script {
                //     try {
                //         sh '''
                //             if [ -z "${NODE_ENV}" ];then
                //             echo "We are in feature branch, not verifying Pact contract"
                //             else
                //             npm run pact:verify
                //             fi
                //         '''
                //     } catch (exc) {
                //         echo 'Pact Contract not verified!'
                //         currentBuild.result = 'UNSTABLE'
                //     }
                // }
                echo '### Packaging App for Nexus ###'
                sh 'npm run package'
                sh 'npm run publish'
            }
            // Post can be used both on individual stages and for the entire build.
            post {
                always {
                    archiveArtifacts "**"
                    junit 'reports/unit/junit-report.xml'
                    // publish html
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'reports/coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'FE Code Coverage'
                    ]
                    junit 'reports/e2e/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'reports/e2e',
                        reportFiles: 'chrome-*.html,firefox-*.html',
                        reportName: 'E2E Test Reports'
                    ]
                    // Notify slack or some such
                }
                success {
                    echo "Git tagging"
                    sh'''
                        git config --global user.email "jenkins@example.com"
                        git config --global user.name "jenkins-ci"
                        git tag -a ${JENKINS_TAG} -m "JENKINS automated commit"
                        git push https://${GIT_CREDENTIALS_USR}:${GIT_CREDENTIALS_PSW}@${GITLAB_DOMAIN}/${GITLAB_PROJECT}/${APP_NAME}.git --tags
                    '''
                }
            }
        }

        stage("node-bake") {
            agent {
                node {
                    label "master"
                }
            }
            when {
                expression { GIT_BRANCH ==~ /(.*master|.*develop)/ }
            }
            steps {
                echo '### Get Binary from Nexus ###'
                sh  '''
                        rm -rf package-contents*
                        curl -v -f http://${NEXUS_CREDS}@${NEXUS_SERVICE_HOST}:${NEXUS_SERVICE_PORT}/repository/labs-static/com/redhat/fe/${JENKINS_TAG}/package-contents.zip -o package-contents.zip
                        unzip package-contents.zip
                    '''
                echo '### Create Linux Container Image from package ###'
                sh  '''
                        oc project ${PIPELINES_NAMESPACE} # probs not needed
                        oc patch bc ${APP_NAME} -p "{\\"spec\\":{\\"output\\":{\\"to\\":{\\"kind\\":\\"ImageStreamTag\\",\\"name\\":\\"${APP_NAME}:${JENKINS_TAG}\\"}}}}"
                        oc start-build ${APP_NAME} --from-dir=package-contents/ --follow
                    '''
            }
        }

        stage("node-deploy") {
            agent {
                node {
                    label "master"
                }
            }
            when {
                expression { GIT_BRANCH ==~ /(.*master|.*develop)/ }
            }
            steps {
                echo '### tag image for namespace ###'
                sh  '''
                    oc project ${PROJECT_NAMESPACE}
                    oc tag ${PIPELINES_NAMESPACE}/${APP_NAME}:${JENKINS_TAG} ${PROJECT_NAMESPACE}/${APP_NAME}:${JENKINS_TAG}
                    '''
                echo '### set env vars and image for deployment ###'
                sh '''
                    oc set image dc/${APP_NAME} ${APP_NAME}=docker-registry.default.svc:5000/${PROJECT_NAMESPACE}/${APP_NAME}:${JENKINS_TAG}
                    oc rollout latest dc/${APP_NAME}
                '''
                echo '### Verify OCP Deployment ###'
                openshiftVerifyDeployment depCfg: env.APP_NAME,
                    namespace: env.PROJECT_NAMESPACE,
                    replicaCount: '1',
                    verbose: 'false',
                    verifyReplicaCount: 'true',
                    waitTime: '',
                    waitUnit: 'sec'
            }
            post {
                success {
                    build job: 'system-test', parameters: [[$class: 'StringParameterValue', name: 'PROJECT_NAMESPACE', value: "${PROJECT_NAMESPACE}" ],[$class: 'StringParameterValue', name: 'JENKINS_TAG', value: "${JENKINS_TAG}"]], wait: false
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts "**"
        }
    }
}
