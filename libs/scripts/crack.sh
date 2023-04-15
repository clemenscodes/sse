#!/bin/sh

passwords="assets/01_passwords/1000000-password-seclists.txt"

while read -r password; do
    input="$1"
    err="stderr.txt"
    out="stdout.txt"
    echo "Testing password: $password"
    skip=false
    if openssl enc -d -aes-256-cbc -a -in "$input" -k "$password" >$out 2>$err; then
        if ! file $out | grep -q "text"; then
            skip=true
        fi
        if file $out | grep -q "ISO"; then
            skip=true
        fi
        if [ $skip = 'false' ]; then
            echo "SUCCESS! Password: $password"
            cat $out
            rm $out
            exit 0
        fi
        rm $err
    fi
done <"$passwords"
