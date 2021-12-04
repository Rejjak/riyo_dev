var Sequelize = require('sequelize');
var seq = new Sequelize('riyodev', 'root', '', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});
seq.authenticate().then(function(){
    console.log('Connection has been established successfully.');
}).catch(function(err){
    console.log(err);
});

module.exports = seq;
