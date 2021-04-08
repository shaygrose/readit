import CONSTANTS from './constants.js';
import { isUserAuthenticated, updateView } from './helpers.js'; 

const submitReview = (review) => {
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify(review);
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  // make API call with parameters and use promises to get response
  fetch(CONSTANTS.READIT_API_URL, requestOptions)
    .then(response => response.text())
    .then(() => window.location = "./index.html")
    .catch(error => console.log('error', error));
}

// define the callAPI function that takes a first name and last name as parameters
var callAPI = () => {
  isUserAuthenticated()
    .then(authenticated => {
      if (authenticated) {
        let review = {
          "book_title": document.getElementById('title').value,
          "ISBN": document.getElementById('isbn'),
          "genres": document.getElementById('genre').value,
          "review_title": document.getElementById('review_title').value,
          "review": document.getElementById('review').value,
          "contains_spoilers": document.getElementById('spoilers').checked,
          "NSFW_content": document.getElementById('NSFW').checked,
          "upvotes": 0
        }

        submitReview(review);
      } else {
        let modal = document.getElementById('modal');
        modal.classList.add('is-active');

        let modalCloseButton = document.getElementById('modal-close');
        modalCloseButton.onclick = () => {
          modal.classList.remove('is-active');
        }
      }
    })
}

let submitButton = document.getElementById('submit');
submitButton.onclick = callAPI;

let signInReminder = document.getElementById('sign-in-reminder');
signInReminder.href = CONSTANTS.SIGN_IN_URL;

let signUpReminder = document.getElementById('sign-up-reminder');
signUpReminder.href = CONSTANTS.SIGN_UP_URL;

isUserAuthenticated().then(authenticated => updateView(authenticated));