# Code Labs
Git Crypt

Encrypt String
----------
    echo 'someTextIWantToEncrypt' | openssl enc -base64 -e -aes-256-cbc -nosalt -pass pass:mySecretPass

Decrypt String
----------
    echo "KPkBkGJ9bs4YHvh24xz7m9jTlYWm1LcIFcWR0DwY4PU=" | openssl enc -base64 -d -aes-256-cbc -nosalt -pass pass:mySecretPass

Encrypt File
----------
    openssl enc -aes-256-cbc -salt -in <file_name> -out <encrypted_file>

Decrypt File
----------
    openssl enc -d -aes-256-cbc -in <encrypted_file> > <file_name>
