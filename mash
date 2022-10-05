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
run:completion:words(){
  declare -F | while read -r line; do
    [ "${line:11:4}" = "run:" ] && [ "${line:11:15}" != "run:completion:" ] && echo "${line:15}"
  done
}
run:help(){
  set +x
  echo "Commands:"
  run:completion:words | while read -r line; do printf "  %s\n" "${line}"; done
  exit 1
}
[ -z "${1:-}" ] && run:help
cmd="$1"
shift
[[ "$cmd" == completion:* ]] || set -x
run:"$cmd" "$@"
