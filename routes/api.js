module.exports = function(app) {
    var restController = require('../controllers/restaurantController');
  
    // restaurants Routes
    app.route('/api/restaurants')
      .get(restController.restuarant_list)
      .post(restController.add_restaurant);
  
    app.route('/api/restaurants/:restId')
      .get(restController.single_restaurant)
      .put(restController.update_restaurant)
      .delete(restController.delete_restaurant);
  };