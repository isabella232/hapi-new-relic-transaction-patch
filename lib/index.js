'use strict';

var NewRelic = require('newrelic');

exports.register = function (server, options, next) {

  server.ext('onPostAuth', function (request, reply) {
    var name = request.route.method.toUpperCase() + '/' + request.route.path;
    NewRelic.setTransactionName(name);
    reply.continue();
  });

  next();
};

exports.register.attributes = {
  name: 'new_relic',
  version: '1.0.0'
};
