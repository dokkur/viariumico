#!/bin/bash
set -e  # Exit with non-zero if anything fails

# We do Travis check only for this branch
BUILD_BRANCH="master"
echo "Be aware, for this repo we build only $BUILD_BRANCH branch, not any other"

# Do not build a new version if it is a pull-request or commit not to BUILD_BRANCH
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$BUILD_BRANCH" ]; then
    echo "Not $BUILD_BRANCH, skipping deploy;"
    exit 0
fi
HEAD_COMMIT=`git rev-parse --verify --short HEAD`

echo "Prepare the key..."
# Encryption key is a key stored in travis itself
OUT_KEY="id_rsa"
echo "Trying to decrypt encoded key..."
# key was crypted with the same command without `-d` flag
openssl aes-256-cbc -k "$ENCRYPTION_KEY" -in deploy/id_rsa.enc -out $OUT_KEY -d -md sha256
chmod 600 $OUT_KEY
echo "Add decoded key to the ssh agent keystore"
eval `ssh-agent -s`
ssh-add $OUT_KEY

rsync -avi -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" dist/ deployer@frontend.viarium.io:/var/www/viariumico/dist/

curl -X POST --data-urlencode "payload={\"channel\": \"#notifications\", \"username\": \"Travis-CI\", \"text\": \"Hey, I heard that there was a successful build of \`viariumico\` from commit with SHA $HEAD_COMMIT. Hope it was useful information for you.\", \"icon_emoji\": \":octocat:\"}" https://hooks.slack.com/services/$SLACK_TOKEN
