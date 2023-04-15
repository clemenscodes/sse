#!/bin/sh

msg="$1"
echo "hashing $msg"
hash=$(echo "$msg" | sha3sum -a 256 | awk '{print $1}')
echo "$hash"
