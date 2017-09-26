#!/bin/bash
THIS_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

node "$THIS_SCRIPT_DIR/index.js" $REQUEST "$PROJECT_PATH"