#!/usr/bin/env bash

BACKUP_ROOT="/mnt/backups"
CHECKSUMS="/mnt/backups/checksums"
ENCRYPTION_KEY="super-duper-secret-encryption-key-that-can-never-be-hacked"

restore_backup() {
    user="$1"
    restore_directory="$2"

    backup_directory="$BACKUP_ROOT/$user"
    backups=$(ls -t "$backup_directory")
    newest_backup=$(echo "$backups" | head -n 1)
    encrypted_backup="$backup_directory/$newest_backup"

    expected_checksum="$(grep "$newest_backup" "$CHECKSUMS/$user/checksums.txt" | awk '{print $1}')"
    actual_checksum=$(sha256sum "$encrypted_backup" | awk '{print $1}')

    if [ "$actual_checksum" != "$expected_checksum" ]; then
        echo "Checksum error! Backup cannot safely be restored."
        exit 1
    fi

    decrypted_backup="$backup_directory/${newest_backup%.enc}"
    openssl enc -d -aes-256-cbc -salt -pbkdf2 -pass "pass:$ENCRYPTION_KEY" -in "$encrypted_backup" -out "$decrypted_backup"

    tar xzf "$decrypted_backup" -C "$restore_directory"
    rm "$decrypted_backup"

    echo "Backup restored successfully"
}

if [ "$#" -ne 2 ]; then
    echo "Invalid arguments. Usage: $0 <user> <restorepath>"
    exit 1
fi

restore_backup "$1" "$2"
