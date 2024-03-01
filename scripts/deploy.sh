#!/bin/bash

# Unzip release file
unzip release.zip && \

# Replace host name variable with host name of machine
#sed -i 's@<HOST_NAME>@'"$(hostname)"'@' ./intervention.js && \

# Remove zip file
rm -f release.zip