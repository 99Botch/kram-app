// The middleware allows me to call for axios, email validator & the API URI only once instead of calling them each time I use a component
// import axios
let axios = require('axios');

// import email-validator
let validator = require("email-validator");

// store localhost 
const URI = "https://iadt-kram-api.herokuapp.com";
// const URI = "http://localhost:3000";

// functions
export { URI , axios, validator };