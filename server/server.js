const express = require('express');
const { check, validationResult } = require('express-validator');
const bp = require('body-parser');
const dao = require('./dao');
const { ResultWithContext } = require('express-validator/src/chain');
app = new express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Server listening port
const port = 3001;

// appId, creatorAddress, name, description, imageUrl, start, end, goal
app.post('/api/applications/create', [
  // check('appId').notEmpty(),
  // check('creatorAddress').notEmpty(),
  // check('name').notEmpty(),
  // check('description').notEmpty(),
  // check('imageUrl').notEmpty(),
  // check('start').notEmpty(),
  // check('end').notEmpty(),
  // check('goal').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await dao.createApp(req.body.appId, req.body.creatorAddress, req.body.name, req.body.description, req.body.imageUrl, req.body.start, req.body.end, parseFloat(req.body.goal))
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of the app.` });
  }

});

// funderAddress, appId, amount
app.post('/api/applications/fund', [
  // check('funderAddress').notEmpty(),
  // check('appId').notEmpty(),
  // check('amount').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await dao.fundApp(req.body.funderAddress, req.body.appId, parseFloat(req.body.amount))
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the funding of the app.` });
  }

});

app.get('/api/applications', async (req, res) => {
  try {
    let apps = null
    if (req.query.creatorAddress == null)
      //Get all applications created
      apps = await dao.getAllApplications()
    else
      //Get all applications created from creator address
      apps = await dao.getApplicationsFromCreatorAddress(req.query.creatorAddress)
    res.json(apps);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('/api/application', async (req, res) => {
  try {
    let apps = await dao.getApplicationFromAppId(req.query.appId)
    res.json(apps);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('/api/funder', async (req, res) => {
  console.log("AppInfo=" + req.query.appInfo + " appId = " + req.query.appId)
  try {
    let result = null
    switch(req.query.appId){
      case(undefined):

      //ALL THE APPS
        if(req.query.appInfo == 1){
          //Get funded amount plus appInfp from funderAddress related to a single app
          result = await dao.getAllFundedApplicationsAndAppsInfoFromFunderAddress(req.query.funderAddress)
        }
        else{
          //Get all funded apps from funderAddress
          result = await dao.getAllFundedApplicationsFromFunderAddress(req.query.funderAddress)
        }
        break
        
      //JUST ONE APP
      default:
        if(req.query.appInfo == 1){
          //Get funded amount plus app info from funderAddress and appId
          result = await dao.getFundedAmountAndAppInfoFromFunderAddressAndAppId(req.query.funderAddress, req.query.appId)
        }
        else{
          //Get funded amount from funderAddress and appId
          result = await dao.getFundedApplicationAmountFromFunderAddressAndAppId(req.query.funderAddress, req.query.appId)
        }
    }
    res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('/api/funded', async (req, res) => {
  try {
    let apps = await dao.getFundedApplicationAmountFromAppId(req.query.appId)
    res.json(apps);
  } catch (err) {
    res.status(500).end();
  }
});


app.listen(port, () => {
  console.log(`react-server listening at http://localhost:${port}`);
});

