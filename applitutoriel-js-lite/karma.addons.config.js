const path = require("path");

const clientContext= [
    [/moment[\/\\]locale$/, /fr|en/],
    [/intl[\/\\]locale-data[\/\\]jsonp$/, /((fr)|(en))$/],
    [/^\.$/, (context) => {
        if (!/\/log4js\/lib$/.test(context.context)) return;
        context.regExp = /^\.\/appenders\/console.*$/;
        context.request = ".";
    }],
    "cluster",
    "continuation-local-storage",
    "fs"

];
module.exports = (karmaConfig) => {
    return {
        ...karmaConfig,
        browsers: ["FirefoxHeadless"],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            },
        },
        template: {
            debug: "./test/template/debug.html",
            context: "./test/template/context.html",
            clientContext: "./test/template/client_with_context.html"
        },
        webpack: { ...karmaConfig.webpack, externals:  (context, request, callback) => {
            if( /log4js\/lib\/appenders/.test(context) && (!/console/.test(request) && (!/adapters/.test(request))) && (/^\.\//.test(request))) {
                return callback(null, "{}");
            } 
            for (let i = 0; i < clientContext.length; i++) {
                let extern = clientContext[i];
                if (extern.test) { // c'est une regexp'
                    if (extern.test(request)) {
                        return callback(null, "{}");
                    }
                } else if (request == extern) {
                    return callback(null, "{}");
                }
            }
    
            return callback();
        }}
    };
}