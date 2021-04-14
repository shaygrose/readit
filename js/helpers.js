import CONSTANTS from './constants.js';

export const isUserAuthenticated = async () => {
  // Check if there's a JWT already in local storage
  let localStorage = window.localStorage;
  let jwt = localStorage.getItem('jwt');
  if (jwt) {
    let response = await verifyJWT(jwt);
    return !!response;
  }
  
  // Otherwise make user sign in and retrieve it from URL
  let tokens = window.location.hash.split('&');
  let idToken = tokens[0].split('=')[1]; // Remove '#idToken=' from beginning of string
  if (idToken) {
    let response = await verifyJWT(idToken);

    if (response) {
      localStorage.setItem('jwt', idToken);
      localStorage.setItem('email', response.email);
    }

    return !!response;
  }

  return false;
};

// Calls Lambda function to verify JWT from Cognito
const verifyJWT = async (jwt) => {
  var myHeaders = new Headers();

  // Add content type header to object
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    body: JSON.stringify({ token: jwt }),
    method: 'POST',
    headers: myHeaders,
  };
  let response = await fetch(CONSTANTS.READIT_AUTH_URL, requestOptions)
  let authenticated = await response.json();
  console.log('VerifyJWT: ', authenticated);

  if (!authenticated) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
  }

  return authenticated;
}

const signOut = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('email');
}

// Changes navbar appearance depending on login status
export const updateView = (authenticated) => {
  let div = document.getElementById('navbar-account');
  let email = localStorage.getItem('email');

  if (authenticated && email) {
    div.innerHTML += 
      `<div class="navbar-item">
        Signed in as ${email}
        <div class="buttons ml-4">
          <a class="button is-warning" id='sign-out' href="index.html">
            Sign out
          </a>
        </div>
      </div>`;

    let signOutButton = document.getElementById('sign-out');
    signOutButton.onclick = signOut;

  } else {
    div.innerHTML += 
      `<div class="navbar-item">
        <div class="buttons">
          <a class="button is-light" href="${CONSTANTS.SIGN_IN_URL}">
            Sign in
          </a>
          <a class="button is-primary" href="${CONSTANTS.SIGN_UP_URL}">
            <strong>Sign up</strong>
          </a>
        </div>
      </div>`;
  }
}