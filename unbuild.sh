#!/bin/bash

# Unzip .next.zip and restore the .next directory

if [ -f ".next.zip" ]; then
    # Remove existing .next directory if it exists
    [ -d ".next" ] && rm -rf .next

    # Extract the zip contents directly (this will recreate the .next directory)
    unzip -q .next.zip

    echo "Successfully restored .next directory from .next.zip"
else
    echo "Error: .next.zip file not found"
    exit 1
fi