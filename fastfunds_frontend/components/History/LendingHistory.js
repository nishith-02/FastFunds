import LenderCard from "./LenderCard";
import axios from "axios";
import { useState, useEffect } from "react";
const Lending = () => {
  const [lendings, setLendings] = useState([]);
  useEffect(() => {
    const func = async () => {
      const l = await axios.get("http://localhost:5000/loan/lenderHistory", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      console.log(l.data.data);
      setLendings(l.data.data);
    };
    func();
  }, []);
  return (
    <div style={{ marginTop: "3.5rem" }}>
      {lendings.length===0?<div style={{display:"flex",justifyContent:"center"}}><p style={{fontWeight:"bold",fontSize:"40px"}}>No Lendings</p></div>:
      lendings.map((b) => (
        <LenderCard data={b} />
      ))}
    </div>
  );
};
export default Lending;
