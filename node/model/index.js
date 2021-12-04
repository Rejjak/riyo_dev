var userModel = {};

userModel.addData = function (table,param,next){
    table.sync({force:false}).then(function(){
        table.create(param).then(function(result){
            if(!result){
                next({status:false});
            }else{
                next({status:true,data:result});
            }
        }).catch(function(err){
            console.log(err);
            next({status:false});
        });
    });
};

userModel.getSingleData = function(table,param,next){
    table.findOne({where:param}).then(function(result){
        if(!result){
            next({status:false});
        }else{
            next({status:true,data:result});
        }
    }).catch(function(err){
        next({status:false});
    });
};

userModel.getAllData = function(table,param,next){
    table.findAll({where:param}).then(function(result){
        if(!result){
            next({status:false});
        }else{
            next({status:true,data:result});
        }
    }).catch(function(err){
        next({status:false});
    });
};

module.exports = userModel;