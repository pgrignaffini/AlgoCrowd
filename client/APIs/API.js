

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

  async function getAllApplications() {
    const response = await fetch('/api/applications/all');
    const responseBody = await response.json();
    if (response.ok){
      return responseBody
    }
    else
      throw responseBody;
  }

  async function getApplicationsFromCreatorAddress(creatorAddress) {
    const response = await fetch('/api/applications/creator?creatorAddress=' + creatorAddress);
    const responseBody = await response.json();
    if (response.ok){
      return responseBody
    }
    else
      throw responseBody;
  }

  

  const API = {createApp, getAllApplications, getApplicationsFromCreatorAddress}
  
  export default API;