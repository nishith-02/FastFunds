import {useState,useEffect} from "react"
const LenderCard=(props)=>{
    const[name,setName]=useState("Vinjam Nithin")
    const[phoneNumber,setPhoneNumber]=useState("7893756391")
    const[monthsPending,setMonthsPending]=useState("1 Month")
    const[principalAmount,setPrincipalAmount]=useState("50,000")
    const[interestRate,setInterestRate]=useState("12%")
    const[totalAmount,setTotalAmount]=useState("55,000")
    const[amountToBePaid,setAmountToBePaid]=useState("55,000")
    const[document,setDocument]=useState("")
    const[interestAmount,setInterestAmount]=useState("1200")
    useEffect(()=>{
        setName(props?.data?.name)
        setPhoneNumber(props?.data?.phoneNumber)
        setMonthsPending(props?.data?.months_pending.toString()+" months")
        setPrincipalAmount(props?.data?.principalamount?.$numberDecimal)
        setInterestRate(props?.data?.interestrate?.$numberDecimal+"%")
        setTotalAmount(props?.data.total_amount?.$numberDecimal)
        setAmountToBePaid(props?.data.amount_pending?.$numberDecimal)
        setDocument(props?.data?.document)
        setInterestAmount(props?.data?.interest_amount)
    },[])
    const documentClick=()=>{
        if (typeof window !== "undefined") {
            window.open(
              "http://localhost:5000/documents/" +
              document);
          }
    }
    return(
        <div style={{display:"flex",justifyContent:"center",marginBottom:"2rem"}}>
        <div style={{display:"flex",justifyContent:'space-evenly',alignItems:"center",backgroundColor:"#E2E2E2",width:"73%",paddingTop:"1rem",borderRadius:"0.2rem"}}>
            <div>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Borrower Name: {name}</p>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Mobile No: {phoneNumber}</p>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Document Proof:<span style={{cursor:"pointer",color:"#366FD1"}} onClick={documentClick}>{document.slice(0,9)+"..."}</span></p>
            </div>
            <div>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Principal Amount: {principalAmount}</p>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Interest Amount: {interestAmount}</p>
                <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Total Amount: {totalAmount}</p>
            </div>
            <div >
            <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Months Pending: {monthsPending}</p>
            <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Interest Rate: {interestRate}</p>
            <p style={{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"20px"}}>Amount to be Paid: {amountToBePaid}</p>
            </div>
        </div>
        </div>
    )
}
export default LenderCard