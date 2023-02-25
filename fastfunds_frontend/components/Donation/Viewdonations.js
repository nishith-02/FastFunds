import { useState, useEffect } from "react";
import DonationModal from "./DonationModal";
import DonationCard from "./Donationcard";
import axios from "axios";
import Link from "next/Link";
const Viewdonations = () => {
  const [donations, setdonations] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/getalldonations",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      console.log(data);
      setdonations(data.donations);
    };
    getData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "8%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              width: "fit-content",
              display: "flex",
              marginBottom: "2rem",
            }}
          >
            <Link href="/addDonation" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "25rem",
                  height: "4rem",
                  backgroundColor: "#E9B941",
                  padding: "1rem",
                  borderRadius: "0.2rem",
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "2rem",
                }}
              >
                <h4 style={{ color: "white", fontWeight: "bold" }}>
                  Raise Donations
                </h4>
              </div>
            </Link>
            <Link href="viewdonations" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "25rem",
                  height: "4rem",
                  backgroundColor: "#366FD1",
                  padding: "1rem",
                  borderRadius: "0.2rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h4 style={{ color: "white", fontWeight: "bold" }}>
                  View Donation List
                </h4>
              </div>
            </Link>
          </div>
        </div>
        <div>
          {donations.map((item) => (
            <DonationCard data={item} setForceUpdate={setForceUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Viewdonations;

// <div>
//           <div>{item.donorname}</div>
//           <div>{item.amount}</div>
//           <div>{item.reason}</div>
//           {
//             <u onClick={() => openDocument(item.documentOfProof)}>
//               {item.documentOfProof}
//             </u>
//           }
//           <button>Pay</button>
//         </div>
