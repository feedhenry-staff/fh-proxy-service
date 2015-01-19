FeedHenry Proxy Service
=======================

A service that can deployed on the FeedHenry platform to be used during local 
development to proxy requests to private web services. Uses header 
authorisation and only supports HTTPS requests to ensure secure access.

## Usage

#### Via HTTP Override
This proxy can be used by installing the _fh-dev-proxy_ module in your project 
and making an initialisation call in your cloud code as described 
[here](https://github.com/evanshortiss/fh-dev-proxy#development-usage). Using 
the linked _httpOverride.init_ means you don't need to change your coding style 
or manage the wrapping of requests yourself, which in turns means easier 
development.


#### Manual Usage
Alternatively you bypass the _httpOverride.init_ explained at the link above 
and can manage which requests are proxied manually. Requests sent to this proxy 
service _must include_ the following headers:

* **x-fh-proxy-instance** - The GUID of the Service.
* **x-fh-proxy-api-key** - The API Key of the Service.
* **x-fh-proxy-target** - The original host your request was aimed at. You must 
omit the protocol and just supply the hostname.
* **x-fh-proxy-protocol** - The original protocol of your request. Must be either 
_http:_ or _https:_.

As an example, say you wanted to get the private URL 
_http://uat.private-webservice.com/api/users_ and it was accessible via your 
FeedHenry domain. You could do the following:

```javascript
var https = require('https');

var defaultHeaders = {
	'x-fh-proxy-instance': GUID_OF_PROXY_SERVICE
	'x-fh-proxy-api-key': API_KEY_OF_PROXY_SERVICE
	'x-fh-proxy-target': 'uat.private-webservice.com'
	'x-fh-proxy-protocol': 'http:' // We used http in the example url
};

var req = http.request({
	host: URL_OF_PROXY_SERVICE,
	path: '/api/users',
	headers: defaultHeaders
}, function (res) {
	// Handle response
});

req.on('error', erroHandler);
req.end();
```

If using this approach will need to come up with your own strategy for 
determining when to use the proxy solution vs. actually targeting the original 
host and omitting the FeedHenry headers.
