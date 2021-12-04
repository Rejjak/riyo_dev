require("dotenv").config();
const Razorpay = require("razorpay");
var bcrypt = require('bcrypt');
var table = require('../config/schema').users;
var checkoutsTable = require('../config/schema').checkouts;
var userModel = require('../model/index');
var ctrl = {};

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});


/**
*----------------------------------------------------------------------------------------
*									    Razorpay API
*----------------------------------------------------------------------------------------
**/ 


ctrl.createInstance = async function(req,res){
    try {
        const options = {
            amount: parseInt(req.body.amount*100), // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_riyoteam864987",
        };

        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Something went wrong, please try again");
        return res.json(order);
    } catch (error) {
        return res.status(500).send(error);
    }
};

ctrl.getPaymentDetails = async function(req,res){
    try {

        const pid = await instance.payments.fetch(req.body.pid);
        const card = await instance.payments.fetchCardDetails(req.body.pid)
        if (!pid) return res.status(500).send("Something went wrong, please try again");
        return res.json({...pid,...card});
    } catch (error) {
        return res.status(500).send(error);
    }
};

ctrl.getOrderDetailsById = async function(req,res){
    try {
        const oid = await instance.orders.fetch(req.body.oid);
        if (!oid) return res.status(500).send("Something went wrong, please try again");
        return res.json(oid);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
*----------------------------------------------------------------------------------------
*									NODE API
*----------------------------------------------------------------------------------------
**/  

ctrl.doSignup = function(req,res){
    var has_password = bcrypt.hashSync(req.body.password,8);
    var param = {
        name: req.body.fullname,
        mobile: req.body.mobile,
        email: req.body.email,
        password: has_password,
        address : req.body.address
    };

    userModel.getSingleData(table,{email:param.email},function(found){
        if(!found.status){
            userModel.addData(table,param,function(response){
                if(response.status){
                    return res.send({
                        status:true,
                        user_id:response.data.id,
                        email:response.data.email,
                        mobile:response.data.mobile,
                        name:response.data.fullname,
                        address:response.data.address,
                        message:'Registration sucessfull'
                    });
                }else{
                    return res.send({
                        status:false,
                        message:'Something went wrong, please try again'
                    });
                }
            });
        }else{
            return res.send({
                status:false,
                message:'Email address already in use'
            });
        }
    });
}

ctrl.doLogin = function(req,res){
    var param = {
        email:req.body.email
    };

    userModel.getSingleData(table,param,function(response){
        if(response.status){
            bcrypt.compare(req.body.password,response.data.password,function(err,status){
                if(err){
                    return res.send({
                        status:false,
                        message:'Please provide your password'
                    });
                }else{
                    if(status){
                        return res.send({
                            status:true,
                            user_id:response.data.id,
                            name:response.data.name,
                            mobile:response.data.mobile,
                            email:response.data.email,
                            address:response.data.address,
                            message:'Success'
                        });
                    }else{
                        return res.send({
                            status:false,
                            message:'Invalid login details, please try again'
                        }); 
                    }
                }
            });
        }else{
            return res.send({
                status:false,
                message:'Invalid login details, please try again'
            });
        }
    });
};

ctrl.getMyOrders = function(req,res){
    var param = {
        user:req.body.user_id
    };

    userModel.getAllData(checkoutsTable,param,function(response){
        if(response.status){
            if(response.data.length>0){
                let newArr = []
                response.data.forEach(async(ele) => {
                    console.log(ele);
                    const pid = await instance.payments.fetch(ele.paymentId);
                    const card = await instance.payments.fetchCardDetails(ele.paymentId)
                    if (!pid) return res.status(500).send("Something went wrong, please try again");
                    let payment_id = {paymentId:ele.paymentId}
                    newArr.push({...pid,...card,...payment_id});
                    if(newArr.length == response.data.length){
                        return res.send(
                            {
                                status : true,
                                data : {
                                    orderDetails : response.data,
                                    paymentDetails : newArr
                                }
                            }
                        )
                    }
                });
            }else{
                return res.send(response);
            }
        }else{
            return res.send({
                status:false,
                message:'Invalid login details, please try again'
            });
        }
    });
}

ctrl.makeCheckout = function(req,res){
    var param = {
        createId: req.body.create_id,
        orderId: req.body.order_id,
        paymentId: req.body.payment_id,
        signature: req.body.signature,
        user : req.body.user_id
    };

    userModel.addData(checkoutsTable,param,function(response){
        if(response.status){
            return res.send({
                status:true,
                message:'Thank You'
            });
        }else{
            return res.send({
                status:false,
                message:'Something went wrong, please try again'
            });
        }
    });
}


module.exports = ctrl;
