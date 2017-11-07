#!/usr/bin/bash

KEYSTORE_DIR=fixtures
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [[ -f $KEYSTORE_DIR/key.pem || -f $KEYSTORE_DIR/cert.pem ]]; then
       printf "Keys already exists. Exiting."
       exit 0
fi

# Create directory
rm -rf $KEYSTORE_DIR
mkdir $KEYSTORE_DIR


# Generate key and certificate
openssl genrsa -out $KEYSTORE_DIR/key.key 2048
openssl req -new -sha256 -key $KEYSTORE_DIR/key.key -days 3650 -out $KEYSTORE_DIR/csr.csr
openssl x509 -req -days 3650 -in $KEYSTORE_DIR/csr.csr -signkey $KEYSTORE_DIR/key.key -out $KEYSTORE_DIR/cert.crt -extfile $CURRENT_DIR/v3.ext

# Clean CSR
rm -f $KEYSTORE_DIR/csr.csr
