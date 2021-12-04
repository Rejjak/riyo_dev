import React,{useEffect,useState} from "react";
import HttpService from '../../service/http/httpService';
import { Link } from "react-router-dom";
import Modal from '../modal/modal';

function Header({onChangeText}) {
    const [state, setstate] = useState(true);
    const [locations, setLocatiom] = useState('');
    const [signupModal,setSignupModal] = useState(false);
    const toggleBtn = () => { setstate(prevState => !prevState); }
    /* for password hide & show */

    const [fields, setFields] = useState({});
    const [fieldsLogin, setFieldsLogin] = useState({});
    const [errorsLogin, setErrorLogin] = useState({});
    const [errors, setError] = useState({});
    const [isLogin, setLogin] = useState(false);
    
    const handleChange = (e) => {
        let newFields = {...fields};
        let newErr = {};
        newFields[e.target.name] = e.target.value;
        setFields(newFields);

        if (!newFields["fullname"]) {
            newErr['fullname'] = true;
        }

        if (!newFields["email"]) {
            newErr['email'] = true;
        }

        if (typeof newFields["email"] != undefined) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(newFields["email"])) {
                newErr['email'] = true;
            }
        }

        if (!newFields["password"]) {
            newErr['password'] = true;
        }

        if (!newFields["mobile"]) {
            newErr['mobile'] = true;
        }

        if (!newFields["address"]) {
            newErr['address'] = true;
        }

        if (typeof newFields["mobile"] != undefined) {
            var zipPattern = new RegExp(/^[0-9]{10}$/);
            if (!zipPattern.test(newFields["mobile"])) {
                newErr['mobile'] = true;
            }
        }
        if (newFields["password"] != undefined) {
            if(newFields["password"].length < 5){
                newErr['password'] = true;
            }
        }

        if (newFields["address"] != undefined) {
            if(newFields["address"].length < 5){
                newErr['address'] = true;
            }
        }
        setError(newErr);
    }

    useEffect(()=>{
        let userData = localStorage.getItem('userData');
        setLocatiom(window.location.pathname);
        if(userData != null){
            console.log(userData);
            setLogin(true);
        }
    },[])

    const submitForm = (e) => {
        e.preventDefault();
        if(Object.keys(fields).length > 1 && Object.keys(errors).length == 0){
            let payload = {
                url : 'create-user',
                data : {
                    fullname : fields["fullname"],
                    email : fields["email"],
                    mobile : fields['mobile'],
                    password : fields['password'],
                    address : fields['address']
                }
            }
            HttpService.postHttpCall(payload).then((res)=>{
                console.log(res);
                if(res.status){
                    document.getElementById('sign-up').style.display = "none";
                    setLogin(true);
                    localStorage.setItem('userData',JSON.stringify(res));
                    setSignupModal(true);
                }else{
                    alert(res.message);
                }
            }).catch((err)=>{
                console.log(err);
                alert(err.message);
            });
        }else{
            handleChange(e);
        }
    }


    const handleLoginChange = (e) => {
        let newFields = {...fieldsLogin};
        let newErr = {};
        newFields[e.target.name] = e.target.value;
        setFieldsLogin(newFields);

        if (!newFields["login_email"]) {
            newErr['login_email'] = true;
        }

        if (typeof newFields["login_email"] != undefined) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(newFields["login_email"])) {
                newErr['login_email'] = true;
            }
        }
        if (!newFields["login_password"]) {
            newErr['login_password'] = true;
        }
        setErrorLogin(newErr);
    }

    const submitLoginForm = (e) => {
        e.preventDefault();
        if(Object.keys(fieldsLogin).length > 1 && Object.keys(errorsLogin).length == 0){
            let payload = {
                url : 'made-login',
                data : {
                    email : fieldsLogin["login_email"],
                    password : fieldsLogin['login_password']
                }
            }
            HttpService.postHttpCall(payload).then((res)=>{
                console.log(res);
                if(res.status){
                    setLogin(true);
                    alert('Login Success!!');
                    localStorage.setItem('userData',JSON.stringify(res));
                    let loginForm = document.querySelector('.login-form');
                    loginForm.classList.remove('active');
                }else{
                    alert(res.message);
                }
            }).catch((err)=>{
                console.log(err);
                alert(err.message);
            });
        }else{
            handleLoginChange(e);
        }
    }

    const doLogout = ()=> {
        localStorage.removeItem('userData');
    }

    return (
        <div>
            <header className="header">
                <a href="home.html" className="logo"> <i className="fas fa-shopping-basket" /> local market </a>
                <nav className="navbar">
                <Link exact to="/">Home</Link>
                <Link exact to="/about">About</Link>
                <Link exact to="/team">Team</Link>
                </nav>
                
                <div className="icons">
                    <div id="menu-btn" className="fas fa-bars" />
                    
                        <div id="search-btn" className="fas fa-search" />
                        {
                            !isLogin ? 
                            <div id="login-btn" className="fas fa-user" />:
                            locations == '/account' ?
                            <Link onClick={()=>doLogout()} exact to="/" className="signInLink"><div className="fas fa-sign-out-alt" /></Link>:
                            <Link exact to="/account" className="signInLink"><div className="fas fa-user" /></Link>
                        }
    
                </div>
                <form className="search-form">
                    <input onChange={onChangeText} type="search" placeholder="search here..." id="search-box" />
                    <label htmlFor="search-box" className="fas fa-search" />
                </form>
                <form className="login-form" method="post" onSubmit={(e)=>submitLoginForm(e)}>
                    <h3>login</h3>
                    <input name={'login_email'} type="email" placeholder="enter your email id" className={`box ${errorsLogin['login_email'] ? 'error' : null}`} onChange={handleLoginChange}/>
                    <input name={'login_password'} type="password" placeholder="enter your password" className={`box ${errorsLogin['login_password'] ? 'error' : null}`} onChange={handleLoginChange}/>
                    <button className="btn">Login now </button>
                    <p>don't have an account? <button style={{backgroundColor:'transparent'}} id="myBtn">creat one</button></p>
                </form>

                <section id="sign-up" className="signup">
                    <form method="post" onSubmit={(e)=>submitForm(e)}>
                        <h3>signup now</h3>
                        <span className="close">&times;</span>
                        <input name={'fullname'} type="text" placeholder="Full name" className={`box ${errors['fullname'] ? 'error' : null}`} onChange={handleChange}/>
                        <input name={'mobile'} type="text" placeholder="Mobile" className={`box ${errors['mobile'] ? 'error' : null}`} onChange={handleChange}/>
                        <input name={'email'} type="email" placeholder="Email" className={`box ${errors['email'] ? 'error' : null}`} onChange={handleChange}/>
                        <input name={'address'} type="text" placeholder="Address" className={`box ${errors['address'] ? 'error' : null}`} onChange={handleChange}/>
                        <input name={'password'} type="password" placeholder="Create password" className={`box ${errors['password'] ? 'error' : null}`} onChange={handleChange}/>
                        <button className="btn"> signup now </button>
                        <p>already have an account?</p>
                        <a onClick={()=>{
                            document.getElementById('sign-up').style.display = "none";
                            document.getElementById('login-btn').click();
                        }} className="btn-login">login now</a>
                    </form>
                </section>
            </header>
            <Modal onClose={()=>setSignupModal(false)} signupDone={signupModal}/>
        </div>
    );
}


export default Header;