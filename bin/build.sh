#!/usr/bin/env sh

#TODO: Integrate [build.bat](https://github.com/psema4/LittleJS/blob/main/build.bat)

WD=$PWD

if [ -d "${WD}/build" ]; then
    rm -rf "${WD}/build"
fi

mkdir "${WD}/build"
cp index.html ${WD}/build/

mkdir -p "${WD}/build/vendor/LittleJS"
cp -p ${WD}/vendor/LittleJS/engine.all.min.js ${WD}/build/vendor/LittleJS/

mkdir "${WD}/build/assets"
cp -rp ${WD}/assets/* ${WD}/build/assets/

mkdir "${WD}/build/src"
cp -rp ${WD}/src/* ${WD}/build/src/

# combine & minify
# ...

# update index.html
perl -pi -e "s/engine\.all\.js/engine.all.min.js/g" ${WD}/build/index.html

echo "Done."
