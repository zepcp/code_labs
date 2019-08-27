# Code Labs

Encryption
----------
Encrypt String

    echo 'someTextIWantToEncrypt' | openssl enc -base64 -e -aes-256-cbc -nosalt -pass pass:mySecretPass

Decrypt String

    echo "KPkBkGJ9bs4YHvh24xz7m9jTlYWm1LcIFcWR0DwY4PU=" | openssl enc -base64 -d -aes-256-cbc -nosalt -pass pass:mySecretPass

Encrypt File

    openssl enc -aes-256-cbc -salt -in <file_name> -out <encrypted_file> -pass pass:mySecretPass

Decrypt File

    openssl enc -d -aes-256-cbc -in <encrypted_file> > <file_name> -pass pass:mySecretPass

Repository with Encrypted Environment Variables
----------
LOCAL: Add your environment variables

    vi env/your_file.env
    export VARIABLE="My Own Variable"

LOCAL: Encrypt your file

    openssl enc -aes-256-cbc -salt -in env/your_file.env -out env/your_file.env.gpg -pass pass:mySecretPass

LOCAL: Git add, commit and push encrypted file

    git add your_file.env.gpg
    git commit -m 'your_file.env.gpg'
    git push

SERVER: Create virtual environment

    virtualenv .env

SERVER: On activate, add at the end of file

    for var in `ls env/*.env.gpg`
    do
        openssl enc -d -aes-256-cbc -in $var > $var".decrypted" -pass pass:mySecretPass 
        . $var".decrypted"
        rm $var".decrypted"
    done

SERVER: Activate virtual environment

    source .env/bin/activate

SERVER: Use environment variables

    bash: echo $VARIABLE
    python3: import os
    python3: os.getenv("VARIABLE")

Git Crypt
----------
USER: Generate a gpg key

    gpg --gen-key

USER: Get key details

    gpg --list-keys

USER: Send public key to general server

    gpg --keyserver hkps://pgp.mit.edu --send-keys *your-key-ID*

USER: Get the ASCII version of your public key

    gpg --export --armor *your-key-ID*

USER: See files unencrypted

    git-crypt unlock

OWNER: Initialize Git-Crypt

    git-crypt init

OWNER: Create a .gitattributes file on the same level that files you want to encrypt

    vi src/.gitattributes
    # Files that are going to be encrypted
    config.py filter=git-crypt diff=git-crypt
    # (I use gradle.properties to store credentials)
    gradle.properties filter=git-crypt diff=git-crypt
    # Making sure that .gitattributes is never encrypted. DON'T TOUCH THAT LINE AND ONE BELOW
    .gitattributes !filter !diff

OWNER: List files for encryption

    git-crypt status -e

OWNER: Add trusted users

    gpg --keyserver hkp://pgp.mit.edu --recv-key *new-joiner-key-ID*
    git-crypt add-gpg-user --trusted john.doe@email.com
