git pull
ng build
cp -r ./dist/* /usr/share/nginx/www
sudo systemctl restart nginx
