#!/bin/bash


if [ -f "public/build.zip" ]; then
    rm public/build.zip
fi

npm run build
cp .next/* public/build/ 
zip -r public/build.zip public/build
