import { Link } from "react-router-dom";
const Modal = ({orderDone,signupDone,onClose})=> {
    return(
        <div>
            {
                orderDone === true && 
                <div id="thankId" className="thankCls">
                    <div className="thankCont">
                    <div id="check" className="fas fa-check">
                    </div>
                    <div className="thank2">
                        <h3>Thank you!</h3>
                        <p>Your order has been placed</p>
                    </div>
                    <button onClick={onClose} className="btn" id="btn1"> close</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link exact to="/account"><button className="btn" id="btn2">view order</button></Link>
                    </div>
                </div>
            }
            {
                signupDone === true && 
                <div id="thankId" className="thankCls">
                    <div className="thankCont">
                        <span onClick={onClose} class="bye">&times;</span>
                            <div id="check" className="fas fa-check">
                        </div>
                        <div className="thank2">
                            <h3 style={{fontSize:23,marginTop:15}}>thank you for signing up!</h3>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Modal;