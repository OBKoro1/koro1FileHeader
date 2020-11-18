!/usr/bin/env sh

# 确保脚本抛出遇到的错误

# 打包
# vsce package

vsce package --yarn # 解决下文报错

# 发布地址: https://marketplace.visualstudio.com/manage/publishers/obkoro1

# 打包报错：
# Error: Command failed: npm list --production --parseable --depth=99999
# npm ERR! missing: hoek@6.0.4, required by korofileheader@3.4.0
# 使用：vsce package --yarn

# vscodium发布插件

# npx ovsx publish file -p token

# tag
# https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE

# git tag -a 'v0.0.12' -m 'tag信息'
# git push origin --tags
# git tag

# git tag -l | xargs git tag -d #删除所有本地分支
# git fetch origin --prune #从远程拉取所有信息
