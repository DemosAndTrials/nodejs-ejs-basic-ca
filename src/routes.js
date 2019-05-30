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
        applicationExtensionKey: "722956e9-3c19-46e6-adab-365d98ca74a4",
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
          url: host + "/ca/ui?numSteps=1"
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

export default routes;