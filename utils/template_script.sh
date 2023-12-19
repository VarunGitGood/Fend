#! /bin/bash

# This script is a template for creating new scripts
ansible-playbook -i hosts --extra-vars "@vars.yml" ansible/main.yml --connection=local
