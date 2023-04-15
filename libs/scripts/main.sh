#!/bin/sh

uid="$1"

if [ -z "$1" ]; then
    echo "No argument was given" && exit 1
fi

./sha3sum256.sh "$uid"
