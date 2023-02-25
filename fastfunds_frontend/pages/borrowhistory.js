import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "../components/Home/Navbar";
import Borrower from "../components/History/BorrowerHistory"
import ThreeTabs from "../components/History/ThreeTabs";
import {useRouter} from "next/router";
export default function BorrowHistory(){
    const router=useRouter()
    useEffect(()=>{
        let user=localStorage.getItem("user")
        if(user===undefined || user===null){
            router.push("/")
        }
    },[])
    return(
        <div>
            <NavigationBar/>
            <ThreeTabs/>
            <Borrower/>
        </div>
    )
}