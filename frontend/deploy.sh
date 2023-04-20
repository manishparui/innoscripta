branch=$(git branch --show-current)
nodeVersion=$(node --version)
reactVersion=$(npm view react version)

echo "Node => ${nodeVersion}"
echo "React => ${reactVersion}"
echo "Branch => ${branch}"
if [[ $(git diff --stat) != '' ]]; then
  echo "Repo => dirty"
else
  echo "Repo => clean"
fi

read -p "Continue? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

npm run build

cp -a ./build/. ./../manishparui.github.io/

cd ./../manishparui.github.io

git add .
git commit -m "$(date)"
git push

cd ./../manishparui