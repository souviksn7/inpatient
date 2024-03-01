#!/bin/bash

TARGET_COMMITISH=$(git rev-parse ${GIT_COMMIT})
REPO_NAME="healthchart-inpatient-asthma"
GITHUB_REPO_PATH="https://github.research.chop.edu/api/v3/repos/cds"

post_data() {
  cat <<EOF
{
  "tag_name": "${VERSION}",
  "target_commitish": "${TARGET_COMMITISH}",
  "name": "${VERSION}",
  "body": "Released on $(date)",
  "prerelease": ${PRERELEASE}
}
EOF
}

# Create a release based on the above parameters
curl -u ${GITHUB_ACCESS_USER}:${GITHUB_ACCESS_TOKEN} -d "$(post_data)" "${GITHUB_REPO_PATH}/${REPO_NAME}/releases" > tmp.txt

if [[ "${PRERELEASE}" == "false" && "${REVERT}" == "false" ]]
then
  UPLOAD_URL="$(cat tmp.txt | jq -r '.upload_url' | sed 's/{.*//')?name=release.zip" &&
  curl -X POST -u ${GITHUB_ACCESS_USER}:${GITHUB_ACCESS_TOKEN} -H "Content-Type: application/zip" --data-binary @release.zip ${UPLOAD_URL}

  # Remove all pre-releases that may have been generated as part of development
  # Only done for production
  curl -u ${GITHUB_ACCESS_USER}:${GITHUB_ACCESS_TOKEN} "${GITHUB_REPO_PATH}/${REPO_NAME}/releases" > tmp.txt

  for i in $(cat tmp.txt | jq --compact-output '.[] | select(.prerelease == true) | {id, tag_name}')
  do
    RELEASE_ID=$(echo ${i} | jq -r '.id')
    TAG_NAME=$(echo ${i} | jq -r '.tag_name')
    curl -X DELETE -u ${GITHUB_ACCESS_USER}:${GITHUB_ACCESS_TOKEN} "${GITHUB_REPO_PATH}/${REPO_NAME}/releases/${RELEASE_ID}"
    curl -X DELETE -u ${GITHUB_ACCESS_USER}:${GITHUB_ACCESS_TOKEN} "${GITHUB_REPO_PATH}/${REPO_NAME}/git/refs/tags/${TAG_NAME}"
  done
fi