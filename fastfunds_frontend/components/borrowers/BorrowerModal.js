import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { useState} from "react";
import { useRouter } from "next/router";
export default function BorrowerModal(props){
    const router=useRouter()
    const[agreement,setAgreement]=useState("")
    const submitHandler=async()=>{
        const res=await axios.post("http://localhost:5000/loan/request",{
            lender_id:props.id,
            interestrate:props.interestRate,
            months:props.months,
            amount:props.amount
        },{
            headers:{
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`
            }
        })
        console.log(res)
        const formData=new FormData()
        formData.append("id",res.data.loan_created._id)
        formData.append("scanned_document",agreement)
        const fileUpload=await axios.post("http://localhost:5000/uploadscanneddoc",formData,{
            headers:{
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`
            }
        })
        console.log(fileUpload)
        props.onCloseModal()
        router.push("/")
    }
    return(
        <Modal open={props.open} onClose={props.onCloseModal} center showCloseIcon={false}>
                <input type="file" onChange={(e)=>setAgreement(e.target.files[0])}/>
                <button style={{backgroundColor:"#366FD1",color:"white",fontWeight:"bold",border:"none",width:"7rem",height:"2.5rem",borderRadius:"0.5rem"}} onClick={submitHandler}>Submit</button>
            
        </Modal>
    )
}