#!/usr/bin/env bash

read -r -p "What is your Google Analytics ID? " google_analytics_id
if [[ -z "${google_analytics_id}" ]]; then
  echo "Google Analytics ID will be empty. Make sure to set it from '.env'"
fi

echo "GOOGLE_ANALYTICS_ID=${google_analytics_id}
GRAPHQL_ENDPOINT=" > .env

if [[ ! -d '.cert' ]]; then

  mkdir .cert

  cp ./ssl.conf ./.cert
  cd .cert/ || {
    echo "Could not enter '.cert' directory"
    exit 1
  }

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

  if [ -x "$(command -v security)" ]; then

    read -r -p "Trust the generated certificate for local development? (y/n) " trust
    if [[ "Y" == "${trust}" || "y" == "${trust}" ]]; then
      echo "You might be prompted for your user password"
      sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain private.crt
    fi

  fi

  openssl x509 -in private.crt -out private.pem -outform PEM

  cd ../

fi

npm install
npm run generate:locale
