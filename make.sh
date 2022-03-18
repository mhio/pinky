#!/usr/bin/env bash
set -ueo pipefail
dateTime(){ date -u '+%Y-%m-%dT%H:%M:%SZ'; }
rundir=$(cd -P -- "$(dirname -- "$0")" && printf '%s\n' "$(pwd -P)")
cd "$rundir"

# {make.sh user}

run:build:docs () {
  yarn build:docs:html
  cd docs/pages
  git init -b docco
  git add .
  git commit -m docco
  git remote add origin https://github.com/mhio/pinky
  git push --force --set-upstream origin docco
}

run:watch () {
  nodemon -e sh,ts,json -i .git -x "$@"
} 

# {make.sh common}

run:help(){
  set +x
  echo "Commands:"
  declare -F | awk '/^declare -f run:/ { printf("  %s\n", substr($0,16)); }'
  exit 1
}
[ -z "${1:-}" ] && run:help
cmd=$1
shift
set -x
run:"$cmd" "$@"

