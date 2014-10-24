var test = require('tape');
var WebSocket = require('ws');
var endpoint = require('./helpers/wsurl') + '/read';
var pull = require('pull-stream');
var ws = require('../source');
var socket;

test('create a websocket connection to the server', function(t) {
  t.plan(1);

  socket = new WebSocket(endpoint);
  socket.onopen = t.pass.bind(t, 'socket ready');
});

test('read values from the socket and end normally', function(t) {
  t.plan(2);

  ws(socket).pipe(pull.collect(function(err, values) {
    t.ifError(err);
    t.deepEqual(values, ['a', 'b', 'c', 'd']);
  }));
});
