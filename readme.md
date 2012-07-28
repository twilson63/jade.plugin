# jade.plugin

A jade plugin for flatiron

## usage

``` javascript
var jade = require('jade.plugin');
app.use(jade.plugin, 
  {dir: __dirname + '/views', ext: '.jade' });

app.router.get('/', function(){
  app.render(this.res, 'index', {title: 'foo'});
});
```

## install

``` sh
npm install jade.plugin
```

## test

```
npm test
```

## license

MIT

## contributions

pull requests are welcome

## thanks

@visionmedia - TJ for Jade
@nodejitsu - For Flatiron
@nodejs - For NodeJs
