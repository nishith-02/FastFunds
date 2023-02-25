import { useState, useEffect } from "react";
import axios from "axios";
import PendingCard from "./PendingCard";
const PendingHistory = () => {
  const [pendings, setPendings] = useState([]);

  useEffect(() => {
    const func = async () => {
      const p = await axios.get("http://localhost:5000/loan/pendingRequests", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      console.log(p.data.data);
      setPendings(p.data.data);
    };
    func();
  }, []);
  return (
    <div style={{ marginTop: "3.5rem" }}>
      {pendings.length===0?<div style={{display:"flex",justifyContent:"center"}}><p style={{fontWeight:"bold",fontSize:"40px"}}>No pending requests</p></div>:
      pendings.map((p) => (
        <PendingCard data={p} pendings={pendings} setPendings={setPendings}/>
      ))}
    </div>
  );
};
export default PendingHistory;
