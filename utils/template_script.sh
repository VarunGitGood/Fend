#! /bin/bash

if ! command -v ansible &> /dev/null; then
    echo "Ansible is not installed. Installing..."
    sudo apt update
    sudo apt install -y ansible
fi

ansible-playbook -i hosts --extra-vars "@vars.yml" ansible/main.yml --connection=local
