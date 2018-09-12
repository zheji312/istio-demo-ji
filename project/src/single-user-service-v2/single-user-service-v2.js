//single user version 2: returns id, firstname, lastname, avatar
const port = 3001;

const express = require('express');
const app = express();
const request = require('request-promise-native');



// GET - /api/user/:id
// Desc: to get detail of a specific user
app.get('/api/user/:id', async(req, res) => {
  const input_url = "http://alluser";
  const custom_headers = getCustomHeadersConfig(req);

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

  const returned_user = getUserDetail(up.users, req.params.id);
  res.send(returned_user);

})

//Test Endpoint
app.get('/', async(req, res) => {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.send("hello world - singleuser-v2 service");

})

app.listen(port, function(){
    console.log(`single-user-service-v2 listening on port ${port}`);
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

// Find user detail by id
// v2 - first_name, last_name, avatar, service_name
function getUserDetail(users, id){
  let user;
  for(let u of users){
    if(u.id = id){
       user = {user: {id: u.id, first_name: u.first_name, last_name: u.last_name, avatar: u.avatar}, service:'single-user-service-v2'};
    }
  }
  return user;
}
