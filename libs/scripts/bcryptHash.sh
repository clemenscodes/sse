#!/bin/bash

read -p "Enter a string to encrypt: " input

hashString=
$(node -e "const bcrypt = require('bcrypt'); b
crypt.hash('$input', 10, 
function(err, hash) { 
    console.log(hash); 
    });")

echo "Encrypted string: $hashString"


