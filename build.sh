#!/bin/bash


if [ -f "public/build.zip" ]; then
    rm .next.zip
fi

npm run build
zip -r .next.zip .next
