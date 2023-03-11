# Ensure we have the last version of master
git checkout master
git pull

# build frontend
cd frontend
npm run build
echo "Frontend build done"
cd ..

# copy frontend build to backend public
rm -rf backend/public
echo "Removed previous frontend version"
cp -R frontend/build backend/public
echo "Copied new frontend version"

# deploy to fly
cd backend
flyctl -a in211 deploy --local-only

