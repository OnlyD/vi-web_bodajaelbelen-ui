'use strict';

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const uri = request.uri;
    
    // Define the permanent token (you can change this)
    const VALID_TOKEN = 'love4ever';
    
    // Parse query string to get token parameter
    const querystring = request.querystring;
    const urlParams = new URLSearchParams(querystring);
    const providedToken = urlParams.get('token');
    
    // Check if accessing the access-denied page (allow it)
    if (uri === '/access-denied.html') {
        callback(null, request);
        return;
    }
    
    // Check if token is valid
    if (providedToken === VALID_TOKEN) {
        // Token is valid, allow request to continue
        callback(null, request);
        return;
    }
    
    // Invalid or missing token - redirect to access denied page
    const response = {
        status: '302',
        statusDescription: 'Found',
        headers: {
            location: [{
                key: 'Location',
                value: '/access-denied.html'
            }],
            'cache-control': [{
                key: 'Cache-Control',
                value: "max-age=0"
            }]
        }
    };
    
    callback(null, response);
};
