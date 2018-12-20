const express = require('express');
const loki = require('lokijs');
const app = express();
const bodyParser = require('body-parser');
const port = 8888;


//  In Memory DB stuff to be able to POST and then GET the response
const db = new loki('loki-db.json');
const dummy = db.addCollection('dummy');


process.on('SIGTERM', forceShutDown);
process.on('SIGINT', forceShutDown);


// for id generation
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const DRAFTS = JSON.parse(`[{"title":"Traitors And Guardians","created":"2018-10-18 10:24"}]`)
for (let i = 0; i < DRAFTS.length; i++) {
  dummy.insert(DRAFTS[i]);
}

//  Express Middlewear
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


// Health Check route
app.get('/api/actuator/health', (req, res) => res.send('Hello World!'));


// Support Article Drafts
app.get('/api/v1/drafts', (req, res) => {
  const data = dummy.find({});
  const resp = JSON.parse('{"pageNbr":0,"totalCount":4,"hasNextPage":true,"resultsPerPage":5000005,"readArticles":[]}');
  resp.readDrafts = data;
  resp.totalCount = data.length;

  res.send(resp)
  // res.status(400).send({});
  // res.send(resp)
});

app.post('/api/v1/thing', (req, res) => {
  req.body.referenceNumber = getRandomInt(100000);
  req.body.draftId = getRandomInt(100000);
  dummy.insert(req.body);
  res.send({
    referenceNumber: req.body.referenceNumber,
    draftId: req.body.draftId
  });
});

// My items
app.get('/api/v1/thing', (req, res) => {
  // default
  const data =  dummy.find({}).concat( dummy.find({}));
  resp.totalCount = data.length;
  const maxNbrOfDrafts = Number(req.query.maxNbrOfDrafts) || 10;
  const requestedPage = Number(req.query.pageNbr) || 0;

  let itemsFrom = (maxNbrOfDrafts * requestedPage);
  let itemsTo = itemsFrom + (maxNbrOfDrafts);
  resp.readArticles = data.reverse().slice(itemsFrom, itemsTo);
  itemsTo >= data.length ? resp.hasNextPage = false : resp.hasNextPage = true;
  resp.resultsPerPage = req.query.maxNbrOfDrafts;
  resp.pageNbr = requestedPage;
  res.send(resp);
});

// Publish draft
app.post('/api/v1/dummy', (req, res) => {
    res.status(201).send({hello: world});
});


// Start Server
console.log("In memory DB seeded with ", dummy.find({}));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


//Return token with very long expiration
app.post('/api/v1/authenticateUser', (req, res) => {

  if(req.body.username === "test_user") {
    res.send({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0X3VzZXIiLCJzY29wZSI6WyJ0aWU6cmVhZCIsInRpZTp3cml0ZSJdLCJ3b3Jrc2hvcElkIjoiYzFmYjQ1MTktYWVmNS00NGYwLWFmYjctN2M2Y2M0YWQ0YzM4IiwicGFydG5lcmlkIjoiODFiMzlmN2UtZDMxNy00M2M0LWFlMTAtOGI4NTFhZDRkOTkwIiwiZXhwIjoyNTQyMzQwMDgxLCJhdXRob3JpdGllcyI6WyJTVVBQT1JUX0FSVElDTEVfUkVBRCIsIlNVUFBPUlRfQVJUSUNMRV9XUklURSJdLCJqdGkiOiI4MDI3OTM2OC03Y2JlLTRjYTEtOTkwZS0xNmViZmVlMDhlMmIiLCJjbGllbnRfaWQiOiJ0ZXN0X3VpX2NsaWVudF9pZCIsIm1hcmtldElkIjoiZWQxMjU0OWYtZDg1Yy00NmM0LTg3MWEtM2QyM2IwZTEwYjQyIn0.-S1ZrPHJjAZFOiEdhF8NVmEDW7jmCV_W-5YEhUkmAes",
      type: 'Bearer'
    });
  }
});


function forceShutDown() {
  app.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(1);
  }, 600000);
}
