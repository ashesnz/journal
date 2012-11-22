var restify = require('restify');
var static = require('node-static');
var pg = require('pg');

var conString = process.env.PG_CONNECTION_STRING;
var port = process.env.NODE_PORT
var pgClient = new pg.Client(conString);
pgClient.connect();

file = new static.Server('./public', {"cache": false, "Cache-Control": "no-cache, must-revaliate"} );


var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));

server.get('/entry/:id', function(req, res, next) {
                      pgClient.query("SELECT id, title, tags, body, created FROM entry_tbl ORDER BY created ASC", function(err, result) {
                                   res.send( result.rows );
                      });
           });

server.put('/entry/:id', function(req, res, next) {
            var id = req.params.id;
            var title = req.body.title;
            var body = req.body.body;
           var tags = req.body.tags;

            sql = "INSERT INTO entry_tbl( id, title, body, tags ) VALUES ( '" + id + "', '" + title + "', '" + body + "', '" + tags + "')";
            pgClient.query( sql, function(err, result) { });
            
            res.send( 200 );
            });

server.post('/entry/:id', function(req, res, next) {
            var id = req.params.id;
            var title = req.body.title;
            var body = req.body.body;
            var tags = req.body.tags;

            sql = "UPDATE entry_tbl SET title = '" + title + "', body = '" + body + "' , tags = '" + tags + "' WHERE id = '" + id + "'";
            pgClient.query( sql, function(err, result) { });

            res.send( 200 );
           });

server.get(/^\/.*/, function(req, res, next) {
           file.serve(req, res, next);
           });

server.listen(port, function() {
              console.log('%s listening at %s', server.name, server.url);
              });
