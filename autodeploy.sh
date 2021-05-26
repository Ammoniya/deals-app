git pull
npm build
cp -r ./build/* /usr/share/nginx/www
sudo systemctl restart nginx
