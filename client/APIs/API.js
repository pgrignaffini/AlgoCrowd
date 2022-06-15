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

async function getAllFundedApplicationsFromFunderAddress(funderAddress) {
  const response = await fetch('/api/funder?funderAddress=' + funderAddress);
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody
  }
  else
    throw responseBody;
}

async function getFundedApplicationFromFunderAddressAndAppId(funderAddress, appId) {
  const response = await fetch('/api/funder?funderAddress=' + funderAddress + '&appId=' + appId);
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody[0]
  }
  else
    throw responseBody;
}


const API = { createApp, fundApp, getAllApplications, getApplicationsFromCreatorAddress, getAllFundedApplicationsFromFunderAddress, getFundedApplicationFromFunderAddressAndAppId }

export default API;