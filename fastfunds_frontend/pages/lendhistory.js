import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "../components/Home/Navbar";
import Lending from "../components/History/LendingHistory"
import ThreeTabs from "../components/History/ThreeTabs";
import {useRouter} from "next/router";
export default function LendingHistory(){
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
            <Lending/>
        </div>
    )
}