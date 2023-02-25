import {useEffect, useState} from "react"
import NavigationBar from "../components/Home/Navbar"
import InputBoxes from "../components/borrowers/inputboxes";
// import ListOfBorrowers from "../components/borrowers/ListOfBorrowers";
import "bootstrap/dist/css/bootstrap.min.css";
import {useRouter} from "next/router";

export default function Borrow(){
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
        <InputBoxes/>
        {/* <ListOfBorrowers/> */}
    </div>
    )
}