import { useState } from "react"
import axios from "axios"
import BorrowerCard from "./BorrowerCard"
export default function InputBoxes(){
    const [amount,setAmount]=useState("")
    const [interestRate,setInterestRate]=useState("")
    const[data,setData]=useState([])
    const submitHandler=async()=>{
        let a=parseInt(amount)
        let i=parseInt(interestRate)
        const res=await axios.get(`http://localhost:5000/getlenders/${a}/${i}`,{
            headers:{
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
            }
        })
        setData(res.data.lenders)
        console.log(data)
    }
    return(
        <div style={{marginTop:"8%"}}>
            <div style={{display:"flex"}}>
                <p style={{marginLeft:"15vw",color:"#3b352b",fontWeight:"bold",fontSize:"24px"}}>Amount Needed:</p>
                <p style={{marginLeft:"17vw",color:"#3b352b",fontWeight:"bold",fontSize:"24px"}}>Interest Rate:</p>
            </div>
            <div style={{display:"flex"}}>
                <input type="text" placeholder="Enter the amount needed" onChange={(e)=>setAmount(e.target.value)} style={{backgroundColor:"#E2E2E2",color:"black",border:"none",width:"16rem",height:"3rem",paddingLeft:"1rem",marginLeft:"15vw",marginRight:"2vw"}}/>
                <input type="text" placeholder="Enter the interest rate" onChange={(e)=>setInterestRate(e.target.value)} style={{backgroundColor:"#E2E2E2",color:"black",border:"none",width:"16rem",height:"3rem",paddingLeft:"1rem",marginLeft:"10.1vw",marginRight:"2vw"}}/>
                <button onClick={submitHandler} style={{border:"none",backgroundColor:"#366FD1",color:"white",width:"9rem",borderRadius:"0.5rem",height:"2.5rem",marginTop:"0.25rem",marginLeft:"7vw"}}>Submit</button>
            </div>
            <div style={{marginTop:"2rem"}}>
                {data.map((d)=>
                    <BorrowerCard data={d} a={amount}/>
                )}
            </div>
        </div>
    )
}