requirejs.config({
    paths: {
        postmonger: 'js/postmonger'
    }
});

// Postmonger Events
// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
define(['postmonger'], function (Postmonger) {
    'use strict';

    var connection = new Postmonger.Session();

    $(window).ready(function () {
        console.log("modal ready");
        connection.trigger('ready');
    });

    connection.on('initActivityRunningHover', function (payload) {
        console.log('initActivityRunningHover');
        //console.log('payload', JSON.stringify(payload));

        if (payload) {
            var jsonPayload = payload['arguments'].execute.inArguments;

            if (typeof jsonPayload != "undefined" && jsonPayload.length > 0) {

                // saved inputs always first element
                var content = jsonPayload[0];
                Object.keys(content).forEach(function(key) {
                    console.log('Key : ' + key + ', Value : ' + content[key])
                    var selector = '#' + key;
                    var value = content[key];
                    $(selector).val(value);
                })
            }
        }
    });

    connection.on('initActivityRunningModal', function (payload) {
        console.log('initActivityRunningModal');
        //console.log('payload', JSON.stringify(payload));

        if (payload) {
            var jsonPayload = payload['arguments'].execute.inArguments;

            if (typeof jsonPayload != "undefined" && jsonPayload.length > 0) {

                // saved inputs always first element
                var content = jsonPayload[0];
                Object.keys(content).forEach(function(key) {
                    console.log('Key : ' + key + ', Value : ' + content[key])
                    var selector = '#' + key;
                    var value = content[key];
                    $(selector).val(value);
                })
            }
        }
    });
});
