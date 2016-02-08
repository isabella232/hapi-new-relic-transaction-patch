'use strict';

var expect   = require('chai').expect;
var Hapi     = require('hapi');
var NewRelic = require('newrelic');
var Sinon    = require('sinon');

var server = new Hapi.Server();
server.connection({ port: 3000 });
server.register([
  require('inject-then'),
  require('../lib/index')
], function () { });

server.route({
  method: 'GET',
  path: '/hello/{name}',
  config: {
    handler: function (request, reply) {
      reply({});
    }
  }
});

describe('plugin', function () {

  it('calls NewRelic.setTransactionName with the correct method and route', function () {
    var newRelicSpy = Sinon.spy(NewRelic, 'setTransactionName');

    return server.injectThen({
      method: 'GET',
      url: '/hello/banana'
    })
    .finally(function () {
      expect(newRelicSpy.withArgs('GET//hello/{name}').calledOnce).to.be.true;
      newRelicSpy.restore();
    });
  });

});
