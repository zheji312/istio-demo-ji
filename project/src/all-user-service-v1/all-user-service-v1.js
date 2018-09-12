const port = 3001;

const express = require('express');
const app = express();
const request = require('request-promise-native');

//GET - /api/users Endpoint
// Desc: to get a list of users
app.get('/', async(req, res) => {
  const custom_headers = getCustomHeadersConfig(req);
  const input_url = "https://reqres.in/api/users";
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
  var users = {"users": up.data};

  res.send(users);
})


//Test Endpoint
// Desc: to test the service
/*
app.get('/', async(req, res) => {
  res.send('hello world');
})
*/

app.listen(port, function(){
    console.log(`all-user-service-v1 listening on port ${port}`);
})

//Get the tracing headers and return a headers object
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
