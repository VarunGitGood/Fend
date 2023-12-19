#!/bin/bash

# Install Ansible using pip
pip install ansible

# Check if the installation was successful
if command -v ansible &>/dev/null; then
    echo "Ansible has been successfully installed."
else
    echo "Failed to install Ansible. Please check your Python and pip installation."
fi
