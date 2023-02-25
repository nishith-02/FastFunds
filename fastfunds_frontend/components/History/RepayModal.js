import styles from "../../styles/History/RepayModal.module.css";
import { Modal } from "react-responsive-modal";
import { useState} from "react";
import { useRouter } from "next/router";
import "react-responsive-modal/styles.css";
import axios from "axios";
import useRazorpay from "react-razorpay";
export default function RepayModal(props){
    const Razorpay = useRazorpay();
    const router=useRouter()
    const [breakDown,setBreakDown]=useState(false)
    const [amount,setAmount]=useState("")
    const[interest,setInterest]=useState()
    const[principal,setPrincipal]=useState()
    const showBreakDown=async()=>{
        console.log(props.requestId,amount)
        const breakDownData=await axios.post("http://localhost:5000/loan/amountbreakdown",{
            requestId:props.requestId,
            amount:amount
        },{
            headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("user")).token
                }`,
              }
        })
        console.log(breakDownData.data)
        setInterest(breakDownData.data.interest_paying)
        setPrincipal(breakDownData.data.amount_paying)
        setBreakDown(true)
    }
    const paymentHandler=async()=>{
        const repayData=await axios.post("http://localhost:5000/loan/repay",{
            requestId:props.requestId,
            amount:amount
        },{
            headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("user")).token
                }`,
              }
        })
        console.log(repayData)
        const url="http://localhost:5000/payment"
        const response=await axios.post(url,{
            id:repayData.data.data._id,
            amount:amount
        },{
            headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("user")).token
                }`,
              }
        })
        const data = response.data.data;
        const options={
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            name: "Fast Funds",
            description: "Some Description",
            order_id: data.payment_id,
            handler:(response)=>{
                alert("Payment Done Successfully")
                router.push("/borrowhistory")
                props.onCloseModal()
                props.setForceUpdate(true)
                props.setAmountToBePaid(parseInt(props.amountToBePaid)-parseInt(amount))
            }
        }
        const rzp1=new Razorpay(options)
        rzp1.open()
    }
    return(
        <Modal open={props.open} onClose={props.onCloseModal} center showCloseIcon={false} classNames={{modal:styles.modal}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:breakDown===true?"3rem":"6rem"}}>
            <div>
                <input type="text" placeholder="Amount" className={styles.input} onChange={(e)=>setAmount(e.target.value)} value={amount}/>
            </div>
            {breakDown===true?(
                <div style={{color:"white",marginTop:"1rem"}}>
                    <p>Principal Amount:{principal}</p>
                    <p>Interest Amount:{interest}</p>
                </div>
            ):""}
            <div style={{marginTop:"1rem"}}>
                <button className={styles.button} style={{marginRight:"1rem"}} onClick={showBreakDown}>View BreakDown</button>
                <button className={styles.button} onClick={paymentHandler}>Pay</button>
            </div>
            </div>
        </Modal>
    )
}