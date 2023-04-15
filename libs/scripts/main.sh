#!/bin/sh

uid="$1"

if [ -z "$1" ]; then
    echo "No argument was given" && exit 1
fi

libs/scripts/sha3sum256.sh "$uid"
libs/scripts/crack.sh "assets/01_passwords/encrypted_test.txt"
libs/scripts/crack.sh "assets/01_passwords/encoded.txt"
