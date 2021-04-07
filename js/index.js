// import CONSTANTS from './constants.js';
import { isUserAuthenticated, updateView } from './helpers.js'; 

isUserAuthenticated().then(authenticated => updateView(authenticated));
