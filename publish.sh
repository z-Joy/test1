#! /bin/bash
# 执行git命令 切到master合并分支代码，
git_branch=`git symbolic-ref --short -q HEAD`
echo current branch is $git_branch
git checkout master
git pull origin master
git pull origin $git_branch
git push origin master
# 切换回原来分支
# git checkout $git_branch
# echo current branch building...
# npm run build-prod
# echo current branch build success
