import { Router } from 'express';
const routes = new Router();

// use res.render to load up an ejs view file

/**
 * Demo pages
 */

// index page 
routes.get('/', function(req, res) {
	res.render('pages/index');
});

// about page 
routes.get('/about', function(req, res) {
	res.render('pages/about');
});

/**
 * Custom activity routes
 */

// config.json
routes.get('/ca/config.json', function(req, res) {
    console.log("getConfig");
    var host = 'https://' + req.headers.host;
    console.log(host);

    var json = {
      workflowApiVersion: "1.1",
      metaData: {
        icon: host + "/images/salesforce-icon-200.png",
        iconSmall: host + "/images/salesforce-icon-100.png",
        category: "message",
        isConfigured: "false",
        configOnDrop: "true"
      },
      type: "REST",
      lang: {
        "en-US": {
          name: "Basic Custom Activity",
          description: "Basic Custom Activity"
        }
      },
      arguments: {
        execute: {
          inArguments: [],
          url: host + "/ca/execute",
          verb: "POST",
          body: "",
          header: "",
          format: "json",
          useJwt: "false",
          timeout: 10000
        }
      },
      configurationArguments: {
        applicationExtensionKey: "", // we recommend leaving it ou
        save: {
          url: host + "/ca/save",
          useJwt: "false"
        },
        publish: {
          url: host + "/ca/publish",
          useJwt: "false"
        },
        validate: {
          url: host + "/ca/validate",
          useJwt: "false"
        },
        stop: {
          url: host + "/ca/stop",
          useJwt: "false"
        }
      },
      wizardSteps: [
        {
          label: "Step 1",
          key: "step_1"
        },
        {
          label: "Step 2",
          key: "step_2"
        },
        {
          label: "Step 3",
          key: "step_3"
        }
      ],
      userInterfaces: {
        configModal: {
          height: "600",
          width: "800",
          url: host + "/ca/ui?numSteps=3"
        },
        runningModal: {
          url: host + "/ca/ui/modal"
        },
        runningHover: {
          url: host + "/ca/ui/hover"
        }
      },
      schema: {
        arguments: {
          execute: {
            inArguments: [],
            outArguments: []
          }
        }
      }
    };
	console.log("config.json: ", json);
	return res.status(200).json(json);
});

// config ui
routes.get('/ca/ui', function(req, res) {
	res.render('pages/editModal');
});

// config ui
routes.get('/ca/ui/edit', function(req, res) {
	res.render('pages/editModal');
});

// running modal
routes.get('/ca/ui/modal', function(req, res) {
	res.render('pages/runningModal');
});

// running hover
routes.get('/ca/ui/hover', function(req, res) {
	res.render('pages/runningHover');
});

/**
* execute - The API calls this method for each contact processed by the journey.
* example of request's body:
* {
* "inArguments":
* [
* {"source_de": "ad59f02e-f93b-e711-af11-78e3b50b7f0c"},
* {"destination_de": "7c08723b-f93b-e711-af11-78e3b50b7f0c"},
* "activityObjectID": "5d88fd34-ba45-42ef-abda-d4a1f5830171",
* ],
* "journeyId": "8baa72eb-cc91-4c19-b053-e869a5bd5e42",
* "activityId": "5d88fd34-ba45-42ef-abda-d4a1f5830171",
* "definitionInstanceId": "45e3ec68-7b70-4e0d-9c13-218344f90fcb",
* "activityInstanceId": "b8f5640b-ecbe-411e-a143-29d21a89159a",
* "keyValue": "contact_email@mail.com",
* "mode": 0
* }
 */
routes.post('/ca/execute', function(req, res) {
    console.log("*** execute activity with payload: ", req.body);
	return res.status(200).json({ result: "OK" });
});

/**
* save - Notification is sent to this endpoint when a user saves the interaction (optional).
* called on journey activation
* example of request's body:
* {
* "activityObjectID": "770222dc-a0ca-4024-836a-9644dd26f848",
* "interactionId": "2fa18520-ec47-4db1-a5ec-6cbedae20762",
* "originalDefinitionId": "c0b22824-c4db-441b-a8e2-7aea9bfca439",
* "interactionKey": "6384e00d-a5cf-e993-e307-26079ad8554d",
* "interactionVersion": "2"
* } 
 */
routes.post('/ca/save', function(req, res) {
    console.log("*** save activity: ", req.body);
	return res.status(200).json({ result: "OK" });
});

/**
* publish - Notification is sent to this endpoint when a user publishes the interaction.
* called on journey activation
* example of request's body:
* {
* "activityObjectID": "770222dc-a0ca-4024-836a-9644dd26f848",
* "interactionId": "2fa18520-ec47-4db1-a5ec-6cbedae20762",
* "originalDefinitionId": "c0b22824-c4db-441b-a8e2-7aea9bfca439",
* "interactionKey": "6384e00d-a5cf-e993-e307-26079ad8554d",
* "interactionVersion": "2",
* "isPublished": true
* }
 */
routes.post('/ca/publish', function(req, res) {
    console.log("*** publish activity: ", req.body);
	return res.status(200).json({ result: "OK" });
});

/**
* validate - Notification is sent to this endpoint when a user performs some validation
* as part of the publishing process (optional).
* example of request's body:
* {
* "activityObjectID": "770222dc-a0ca-4024-836a-9644dd26f848",
* "interactionId": "2fa18520-ec47-4db1-a5ec-6cbedae20762",
* "originalDefinitionId": "c0b22824-c4db-441b-a8e2-7aea9bfca439",
* "interactionKey": "6384e00d-a5cf-e993-e307-26079ad8554d",
* "interactionVersion": "2"
* }
 */
routes.post('/ca/validate', function(req, res) {
    console.log("*** validate activity: ", req.body);
	return res.status(200).json({ result: "OK" });
});

/**
* stop - Notification is sent to this endpoint when a user stops any active version of the interaction.
* The notification will be for that particular version’s activity (optional).
 */
routes.post('/ca/stop', function(req, res) {
    console.log("*** stop activity: ", req.body);
	return res.status(200).json({ result: "OK" });
});


export default routes;