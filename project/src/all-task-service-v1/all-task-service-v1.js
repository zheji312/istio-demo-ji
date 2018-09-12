const port = 3001;

const express = require('express');
const app = express();
const request = require('request-promise-native');

// set pug as template engine to render HTML table
app.set('view engine', 'pug');


// GET - /taskpage/user/:id
// Desc: to get detail of a specific user that is associated with the task
app.get('/taskpage/user/:id', async(req, res) => {
	const custom_headers = getCustomHeadersConfig(req);
	const input_url = "http://singleuser/api/user/" + req.params.id;
	let up
		try {
			up = await request({
				url: input_url,
				headers: custom_headers,
				json: true
			})
		} catch (error) {
			up = error;
			res.status(500).send(up);
		}
	res.send(up);
})


// Test Endpoint
app.get('/', async(req, res) => {
	res.send(`hello world - alltask service`);
})

// GET - /taskpage
// Desc: display tasks and associated user
app.get('/taskpage', async(req, res) => {
	var taskList = [];
	var taskDetail = ["Add tables on UI","Modify query condition","Grant access to reportuser"];

  for (var i = 1; i < 4; i++) {
		let d = new Date();
    var task = {
      'taskName': `Task${i}`,
      'taskDetail': taskDetail[i-1],
      'createdAt': d.toLocaleString(),
      'assignedTo': i
    }
	// Add task in to task array
	taskList.push(task);
}

// Render index.pug page using task array
  res.render('index', {"taskList": taskList});
})


//Get the tracing headers and return a header file
function getCustomHeadersConfig(req){
  let custom_headers = [
    'x-request-id',
		'x-b3-traceid',
		'x-b3-spanid',
		'x-b3-parentspanid',
		'x-b3-sampled',
		'x-b3-flags',
		'x-ot-span-context',
		'test-header'
  ];

  let config_headers = {};
  for(let h of custom_headers){
    if(req.header(h)){
      config_headers[h] = req.header(h);
    }
  }
  return config_headers;

}

  var server = app.listen(port, function () {
    console.log(`all-task-service-v1 listening on ${port}`);
})
