#!/bin/bash

DB_CONTAINER_NAME="prod-db-1"
UPLOADS_CONTAINER_NAME="prod-upload-service-1"
DB_USERNAME="postgres"
BACKUPS_FOLDER=".backups"
CURRENT_BACKUP_FOLDER=$BACKUPS_FOLDER/`date +%Y-%m-%d"_"%H-%M-%S`
RCLONE_REMOTE_NAME="idrive"
RCLONE_REMOTE_FOLDER="tgc-backups"

echo creating backup folder in $CURRENT_BACKUP_FOLDER

mkdir -p $CURRENT_BACKUP_FOLDER
docker exec $DB_CONTAINER_NAME pg_dumpall -c -U $DB_USERNAME > $CURRENT_BACKUP_FOLDER/dump.sql
docker cp $UPLOADS_CONTAINER_NAME:/app/files $CURRENT_BACKUP_FOLDER

rclone sync $BACKUPS_FOLDER  $RCLONE_REMOTE_NAME:$RCLONE_REMOTE_FOLDER

echo "done !"
