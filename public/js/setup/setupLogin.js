
let user = null;

function setupLogin() { 

  google.accounts.id.initialize({
    client_id: '620659965091-qljmfmvq63mlvrifcemrgkb63g7mpb85.apps.googleusercontent.com',
    callback: handleCredentialResponse
  });
  google.accounts.id.prompt(); 
}

function handleCredentialResponse(response) {
  if (response.clientId) {
    api.update('/user/jwt', response);
    user = response;
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    console.log('handleCredentialResponse error', response);
  }
}