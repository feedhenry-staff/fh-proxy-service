'use strict';

var mbaasApi = require('fh-mbaas-api')
  , express = require('express')
  , proxy = require('fh-dev-proxy')
  , mbaasExpress = mbaasApi.mbaasExpress();

// Need to ensure proxy accepts connections from local development machines
process.env['FH_SERVICE_APP_PUBLIC'] = true;

var app = express();

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys([]));
app.use('/mbaas', mbaasExpress.mbaas);

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

// fhlint-begin: custom-routes
app.use('/*', proxy.proxy);
// fhlint-end

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001;
var server = app.listen(port, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
