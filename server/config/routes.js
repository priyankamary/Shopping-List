// require userHandler, listHandler
var userHandler = require('../users/userHandler.js');
var listHandler = require('../lists/listHandler.js');

// export function
module.exports = function(app, express){

  // 

  // POST - signin
  app.post('/api/signin', userHandler.signin);
  app.post('/api/signup', userHandler.signup);

  // POST - addItem
  app.post('/api/list', listHandler.addItem);
  // GET - getAllItems (users lists)
  app.get('/api/list', listHandler.getItems);

  // DELETE - deletes a single list item
  app.delete('/api/list/:id', listHandler.deleteItem);
  
  // Will probably need more routes over time

};
