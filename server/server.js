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
        await dao.createApp(req.body.appId, req.body.creatorAddress, req.body.name, req.body.description, req.body.imageUrl, req.body.start, req.body.end, req.body.goal)
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
      await dao.fundApp(req.body.funderAddress, req.body.appId, req.body.amount)
      res.status(201).end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the funding of the app.` });
    }

});

  app.get('/api/applications', async (req, res) => {
    try {
        let apps = null
        if(req.query.creatorAddress == null)
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

  app.get('/api/funder', async (req, res) => {
    try {
        let apps = null
        if(req.query.appId == null)
          //Get all funded apps from funderAddress
          apps = await dao.getAllFundedAppsFromFunderAddress(req.query.funderAddress)
        else
          //Get all funded rows related to a single appId from funderAddress
          apps = await dao.getFundedAppAmountFromFunderAddressAndAppId(req.query.funderAddress, req.query.appId)
      res.json(apps);
    } catch (err) {
      res.status(500).end();
    }
  });


app.listen(port, () => {
  console.log(`react-server listening at http://localhost:${port}`);
});

