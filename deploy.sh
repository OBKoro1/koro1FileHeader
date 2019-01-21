!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add .

git commit -m $1

git push

# 打包
# vsce package

# 打包报错：
# Error: Command failed: npm list --production --parseable --depth=99999
# npm ERR! missing: hoek@6.0.4, required by korofileheader@3.4.0
# 使用：vsce package --yarn