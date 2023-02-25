import BorrowerCard from "./BorrowerCard";
import { useEffect, useState } from "react";
import axios from "axios";
const Borrower = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    const func = async () => {
      const b = await axios.get("http://localhost:5000/loan/borrowerHistory", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      // console.log(b.data.data)
      // console.log(b.data.data[0].principalamount.$numberDecimal)
      setBorrowings(b.data.data);
    };
    func()
  }, []);
  return (
    <div style={{ marginTop: "3.5rem" }}>
      {borrowings.length===0?<div style={{display:"flex",justifyContent:"center"}}><p style={{fontWeight:"bold",fontSize:"40px"}}>No borrowings</p></div>:
      
      
      borrowings.map((l) => (
        <BorrowerCard data={l} setForceUpdate={setForceUpdate} />
      ))}
    </div>
  );
};
export default Borrower;
