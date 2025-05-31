#!/bin/bash

# Unzip public/build.zip and move its contents directly into the .next directory

if [ -f "public/build.zip" ]; then
    # Remove existing .next directory
    [ -d ".next" ] && rm -rf .next

    # Create temporary directory for extraction
    mkdir -p temp_unzip

    # Extract the zip contents
    unzip -q public/build.zip -d temp_unzip

    # Move the contents of temp_unzip/public/build into .next
    if [ -d "temp_unzip/public/build" ]; then
        mkdir -p .next
        mv temp_unzip/public/build/* .next/
    else
        echo "Error: Expected path temp_unzip/public/build not found in zip file."
        rm -rf temp_unzip
        exit 1
    fi

    # Clean up
    rm -rf temp_unzip
fi
