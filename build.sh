#!/bin/bash

# load the .env file as exports
if [[ -f ".env" ]]; then
  export "$(grep -E -v '^#' .env | xargs)"
fi

npm run generate:locale

read -r -p 'Generate graphql from server? (y/n): ' generate_graphql
if [[ "y" == "${generate_graphql}" || "Y" == "${generate_graphql}" ]]; then
  npm run generate:graphql
fi

npm run lint || exit 1
npm run test || exit 1
npm run build || exit 1
