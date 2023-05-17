import jwt_decode from "jwt-decode";

// Put this as item token in localStorage and navigate to /adminstration
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJhZG1pbiJ9fQ"
var decoded = jwt_decode(token);

console.log(decoded);
