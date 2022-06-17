async function createApp(appId, creatorAddress, name, description, imageUrl, start, end, goal) {
  return new Promise((resolve, reject) => {
    fetch('/api/applications/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appId: appId,
        creatorAddress: creatorAddress,
        name: name,
        description: description,
        imageUrl: imageUrl,
        start: start,
        end: end,
        goal: goal
      }),
    }).then((response) => {
      if (response.ok) {
        resolve(null)
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => { reject({ error: 'Cannot parse server response' }) });
      }
    }).catch(() => { reject({ error: 'Cannot communicate with the server' }) });
  });
}

async function fundApp(funderAddress, appId, amount) {
  return new Promise((resolve, reject) => {
    fetch('/api/applications/fund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        funderAddress: funderAddress,
        appId: appId,
        amount: amount
      }),
    }).then((response) => {
      if (response.ok) {
        resolve(null)
      } else {
        response.json()
          .then((message) => { reject(message); })
          .catch(() => { reject({ error: 'Cannot parse server response' }) });
      }
    }).catch(() => { reject({ error: 'Cannot communicate with the server' }) });
  });
}

async function getAllApplications() {
  const response = await fetch('/api/applications');
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody
  }
  else
    throw responseBody;
}


async function getApplicationsFromCreatorAddress(creatorAddress) {
  const response = await fetch('/api/applications?creatorAddress=' + creatorAddress);
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody
  }
  else
    throw responseBody;
}

async function getApplicationFromAppId(appId) {
  const response = await fetch('/api/application?appId=' + appId);
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody
  }
  else
    throw responseBody;
}

//Get all funded applications from funderAddress
async function getAllFundedApplicationsFromFunderAddress(funderAddress) {
  const response = await fetch('/api/funder?funderAddress=' + funderAddress);
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody
  }
  else
    throw responseBody;
}

//Get funded amount from a single funder relating to a single app
async function getFundedApplicationAmountFromFunderAddressAndAppId(funderAddress, appId) {
  const response = await fetch('/api/funder?funderAddress=' + funderAddress + '&appId=' + appId);
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody[0]
  }
  else
    throw responseBody;
}

async function getFundedApplicationAmountFromAppId(appId) {
  const response = await fetch('/api/funded?appId=' + appId);
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody[0]
  }
  else
    throw responseBody;
}

//Get all the applications the user has invested in (amount included) and related app info
async function getAllFundedApplicationsAndAppsInfoFromFunderAddress(funderAddress) {
  const response = await fetch('/api/funder?funderAddress=' + funderAddress + '&appInfo=1');
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody
  }
  else
    throw responseBody;
}

//Get funded amount plus appInfp from funderAddress related to a single app
async function getFundedAmountAndAppInfoFromFunderAddressAndAppId(funderAddress, appId) {
  const response = await fetch('/api/funder?funderAddress=' + funderAddress + '&appId=' + appId + '&appInfo=1');
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody
  }
  else
    throw responseBody;
}


const API = { 
  createApp,
  fundApp, 
  getFundedApplicationAmountFromAppId, 
  getApplicationFromAppId, 
  getAllApplications, 
  getApplicationsFromCreatorAddress, 
  getAllFundedApplicationsFromFunderAddress, 
  getFundedApplicationAmountFromFunderAddressAndAppId, 
  getAllFundedApplicationsAndAppsInfoFromFunderAddress, 
  getFundedAmountAndAppInfoFromFunderAddressAndAppId 
}

export default API;