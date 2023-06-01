#!/usr/bin/env bash

USERS=$(cut -d: -f1,6 /etc/passwd | grep ".:/home/" | awk -F ':' '{print $2}')
BACKUP_ROOT="/mnt/backups"
CHECKSUMS="/mnt/backups/checksums"
BACKUPS_TO_KEEP=5

main() {
    for user in $USERS; do
        docs=$user/Documents
        [ -d "$docs" ] || continue
        username=$(echo "$user" | awk -F '/' '{print $3}')
        archive "$username" "$user"
        create_checksums
        setup_cronjob "$username"
        setup_supervision "$docs"
    done
}

archive() {
    username="$1"
    user="$2"
    backup_directory="$BACKUP_ROOT/$username"
    [ -d "$backup_directory" ] || mkdir "$backup_directory"
    backup="$backup_directory/backup_$(date +"%d_%m_%Y_%H_%M_%S").tar.gz"
    tar czvf "$backup" -C "$user" "Documents"
}

create_checksums() {
    checksum_file="$CHECKSUMS/$username/checksums.txt"
    mkdir -p "$(dirname "$checksum_file")"
    sha256sum "$backup" >>"$checksum_file"
}

rotate_backups() {
    backup_directory="$1"
    backups=$(ls -t "$backup_directory")
    deleted_backups=$(echo "$backups" | tail -n +$((BACKUPS_TO_KEEP + 1)))
    for b in $deleted_backups; do
        rm "$backup_directory/$b"
    done
}

setup_cronjob() {
    username="$1"
    script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    script_path="$script_dir/$(basename "${BASH_SOURCE[0]}")"
    echo "0 0 * * * /bin/bash $script_path" >>/var/spool/cron/"$username"
}

setup_supervision() {
    docs="$1"
    inotifywait -m -r -e modify,create,delete "$docs" |
        while read -r directory event file; do
            echo "Event: $event - $directory$file"
        done &
}

main
wait
