FROM registry.access.redhat.com/rhscl/nodejs-8-rhel7

WORKDIR /usr/src/app

ENV FIX_DIR /usr/src/app

USER root
RUN chown -R "1001" "${FIX_DIR}" && \
  chgrp -R 0 "${FIX_DIR}" && \
  chmod -R g+rw "${FIX_DIR}" && \
  find "${FIX_DIR}" -type d -exec chmod g+x {} +

USER 1001

RUN scl enable rh-nodejs8 'npm install angular-http-server'

COPY dist /usr/src/app

CMD ["./node_modules/.bin/angular-http-server"]
