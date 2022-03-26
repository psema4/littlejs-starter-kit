#!/usr/bin/env sh

#TODO: Integrate [build.bat](https://github.com/psema4/LittleJS/blob/main/build.bat)

WD=$PWD

if [ -d "${WD}/docs" ]; then
    rm -rf "${WD}/docs"
fi

mkdir "${WD}/docs"
cp index.html ${WD}/docs/

mkdir -p "${WD}/docs/vendor/LittleJS"
cp -p ${WD}/vendor/LittleJS/engine.all.min.js ${WD}/docs/vendor/LittleJS/

mkdir "${WD}/docs/assets"
cp -rp ${WD}/assets/* ${WD}/docs/assets/

mkdir "${WD}/docs/src"
cp -rp ${WD}/src/* ${WD}/docs/src/

# combine & minify
# ...

# update index.html
perl -pi -e "s/engine\.all\.js/engine.all.min.js/g" ${WD}/docs/index.html

echo "Done."
