#!/usr/bin/env bash

USERS=$(cut -d: -f1,6 /etc/passwd | grep ".:/home/" | awk -F ':' '{print $2}')
BACKUP_ROOT="/mnt/backups"
CHECKSUMS="/mnt/backups/checksums"
BACKUPS_TO_KEEP=5
ENCRYPTION_KEY="super-duper-secret-encryption-key-that-can-never-be-hacked"

main() {
    for user in $USERS; do
        docs=$user/Documents
        [ -d "$docs" ] || continue
        username=$(echo "$user" | awk -F '/' '{print $3}')
        backup_directory="$BACKUP_ROOT/$username"
        [ -d "$backup_directory" ] || mkdir "$backup_directory"
        backup="$backup_directory/backup_$(date +"%d_%m_%Y_%H_%M_%S").tar.gz"
        archive "$user" "$backup"
        backups=$(ls -t "$backup_directory")
        backup_to_encrypt="$backup_directory/$(echo "$backups" | head -n1)"
        encrypted_backup="$backup_to_encrypt.enc"
        encrypt_backup "$backup_to_encrypt" "$encrypted_backup"
        create_checksums "$username" "$encrypted_backup"
        rotate_backups "$backup_directory"
        setup_supervision "$docs"
        setup_cronjob "$username"
    done
}

archive() {
    user="$1"
    backup="$2"
    tar czvf "$backup" -C "$user" "Documents"
}

encrypt_backup() {
    backup_to_encrypt="$1"
    encrypted_backup="$2"
    openssl enc -aes-256-cbc -salt -pbkdf2 -pass "pass:$ENCRYPTION_KEY" -in "$backup_to_encrypt" -out "$encrypted_backup"
    rm "$backup_to_encrypt"
}

create_checksums() {
    username="$1"
    encrypted_backup="$2"
    checksum_file="$CHECKSUMS/$username/checksums.txt"
    mkdir -p "$(dirname "$checksum_file")"
    sha256sum "$encrypted_backup" >>"$checksum_file"
}

rotate_backups() {
    backup_directory="$1"
    backups=$(ls -t "$backup_directory")
    deleted_backups=$(echo "$backups" | tail -n +$((BACKUPS_TO_KEEP + 1)))
    for b in $deleted_backups; do
        rm "$backup_directory/$b"
    done
}

setup_supervision() {
    docs="$1"
    inotifywait -m -r -e modify,create,delete "$docs" |
        while read -r directory event file; do
            echo "Event: $event - $directory$file"
        done &
}

setup_cronjob() {
    echo "Setting up cronjob"
    username="$1"
    script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    script_path="$script_dir/$(basename "${BASH_SOURCE[0]}")"
    cronjob="0 0 * * * /bin/bash $script_path"
    cronjobs="/var/spool/cron/$username"
    if ! grep -q "$script_path" "$cronjobs"; then
        echo "$cronjob" >>"$cronjobs"
    fi
}

main
wait
