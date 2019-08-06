#!/usr/bin/env bash

mkdir .cert

cp ./ssl.conf ./.cert

cd .cert/

openssl genrsa -out private.key 4096

openssl req -new -sha256 \
    -out private.csr \
    -key private.key \
    -config ssl.conf

openssl x509 -req \
    -days 3650 \
    -in private.csr \
    -signkey private.key \
    -out private.crt \
    -extensions req_ext \
    -extfile ssl.conf

sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain private.crt

openssl x509 -in private.crt -out private.pem -outform PEM

cd ../

# install dependencies

npm i
npm run generate:locale
