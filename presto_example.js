var presto = require('presto-client');
var http = require('http');
var concat = require('concat-stream');
var config = require('./config.json')
var st = require('st');

var mount = st({
  path: __dirname,
  cache: false,
  index: 'index.html'
});

var respondWithError = function (err, res, msg) {
  res.writeHead(500, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(err));
};

var server = http.createServer(function (req, res) {
  var client = new presto.Client(config);
  var stHandled = mount(req, res);
  if (!stHandled) {
    req.pipe(concat(function (query) {
      try {
        var q = JSON.parse(query);

        console.log("Received query: " + q.query.toString());

        client.execute(q.query, function (err, result, columns) {
          if (err) {
            var msg = 'error running query';
            console.error(msg, err);
            return respondWithError(err, res, msg);
          }

          console.log(result);

          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(err || result));

        });

      } catch (e) {
        respondWithError(e, res, 'Bummer! There was an error in the server');
      }
    }));
  }
});

server.listen(3000, function (err) {
  if (err) console.error(err);
  console.log('listening on port 3000');
});

