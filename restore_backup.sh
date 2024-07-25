#!/bin/bash

function choose_from_menu() {
    local prompt="$1" outvar="$2"
    shift
    shift
    local options=("$@") cur=0 count=${#options[@]} index=0
    local esc=$(echo -en "\e") # cache ESC as test doesn't allow esc codes
    printf "$prompt\n"
    while true
    do
        # list all options (option list is zero-based)
        index=0 
        for o in "${options[@]}"
        do
            if [ "$index" == "$cur" ]
            then echo -e " >\e[7m$o\e[0m" # mark & highlight the current option
            else echo "  $o"
            fi
            index=$(( $index + 1 ))
        done
        read -s -n3 key # wait for user to key in arrows or ENTER
        if [[ $key == $esc[A ]] # up arrow
        then cur=$(( $cur - 1 ))
            [ "$cur" -lt 0 ] && cur=0
        elif [[ $key == $esc[B ]] # down arrow
        then cur=$(( $cur + 1 ))
            [ "$cur" -ge $count ] && cur=$(( $count - 1 ))
        elif [[ $key == "" ]] # nothing, i.e the read delimiter - ENTER
        then break
        fi
        echo -en "\e[${count}A" # go up to the beginning to re-render
    done
    # export the selection to the requested output variable
    printf -v $outvar "${options[$cur]}"
}

DB_CONTAINER_NAME="prod-db-1"
UPLOADS_CONTAINER_NAME="prod-upload-service-1"
DB_USERNAME="postgres"
DB_NAME="postgres"
BACKUPS_FOLDER=".backups"
CURRENT_BACKUP_FOLDER=2024-07-25_13-43-21
RCLONE_REMOTE_NAME="idrive"
RCLONE_REMOTE_FOLDER="tgc-backups"

echo "syncing from remote to local..."

rclone sync $RCLONE_REMOTE_NAME:$RCLONE_REMOTE_FOLDER $BACKUPS_FOLDER

BACKUPS=($(ls $BACKUPS_FOLDER | sort -r))

if [ ${#BACKUPS[@]} -eq 0 ]; then
    echo "No backups available..."
    exit 1
fi

choose_from_menu "Please choose which backup to restore from :" CURRENT_BACKUP_FOLDER "${BACKUPS[@]}"
echo "Restoring from $CURRENT_BACKUP_FOLDER backup folder..."

FOLDER="$BACKUPS_FOLDER/$$CURRENT_BACKUP_FOLDER"

echo "Restoring DB..."
cat $FOLDER/dump.sql | docker exec -i $DB_CONTAINER_NAME psql -U $DB_USERNAME -d $DB_NAME

echo "Restoring files..."
docker cp $FOLDER/files $UPLOADS_CONTAINER_NAME:/app

echo "done !"