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

# TODO: 修改版本
# npx ovsx publish /Users/koro/work/web_my/koro1FileHeader/korofileheader-4.7.8.vsix -p 765ed6f2-2c30-4466-9cb5-223e323b650a
