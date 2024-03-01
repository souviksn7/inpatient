#!/bin/bash

REPO_NAME="healthchart-inpatient-asthma"
GITHUB_REPO_PATH="https://github.research.chop.edu/api/v3/repos/cds"

curl -u ${GITHUB_ACCESS_USER}:${GITHUB_ACCESS_TOKEN} "${GITHUB_REPO_PATH}/${REPO_NAME}/releases" > tmp.txt

if [ "${REVERT}" = "true" ]
then
  ASSET_URL=$(cat tmp.txt | jq -r '.[] | select(.name == env.VERSION) | .assets[] | select(.name == "release.zip") | .browser_download_url')
else
  if [[ "${GIT_COMMIT}" == "" || "${VERSION}" == "" ]]
  then
    echo "Git Commit and Version required for deploying a new release."
    exit 1
  else
    export RELEASE_NAME=$(git rev-parse --short ${GIT_COMMIT})
    cat tmp.txt | jq -r '.[] | select(.name == env.RELEASE_NAME) | .assets[] | select(.name == "release.zip") | .browser_download_url'
    ASSET_URL=$(cat tmp.txt | jq -r '.[] | select(.name == env.RELEASE_NAME) | .assets[] | select(.name == "release.zip") | .browser_download_url')
  fi
fi
curl -L -o release.zip ${ASSET_URL}