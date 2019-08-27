# Code Labs

Encryption
----------
Encrypt String

    echo 'someTextIWantToEncrypt' | openssl enc -base64 -e -aes-256-cbc -nosalt -pass pass:mySecretPass

Decrypt String

    echo "KPkBkGJ9bs4YHvh24xz7m9jTlYWm1LcIFcWR0DwY4PU=" | openssl enc -base64 -d -aes-256-cbc -nosalt -pass pass:mySecretPass

Encrypt File

    openssl enc -aes-256-cbc -salt -in <file_name> -out <encrypted_file>

Decrypt File

    openssl enc -d -aes-256-cbc -in <encrypted_file> > <file_name>

Repository with Encrypted Environment Variables
----------
LOCAL: Add your environment variables

    vi env/your_file.env
    export VARIABLE="My Own Variable"

LOCAL: Encrypt your file with password test1234

    openssl enc -aes-256-cbc -salt -in env/your_file.env -out env/your_file.env.gpg

LOCAL: Git add, commit and push encrypted file

    git add your_file.env.gpg
    git commit -m 'your_file.env.gpg'
    git push

SERVER: Create virtual environment

    virtualenv .env

SERVER: On activate, add at the end of file

    vi .env/bin/activate
    for var in `ls env/*.env`
    do
        . $var
    done

SERVER: Activate virtual environment

    source .env/bin/activate

SERVER: Use environment variables

    bash: echo $VARIABLE
    python3: import os
    python3: os.getenv("VARIABLE")

Git Crypt
----------
...
