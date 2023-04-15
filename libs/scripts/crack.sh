#!/bin/sh

passwords="assets/01_passwords/1000000-password-seclists.txt"

while read -r password; do
    input="$1"
    err="stderr.txt"
    out="stdout.txt"
    echo "Testing password: $password"
    if openssl enc -d -aes-256-cbc -a -in "$input" -k "$password" >$out 2>$err; then
        echo "Positive. Comparing hashes."
        non_ascii_chars=$(echo "$out" | tr -d '[:print:]')
        if [ -n "$non_ascii_chars" ]; then
            echo "The string '$out' contains non-ASCII characters."
            continue
        fi
        echo "SUCCESS! Password: $password"
        echo
        cat $out
        exit 0
        # fi
    fi
done <"$passwords"

