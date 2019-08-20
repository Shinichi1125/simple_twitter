# exe

> A Vue.js project

## Build Setup

``` bash 
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

```
## in order to properly run this app, you need to activate two local server
## one for running the main app (port 8080), and the other as a local API (port 3000)

## first, you run the following command to activate the local API
npm run api
```

```
## and then you open another Git console, make sure you are at the same directory as where you ran ```npm run api```, 
## and run 
npm run dev
```

```
## there is a backup file for ```feed.json```, which is ```feed_backup.json```. 
## feel free to use the back up whenever you want to regain the original state of ```feed.json```
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
