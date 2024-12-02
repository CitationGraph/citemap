#!/bin/bash
export PATH="$HOME/.local/bin:$PATH"

# Run flask server
# Usage: ./server.sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR/..
poetry run flask run
