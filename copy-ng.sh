rm -rf ./web/

cd ../ngapp
npm run build -- --prod --base-href ./

rsync -av ./dist/ngapp/** ../atom/web
