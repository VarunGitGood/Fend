#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

destination="to_zip"

export_folder="$HOME/downloads/"

mkdir -p "$destination"

source_folder="../ansible"
cp -r "$source_folder" "$destination/"

source_file="../ansible-data/scripts/$1.yml"
cp "$source_file" "$destination/vars.yml"

script_template="template_script.sh"
new_script="$destination/run.sh"

cp "$script_template" "$new_script"

echo "[all]" >> "$destination/hosts"
echo "127.0.0.1" >> "$destination/hosts"

chmod +x "$new_script"

echo "$1 $2"
zip -r "$HOME/Downloads/$1-script.zip" "to_zip"

rm -rf to_zip

echo "Script executed successfully!"
