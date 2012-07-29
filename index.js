var fs = require('fs'),
  path = require('path')
  jade = require('jade');

// # Flatiron plugin
// 
// usage:
//
//     var jade = require('jade.plugin');
//     app.use(jade.plugin, { dir: 'views', ext: '.jade'});
//     app.render(res, 'index', { title: 'foo' });
//
exports.plugin = {
  name: 'jade.plugin',
  attach: attach
}

// ## attach 
//
// called when plugin is attached to the app
//
// options:
//
// * dir - name of view directory
// * ext - name of view extenstions
//
function attach(options) {
  options.dir = options.dir || './views'
  options.ext = options.ext || '.jade'

  // redirect
  //
  // sends a 302 redirect request
  this.redirect = function(res, location) {
    res.writeHead(302, { 'Location': location});
    res.end();
  }

  // renders jade view
  this.render = function(res, name, context) {
    context = context || {};

    var file = path.join(options.dir, name + options.ext);

    render(file, context, function(err, str) {
      if (err) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(err.toString());
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(str);
      }
    });
  }

}

// ## render 
//
// compiles and returns view via callback
//
function render(view, context, callback) {
  var str = require('fs').readFileSync(view, 'utf8'), 
  fn = jade.compile(str, { filename: view, pretty: true });
  callback(null, fn(context));
}