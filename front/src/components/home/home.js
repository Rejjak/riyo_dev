import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Header from '../header/header';
import Footer from '../footer/footer';
import Modal from '../modal/modal';
import p_image from '../../images/product-1.png';
import products from '../../data/products';
import othersPrd from '../../data/othersProduct';
import axios from "axios";
import loadScript from '../../loadeScript';
import HttpService from '../../service/http/httpService';
import Home1 from '../../images/home-img.png';
import Home2 from '../../images/home-img2.jpg';
import Home3 from '../../images/home-img3.png';

let index = 0;
let slides = null;

function Home(){
    const [orderModal,setOrderModal] = useState(false);
    useEffect(()=>{
        slides = document.querySelectorAll('.home .slides-container .slide');
    },[])

    function next(){
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }

    function prev(){
        slides[index].classList.remove('active');
        index = (index - 1 + slides.length) % slides.length;
        slides[index].classList.add('active');
    }

    async function buyNow(a,pname,img){
        let userData = localStorage.getItem('userData');
        if(userData != null){
            let userDetails = JSON.parse(userData);
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
            // creating a new order
            const result = await axios.post("http://localhost:5000/create-instance",JSON.stringify({amount:a}),{headers:{'Content-Type': 'application/json'}});
            console.log(result)
            if (!result) {
                alert("Server error. Are you online?");
                return;
            }
            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: "rzp_test_Wk1tUKFFAA7189",
                amount: amount.toString(),
                currency: currency,
                name: pname,
                description: pname,
                image: img,
                order_id: order_id,
                handler: async function (response) {
                    console.log(response);
                    if(response.razorpay_payment_id != undefined && response.razorpay_payment_id != null){
                        let payload = {
                            url : 'made-checkout',
                            data : {
                                create_id: order_id,
                                payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                signature: response.razorpay_signature,
                                user_id:userDetails.user_id
                            }
                        }
                        HttpService.postHttpCall(payload).then((res)=>{
                            if(res.status){
                                setOrderModal(true);
                            }else{
                                alert(res.message);
                            }
                        }).catch((err)=>{
                            alert(err.message);
                        });
                    }
                },
                prefill: {
                    name: userDetails.name,
                    email: userDetails.email,
                    contact: userDetails.mobile,
                },
                notes: {
                    address: userDetails.address,
                    prd_dsc : pname
                },
                theme: {
                    color: "#27ae60",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }else{
            document.getElementById('login-btn').click();
            alert('Please login first!');
        }
    }

    return(
        <div>
            <Header/>
            <Modal onClose={()=>setOrderModal(false)} orderDone={orderModal}/>
            <section className="home">
                {/* slider  */}
                <div className="slides-container">
                <div className="slide active">
                    <div className="content">
                    <span>fresh and organic</span>
                    <h3>your daily need products</h3>
                    <a href="#" className="btn">buy now</a>
                    </div>
                    <div className="image">
                    <img src={Home1} alt="" />
                    </div>
                </div>
                <div className="slide">
                    <div className="content">
                    <span>fresh and organic</span>
                    <h3>upto 50% off</h3>
                    <a id="buy-now" href="#" className="btn">buy now</a>
                    </div>
                    <div className="image">
                    <img src={Home2} alt="" />
                    </div>
                </div>
                <div className="slide">
                    <div className="content">
                    <span>fresh and organic</span>
                    <h3>upto 37% off</h3>
                    <a href="#" className="btn">buy now</a>
                    </div>
                    <div className="image">
                    <img src={Home3} alt="" />
                    </div>
                </div>
                </div>
                <div id="next-slide" className="fas fa-angle-right" onClick={()=>prev()} />
                <div id="prev-slide" className="fas fa-angle-left" onClick={()=>next()} />
            </section>
            <section className="product" id="product">
            <h1 className="topHeading"> top <span>products</span></h1>
            <div className="box-container">
                {
                    products.map((ele,i)=>
                    <div key={i} className="box">
                        <span className="discount">-{ele.discount}</span>
                        <div className="icons">
                        <a href="#" className="fas fa-heart" />
                        <a href="#" className="fas fa-share" />
                        </div>
                        <img src={ele.image} alt="" />
                        <h3>{ele.product_name}</h3>
                        <div className="stars">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        </div>
                        <div className="price">₹{ele.selling_price} <span>₹{ele.strikethrough} </span> </div>
                        <div className="quantity">
                        <span>quantity : </span>
                        <input type="number" min={1} max={1000} defaultValue={1} />
                        <span> /{ele.unit} </span>
                        </div>
                        <center>
                            <button onClick={()=>buyNow(ele.selling_price,ele.product_name,ele.image)} className="btn">buy now</button>
                        </center>
                    </div>
                    )
                }
            </div>
            <br /><br /><br />
            <h1 className="topHeading"> others <span>products</span></h1>
            <div className="box-container">
                {
                    othersPrd.map((ele,i)=>
                    <div key={i} className="box">
                        <span className="discount">-{ele.discount}</span>
                        <div className="icons">
                        <a href="#" className="fas fa-heart" />
                        <a href="#" className="fas fa-share" />
                        </div>
                        <img src={ele.image} alt="" />
                        <h3>{ele.product_name}</h3>
                        <div className="stars">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        </div>
                        <div className="price">₹{ele.selling_price} <span>₹{ele.strikethrough} </span> </div>
                        <div className="quantity">
                        <span>quantity : </span>
                        <input type="number" min={1} max={1000} defaultValue={1} />
                        <span> /{ele.unit} </span>
                        </div>
                        <center>
                            <button onClick={()=>buyNow(ele.selling_price,ele.product_name,ele.image)} className="btn">buy now</button>
                        </center>
                    </div>
                    )
                }
            </div>
            
        </section>
        <Footer/>
      </div>
    )
}

export default Home;