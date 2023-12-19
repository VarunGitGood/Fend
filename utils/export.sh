#!/bin/bash

# Check if the number of arguments is correct
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

# Destination directory
destination="to_zip"

# Create the destination directory if it doesn't exist
mkdir -p "$destination"

# Step 1: Copy a folder from a path to the destination directory
source_folder="../ansible"
cp -r "$source_folder" "$destination/"

# Step 2: Copy another file from a path to the destination directory
source_file="../ansible-data/scripts/$1.yml"
cp "$source_file" "$destination/vars.yml"

# Step 3: Write a new Bash script file into the destination directory using a template
script_template="template_script.sh"
new_script="$destination/run.sh"

# Assuming template_script.sh contains your script template
cp "$script_template" "$new_script"

echo "[all]" >> "$destination/hosts"
echo "127.0.0.1" >> "$destination/hosts"

# Make the new script executable
chmod +x "$new_script"

# Step 4: Zip the to_zip folder
zip -r "export.zip" "$destination"

echo "Script executed successfully!"
