requirejs.config({
    paths: {
        postmonger: 'js/postmonger'
    }
});

// Postmonger Events
// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
define(['postmonger'], function (Postmonger) {
    'use strict';

    console.log('*** ' + window.location.href + ' ***');

    var connection = new Postmonger.Session();

    var tokens;
    var endpoints;
    var inArgPayload = {};
    var schema = {};
    var step = 1;

    // get the # of steps
    // get it from hidden field
    //var numSteps = $('#numSteps').val();
    var numSteps = getUrlParameter('numSteps');
    // do some error checking on the inbound num steps
    console.log("numSteps: " + numSteps);


    $(window).ready(function () {
        console.log("trigger requestSchema");
        connection.trigger('requestSchema');
        console.log("trigger ready");
        // Called any time there is load time required between Journey Builder and the custom application
        // (on iFrame load, and whenever a Next or Back button is clicked).
        connection.trigger('ready');

        // TODO just for testing
        console.log("*** trigger other events ***");
        connection.trigger('requestEndpoints');
        connection.trigger('requestTokens');

        console.log("requestInteraction ");
        connection.trigger('requestInteraction');
        console.log("requestTriggerEventDefinition ");
        connection.trigger('requestTriggerEventDefinition');
    });

    // - Broadcast in response to the first ready event called by the custom application.
    //   This is typically done on $(window).ready()
    // - Response (payload): { name: 'MyActivity', metaData: {}, arguments: {}, configurationArguments: {}, outcomes: {} }
    // - When the activity is dragged from the activity list initially (meaning that it has no existing data),
    //   the default activity structure is pulled from the custom application's config.json.
    //   If the activity is a configured activity, the existing saved JSON structure of the activity is passed.
    connection.on('initActivity', function (payload) {
        console.log('initActivity');
        if (payload) {
            inArgPayload = payload;

            console.log('payload', JSON.stringify(payload));

            var jsonPayload = payload['arguments'].execute.inArguments;

            if (typeof jsonPayload != "undefined" && jsonPayload.length > 0) {

                // get the keys from the arguments array
                for (var i = 0; i < jsonPayload.length; i++) {

                    var obj = jsonPayload[i];
                    var formKey = Object.keys(obj);
                    var selector = '#' + formKey;
                    var value = obj[formKey];

                    $(selector).val(value);
                }
            }
        }
        gotoStep(step);
    });

    // Broadcast in response to a requestSchema event called by the custom application.
    connection.on('requestedSchema', function (data) {
        if (data.error) {
            console.error(data.error);
        } else {
            schema = data['schema'];
        }
        console.log('*** Schema ***', JSON.stringify(schema));
    });

    // - Broadcast in response to a requestTokens event called by the custom application.
    //   Journey Builder passes back an object containing both a legacy token and a Fuel2 token.
    // - Response (tokens): { token: <legacy token>, fuel2token: <fuel api token> }
    connection.on('requestedTokens', function (data) {
        if (data.error) {
            console.error(data.error);
        } else {
            tokens = data;
        }
        console.log('*** requestedTokens ***', JSON.stringify(data));
    });

    // - Broadcast in response to a requestEndpoints event called by the custom application.
    //   Journey Builder passes back an object containing a REST host URL.
    // - Response (endpoints): { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
    connection.on('requestedEndpoints', function (data) {
        if (data.error) {
            console.error(data.error);
        } else {
            endpoints = data;
        }
        console.log('*** requestedEndpoints ***', JSON.stringify(data));
    });

    // Broadcast in response to a requestSchema event called by the custom application.
    connection.on('requestedInteraction', function (data) {
        if (data.error) {
            console.error(data.error);
        } else {
            //endpoints = data;
        }
        console.log('*** requestedInteraction ***', JSON.stringify(data));
    });

    connection.on('requestedTriggerEventDefinition', function (data) {
        if (data.error) {
            console.error(data.error);
        } else {
            //endpoints = data;
        }
        console.log('*** requestedTriggerEventDefinition ***', JSON.stringify(data));
    });

    // Broadcast when the next button has been clicked on the configuration modal.
    // The activity should respond by calling nextStep (or ready, if validation failed,
    // and the custom activity wants to prevent navigation to the next step).
    connection.on('clickedNext', function () {
        step++;
        console.log("clicked next step: " + step);
        connection.trigger('nextStep');
    });

    // Broadcast when the back button has been clicked on the configuration modal.
    // The activity should respond by calling prevStep (or ready, if validation failed,
    // and the custom activity wants to prevent navigation to the previous step).
    connection.on('clickedBack', function () {
        step--;
        console.log("clicked back: " + step);
        connection.trigger('prevStep');
    });

    // Broadcast when a new step has been loaded (either via button navigation,
    // or the user clicking on a step via the wizard). Returns a step payload.
    // Response: { key: 'step1', label: 'Step 1' }
    connection.on('gotoStep', function (stepPayload) {
        console.log("go to step: " + step);
        console.log("go to step payload: " + JSON.stringify(stepPayload));
        gotoStep(step);
        connection.trigger('ready');
    });

    // Go to selected step
    function gotoStep(step) {
        $('.step').hide();
        var stepStr = '#step' + step;

        var event = new CustomEvent('isVisible',
            {
                detail: {
                    step: step
                },
                bubbles: true,
                cancelable: false
            });

        // console.log('Current step:'  + step);
        // console.log('Step String: ' + stepStr);
        // remove the case statement ... better handled by if statement
        // special cases ... first step and last step ..
        // if step 1, remove the back button
        // else, we have moved past step 1 and less than num steps, add a back button
        // if step == numSteps (add the done button)
        // if step < numSteps (add the next button)
        // if step > numSteps - we done
        if (step == 1) {
            console.log('Do not show back button');
            $(stepStr).show();
            connection.trigger('updateButton', {button: 'back', visible: false});
        }
        else if (step > 1 && step < numSteps) {
            console.log('Show back button');
            $(stepStr).show();
            connection.trigger('updateButton', {button: 'back', visible: true, enabled: true});
        }

        if (step == numSteps) {
            if (step != 1) {
                $(stepStr).show();
            }
            connection.trigger('updateButton', {button: 'next', text: 'done', visible: true});
        } else {
            console.log('Show next button');
            connection.trigger('updateButton', {button: 'next', text: 'next', enabled: true});
        }

        if (step > numSteps) {
            save();
        }

        document.dispatchEvent(event);
    }

    // This listens for Journey Builder to send endpoints
    // Parameter is either the endpoints data or an object with an
    // "error" property containing the error message
    connection.on('getEndpoints', function (data) {
        if (data.error) {
            console.error(data.error);
        } else {
            endpoints = data;
        }
        console.log('*** getEndpoints ***', data);
    });

    //
    // Save
    //
    function save() {
        console.log('*** saving arguments ***');

        inArgPayload['arguments'].execute.inArguments = []; // remove all the args, only save the last one

        // push all of the form names / values onto the args stack
        $('#genericActivity *').filter(':input').each(function () {
            console.log("ID: " + this.id + " Name: " + this.name + " Value: " + this.value); //your code here
            var key;

            this.id ? key = this.id : key = this.name;

            var formArg = {};
            formArg[key] = this.value;

            inArgPayload['arguments'].execute.inArguments.push(formArg);
        });
        // add data from schema
        // dynamic binding
        var formArg = {};
        console.log('*** Schema parsing ***', JSON.stringify(schema));
        if (schema !== 'undefined' && schema.length > 0) {
            // the array is defined and has at least one element
            for (var i in schema) {
                var field = schema[i];
                var index = field.key.lastIndexOf('.');
                var name = field.key.substring(index + 1);
                // save only event data source fields
                // {"key":"Event.APIEvent-ed211fdf-2260-8057-21b1-a1488f701f6a.offerId","type":"Text",
                // "length":50,"default":null,"isNullable":null,"isPrimaryKey":null}
                if (field.key.indexOf("APIEvent") !== -1)
                    formArg[name] = "{{" + field.key + "}}";
            }
            // must be set to true for the journey to recognize
            // the activity as fully configured (required for activation)
            inArgPayload.metaData.isConfigured = true;
            inArgPayload['arguments'].execute.inArguments.push(formArg);
        }

        connection.trigger('updateActivity', inArgPayload);
        //
        console.log('payload ', JSON.stringify(inArgPayload));
    }

    /**
     * Get parameter
     * @param name
     * @returns {string}
     */
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

});
