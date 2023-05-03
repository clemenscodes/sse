#!/bin/bash

CERTS="apps/nginx/certs"
CONF="apps/nginx/config"

openssl genrsa -out $CERTS/ca.key 4096
openssl rsa -in $CERTS/ca.key -pubout -out $CERTS/ca.pub
openssl req -new -x509 -key $CERTS/ca.key -out $CERTS/ca.crt -config $CONF/csr.conf -config $CONF/csr.conf
openssl req -new -key $CERTS/ca.key -out $CERTS/fk-vv.csr -config $CONF/csr.conf
openssl x509 -req -in $CERTS/fk-vv.csr -CA $CERTS/ca.crt -CAkey $CERTS/ca.key -CAcreateserial -out $CERTS/fk-vv.crt
