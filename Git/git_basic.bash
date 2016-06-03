# 查看帮助
git help
# 查看某条命令的帮组
git help <command>

# 创建仓库

# 拉取代码
git clone [https url]

# 添加文件
git add [文件路径]

# 提交文件
git comment -m ［"注释"]

# 查看历史
git log [文件路径]

# to be complete
echo "# CodeSnippets" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/JimmyDinSpace/CodeSnippets.git
git push -u origin master