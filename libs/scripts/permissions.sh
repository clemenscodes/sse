#!/bin/sh

list="assets/04_auth/liste.txt"
[ -f $list ] || echo "<redacted>" > $list
echo "Default permissions:"
getfacl $list
echo "Viewing is allowed:"
cat $list
echo "Writing is also allowed:"
echo "More content" >> $list
cat $list
echo
sudo useradd -g users alice
sudo useradd -g users bob
echo "Changing the owner to alice"
sudo chown alice $list
echo "Setting explicit permissions for alice and bob only"
sudo setfacl -m u:alice:rw $list
sudo setfacl -m u:bob:rw $list
echo "Removing permissions for everything else"
sudo setfacl -m g::--- $list
sudo setfacl -m o::--- $list
echo "Now only alice and bob can read or write the file"
echo
getfacl $list
echo "Reading the file as a different user results in an error:"
cat $list
sudo userdel alice
sudo userdel bob
sudo rm $list
