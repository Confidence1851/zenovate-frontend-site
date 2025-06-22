#!/bin/bash

rm .next.zip
npm run build
zip -r .next.zip .next
