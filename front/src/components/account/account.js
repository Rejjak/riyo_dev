import React,{useEffect,useState} from "react";
import Header from '../header/header';
import { Link } from "react-router-dom";
import Footer from '../footer/footer';
import p_image from '../../images/product-1.png';
import products from '../../data/products';
import axios from "axios";
import loadScript from '../../loadeScript';
import HttpService from '../../service/http/httpService';

const MyProfile = ()=> {
    const [orders,setOrder] = useState({});
    const [user,setUser] = useState({});
    const [isLoader,setLoader] = useState(true);
    
    useEffect(()=>{
        getOrderDetails();
    },[])

    const getOrderDetails = ()=> {
        let userData = localStorage.getItem('userData');
        if(userData != null){
            setLoader(true);
            let userDetails = JSON.parse(userData);
            setUser(userDetails)
            let payload = {
                url : 'get-myorder',
                data : {
                    user_id : userDetails.user_id
                }
            }
            HttpService.postHttpCall(payload).then((res)=>{
                console.log(res);
                setLoader(false);
                setOrder(res.data);
            }).catch((err)=>{
                setLoader(false);
                console.log(err);
            })
        }else{
            window.location.href = '/';
        }
    }

    const formatDate = (str)=> {
        var theDate = new Date(str * 1000);
        var dateString = theDate.toGMTString();
        let date = new Date(dateString);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        //const time = new Date(str).toLocaleTimeString('en',{ timeStyle: 'short', hour12: true, timeZone: 'UTC' });
        return dt+'-' + month + '-'+year;
    }

    return (
        <div>
            <Header/>
            <div className="heading">
            <h1>my Orders</h1>
            <p style={{textTransform:'lowercase'}}> {user.email} </p>
            </div>
            {/* --- order details */}
            <section className="profile" id="profile">
                {
                    Object.keys(orders).length > 0 ? 
                    orders.paymentDetails.map((ele,i)=>
                        <div style={{marginTop:i> 0 ? 12:0}} className="box-container">
                            <div className="box">
                            <h3>Order details</h3>
                            <span>order id : {ele.order_id} </span><br/>
                            <span>Product name : {ele.description} </span>
                            <br /><br />
                            <h3>Payment details</h3>
                            <span>Payment id : {ele.paymentId} </span>
                            <br />
                            <span>Payment method : {ele.method}</span>
                            <br /><br />
                            <p>date : {formatDate(ele.created_at)}</p>
                            </div>
                        </div>
                    ):
                    !isLoader &&
                    <div className="box" style={{textAlign:'center'}}>
                        <p style={{fontSize:15}}>Seems like you are not order yet</p>
                        <Link exact to="/">
                            <button className="btn">order now</button>
                        </Link>
                    </div>
                }
            </section>
            <Footer/>
      </div>
    )
}

export default MyProfile;