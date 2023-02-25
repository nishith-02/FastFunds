import {useState,useEffect} from "react"
import axios from "axios"
import BorrowerModal from "./BorrowerModal"
export default function BorrowerCard(props){
    const[name,setName]=useState("")
    const[phoneNumber,setPhoneNumber]=useState("")
    const[interestRate,setInterestRate]=useState("")
    const[months,setMonths]=useState("")
    const[amount,setAmount]=useState("")
    const[email,setEmail]=useState("")
    const[open,setOpen]=useState(false)
    useEffect(()=>{
        setName(props?.data?.name)
        setPhoneNumber(props?.data?.phoneNumber)
        setMonths(props?.data?.months)
        setAmount(props?.data.amount?.$numberDecimal)
        setInterestRate(props?.data?.intrestrate?.$numberDecimal)
        setEmail(props?.data?.email)
    },[])
    const onOpenModal=()=>{
        setOpen(true)
    }
    const onCloseModal=()=>{
        setOpen(false)
    }
    const clickHandler=async()=>{
        // if(download===true){
            const res=await axios.post("http://localhost:5000/createagreement",{
                id:props?.data?._id,
                amount:props?.a,
                intrestrate:interestRate,
                months:months
            },{
                headers:{
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                      }`,
                }
            })
            
            if (typeof window !== "undefined") {
                window.open("http://localhost:5000/agreement.pdf");
              }
        // }
        // else if(download===false){

        // }
        // setDownload((d)=>!d)
    }
    return(
        <div style={{display:"flex",justifyContent:"center",marginBottom:"2rem"}}>
        <div style={{display:"flex",justifyContent:'space-evenly',alignItems:"center",backgroundColor:"#222222",width:"75%",paddingTop:"1rem",borderRadius:"0.2rem",color:"white"}}>
            <div>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Lender Name: {name}</p>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Mobile No: {phoneNumber}</p>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Email: {email}</p>
            </div>
            <div>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Amount: {amount}</p>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Interest Rate: {interestRate}</p>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Months: {months}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",marginTop:"-1rem"}}>
                <input type="button" style={{marginBottom:"1rem",backgroundColor:"#366FD1",color:"white",fontWeight:"bold",border:"none",width:"12rem",height:"2.5rem",borderRadius:"0.5rem"}} onClick={clickHandler} value={"Download Agreement"}/>
                <button style={{backgroundColor:"#366FD1",color:"white",fontWeight:"bold",border:"none",width:"12rem",height:"2.5rem",borderRadius:"0.5rem"}} onClick={onOpenModal}>Request</button>
            </div>
        </div>
        <BorrowerModal open={open} onCloseModal={onCloseModal} id={props?.data?._id} amount={props?.a} interestRate={interestRate} months={months}/>
        </div>
    )
}