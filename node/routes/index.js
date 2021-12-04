var express = require('express');
var router = express.Router();
var insCtrl = require('../service');

/**
*----------------------------------------------------------------------------------------
*									USER - INITIALIZED ROUTE
*----------------------------------------------------------------------------------------
**/  

router.route('/create-user').post(insCtrl.doSignup);
router.route('/made-login').post(insCtrl.doLogin);
router.route('/made-checkout').post(insCtrl.makeCheckout);
router.route('/get-myorder').post(insCtrl.getMyOrders);


/**
*----------------------------------------------------------------------------------------
*									REZORPAY - INITIALIZED ROUTE
*----------------------------------------------------------------------------------------
**/  

router.route('/create-instance').post(insCtrl.createInstance);
router.route('/get-payment').post(insCtrl.getPaymentDetails);
router.route('/get-orderby-id').post(insCtrl.getOrderDetailsById);

module.exports = router;
