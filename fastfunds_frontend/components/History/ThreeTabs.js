import Link from "next/link"
const ThreeTabs=()=>{
    return (
        <div style={{marginTop:"8%",display:"flex"}}>
            <Link href="/borrowhistory" style={{textDecoration:"none"}}>
            <div style={{width:"18rem",height:"4rem",backgroundColor:"#E9B941",padding:"1rem",borderRadius:"0.2rem",display:"flex",justifyContent:"center",marginLeft:"13vw",marginRight:"2.4vw"}}>
                <h4 style={{color:"white",fontWeight:"bold"}}>Borrower History</h4>
            </div>
            </Link>
            <Link href="/lendhistory" style={{textDecoration:"none",marginRight:"2.4vw"}}>
            <div style={{width:"18rem",height:"4rem",backgroundColor:"#366FD1",padding:"1rem",borderRadius:"0.2rem",display:"flex",justifyContent:"center"}}>
                <h4 style={{color:"white",fontWeight:"bold"}}>Lending History</h4>
            </div>
            </Link>
            <Link href="/pendingrequest" style={{textDecoration:"none"}}>
            <div style={{width:"18rem",height:"4rem",backgroundColor:"black",padding:"1rem",borderRadius:"0.2rem",display:"flex",justifyContent:"center"}}>
                <h4 style={{color:"white",fontWeight:"bold"}}>Pending Request</h4>
            </div>
            </Link>
        </div>
    )
}
export default ThreeTabs