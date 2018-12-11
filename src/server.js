let fs = require('fs');
let _ = require('lodash');
let express = require('express');
let bodyParser = require('body-parser');
let bunyan = require('bunyan');

let utils = require('./utils');


module.exports = init = (() => {
    let logger = bunyan.createLogger({name: 'puppeteerSuite', level: 'debug'});

    let server = express({
        name: 'puppeteerFunction',
        log: logger,
    });

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: true}));

    let urls = (() => {
        /**
         * Map all available tests to express route.
         * @type {{productPage}|*}
         */
        let RouteList = {};
        let baseHandlersFolder = `${utils.baseDir}/src/tests`;
        _.forEach(fs.readdirSync(baseHandlersFolder), (fileName) => {
            if (fileName.includes('.js')) {
                let HandlerImport = require(`${baseHandlersFolder}/${fileName}`);
                _.forEach(Object.keys(HandlerImport), (handler) => RouteList[`v1/${handler}`] = HandlerImport[handler]);
            }
        });
        return RouteList;
    })();
    _.forOwn(urls, (handler, path) => {
        /**
         *  Map all the available urls; function as a route mapper.
         */
        try {
            server[handler.type ? handler.type : 'get'](`/${path}${handler.url? handler.url : ''}`, handler.exec ? handler.exec : handler);
            logger.info(`/${path}`);
        }
        catch (e) {
            logger.error(`Failed to register the following handler: ${path}`);
        }
    });
    return server;
})();
