const utils = require('./src/utils');
const server = require(`${utils.baseDir}/src/server`);


if (process.env.NODE_ENV === 'DEV') {
    /**
     *  If dev environment, run express server for local debugging.
     */
    let port = process.env.PORT || 3000;
    server.listen(port);
    console.log('Server is running on port %s', port);
} else {
    /**
     *  Creates a function instance and with a specific specs.
     *  Serve to FireBase Express server obj.
     */
    const functions = require('firebase-functions')
        .region('europe-west1')
        .runWith({timeoutSeconds: 300, memory: '2GB'});
    exports.puppeteer = functions.https.onRequest(server);
}
