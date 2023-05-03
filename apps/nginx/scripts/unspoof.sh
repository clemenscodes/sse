#!/bin/sh

hosts="/etc/hosts"
grep -v "thm.de" -i $hosts > $hosts.old && mv $hosts.old $hosts
