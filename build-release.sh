#!/usr/bin/env sh

while getopts d: option # TODO add option to build or not
do
  case "${option}"
    in
    d) OUTDIR=${OPTARG};;
  esac
done

STATIC=${DIST:="dist/"}
SERVER="target/server.jar"
PKG="deciduously-com"
VER="0.2.0" # TODO grab PKG and VER automagically
TARGET="${PKG}-${VER}"
OUTFILE="${OUTDIR}/${TARGET}.tar.xz"
ERRORLOG="build-release_error.log"

echo "--- Building deciduously-com..."

echo "--- Chomping parens..."
boot build 2>${ERRORLOG}

echo "--- Scrubbing floor..."
if [[ -d "${TARGET}/" ]]
  then
    rm -rf "${TARGET}"
  fi
mkdir -p "${TARGET}/target"

echo "--- Perusing literature..."
cp ${SERVER} "${TARGET}/target"
cp -r ${STATIC} "${TARGET}/"
cp README.md "${TARGET}/"
cp LICENSE "${TARGET}/"

echo "--- Hunting rabbits..." # you should fix your app to not output them at all
if [[ -d "${TARGET}/styles/" ]]
  then
    rm -r "${TARGET}/styles/"
  fi

echo "--- Purchasing real estate..."
if [[ -f ${OUTFILE} ]]
  then
    rm ${OUTFILE}
  fi

echo "--- Cooking dinner..."
tar -cf - ${TARGET} | xz -9e -c - > ${OUTFILE} 2>${ERRORLOG}

echo "--- Scooping litter..."
rm -rf ${TARGET}
if [[ -f ${OUTFILE} ]]
  then
    echo "--- Hot and ready at ${OUTFILE}"
  else
    echo "Failed at the only job I have... check build-release_error.log.  I owe
    you dinner sometime!"
  fi
