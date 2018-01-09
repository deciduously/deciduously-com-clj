#!/usr/bin/env sh

while getopts d:c: option
do
  case "${option}"
    in
    d) OUTDIR=${OPTARG};;
    c) COMPRESS=${OPTARG};;
  esac
done

RESOURCES="resources/"
SERVER="target/server.jar"
PKG="deciduously-com"
VER="0.1.0"
ATOM="${PKG}-${VER}"
TARGET="${ATOM}/"
OUTFILE="${OUTDIR}/${ATOM}.tar.xz"

if [[ ! -f "${SERVER}" ]]
  then
    boot build
  fi

if [[ -d "${TARGET}" ]]
  then
    rm -rf "${TARGET}"
  fi

mkdir -p "${TARGET}/target"

cp ${SERVER} "${TARGET}/target"
cp -r ${RESOURCES} ${TARGET}
cp README.md ${TARGET}
cp LICENSE ${TARGET}

if [[ -d "${TARGET}styles/" ]]
  then
    rm -r "${TARGET}styles/"
  fi

if [[ -f ${OUTFILE} ]]
  then
    rm ${OUTFILE}
  fi

if [[ ${COMPRESS} ]]
  then
    tar -cf - ${TARGET} | xz -9e -c - > "${OUTFILE}"
  fi

rm -rf ${TARGET}
