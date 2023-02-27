#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist


# 放置 .nojekyll 以绕过 Jekyll 的处理。
echo > .nojekyll

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

# git init
git checkout -B master
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://hangineer.github.io
# git push -f git@github.com:hangineer/hangineer.github.io.git master

# 如果你要部署在 https://hangineer.github.io/vite-deploy-practice
git push -f https://github.com/hangineer/week06.git master:gh-pages

cd -
