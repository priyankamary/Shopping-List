// require helper, User, List
var helper = require('../config/helpers.js');
var User = require('../users/userModel.js');
var List = require('./listModel.js');

module.exports = {
    addItem: function(req, res){
        var newListObj = req.body;

        console.log(newListObj)
        List.create(newListObj, function(err, list){
            console.log(err, list)
            if (err) { // notifies if error is thrown
                console.log("mongo create list err: ", err);
                helper.sendError(err, req, res);
            } else {
                res.json(list)
            }
        });
    },

    getItems: function(req, res){
        List.find({}, function(err, lists){
            res.json(lists)
        });
    },

    deleteItem: function(req, res){
        var itemID = req.params.id
        
        List.remove({'_id': itemID}, function(err, result){
            if(err) {
                console.log("mongo deleteItem error: ", err)
            } else {
                res.json(result)
            }
        });
    }
};
