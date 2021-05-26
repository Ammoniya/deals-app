git pull
npm build
cp ./build/* /usr/share/nginx/www
sudo systemctl restart nginx
