# hapi-new-relic-transaction-patch [![npm version](https://badge.fury.io/js/hapi-new-relic-transaction-patch.svg)](http://badge.fury.io/js/hapi-new-relic-transaction-patch) [![Build Status](https://travis-ci.org/lob/hapi-new-relic-transaction-patch.svg)](https://travis-ci.org/lob/hapi-new-relic-transaction-patch)

This Hapi plugin fixes a bug in node-newrelic that incorrectly reports transactions with URLs of /*. Thib bug occurs when a request extension (onPostAuth, onPreresponse, etc.) calls request.reply() within a promise chain, and concurrent requests are begin handled by the server.

There is an example application that reproduces this bug here: https://github.com/mgartner/newrelic-hapi-url-bug

This plugin works by calling `NewRelic.setTransactionName()` in a `onPostAuth` hook. The name is formatted to show correctly in New Relic's Dashboard with the HTTP method and route path.

### Installation

```
npm i hapi-new-relic-transaction-patch
```

### Registering the Plugin

```js
const Hapi = require('hapi');

let server = Hapi.Server();

server.register([
  require('hapi-new-relic-transaction-patch')
], () => {
  console.log('error:', err);
});
```
