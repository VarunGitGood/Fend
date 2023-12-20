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

zip -r "$source_folder/$2-script.zip" "$destination"

rm -rf to_zip

if ! command -v ansible &> /dev/null; then
    echo "Ansible is not installed. Installing..."
    sudo apt update
    sudo apt install -y ansible
fi

rm -rf to_zip

echo "Script executed successfully!"
