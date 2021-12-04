var sequelize = require('./db_connection');
var DataTypes = require('sequelize').DataTypes;
var model = {};

model.users = sequelize.define('users',{
    name:{
        type:sequelize.Sequelize.STRING
    },
    mobile:{
        type:sequelize.Sequelize.STRING
    },
    email:{
        type:sequelize.Sequelize.STRING
    },
    password:{
         type:sequelize.Sequelize.STRING
    },
    address:{
        type:sequelize.Sequelize.STRING
    }
},{
    freezeTableName:true
});

model.checkouts = sequelize.define('checkouts',{
    user:{
        type:sequelize.Sequelize.STRING
    },
    createId:{
        type:sequelize.Sequelize.STRING
    },
    paymentId:{
        type:sequelize.Sequelize.STRING
    },
    orderId:{
         type:sequelize.Sequelize.STRING
    },
    signature:{
        type:sequelize.Sequelize.STRING
    }
},{
    freezeTableName:true
});


module.exports = model;