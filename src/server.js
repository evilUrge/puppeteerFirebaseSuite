let fs = require('fs');
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
         * Map all available handlers to express route.
         * @type {{handler}|*}
         */
        let RouteList = {};
        let baseHandlersFolder = `${utils.baseDir}/src/tests`;
        fs.readdirSync(baseHandlersFolder).forEach((fileName) => {
            if (fileName.includes('.js')) {
                let HandlerImport = require(`${baseHandlersFolder}/${fileName}`);
                Object.keys(HandlerImport).forEach((handler)=> {
                    if (HandlerImport[handler].type && Array.isArray(HandlerImport[handler].type)){
                        RouteList[handler] = HandlerImport[handler].type.map((method)=>{
                            return { ...HandlerImport[handler], type:method}
                        })
                    } else {
                        return RouteList[handler] = HandlerImport[handler]
                    }
                });
            }
        });
        return RouteList;
    })();
    Object.keys(urls).forEach((path)=>{
        /**
         *  Map all the available urls; function as a route mapper.
         */
        try {
            const handlers = Array.isArray(urls[path]) ? urls[path] : [urls[path]];
            handlers.forEach((handler)=>server[handler.type ? handler.type: 'get'](`/${path}${handler.url? handler.url : ''}`, handler.exec ? handler.exec : handler));
            logger.info(`/${path}`);
        } catch (e) {
            console.log(e);
            logger.error(`Failed to register the following handler: ${path}`);
        }
    });
    return server;
})();
