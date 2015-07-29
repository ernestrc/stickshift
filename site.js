var Stickshift = require('./src/index.js');
var access = require('./access-token.json');
 
Stickshift(
  document.getElementById('page'),
  {
    endpoint: 'http://localhost:3000/api/stickshift',
    branch: 'db',
    username: 'ernestrc',
    access_token: access.token,
    mapboxToken: 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ',
    repo: 'stickshift'
  });
