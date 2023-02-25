import { useState, useEffect } from "react";
import DonationModal from "./DonationModal";

const DonationCard = (props) => {
  const [name, setName] = useState("Vinjam Nithin");
  const [document, setdocument] = useState("50,000");
  const [reason, setreason] = useState("12%");
  const [totalAmount, setTotalAmount] = useState("55,000");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(props);
    setName(props?.data?.donorname);
    setdocument(props?.data?.documentOfProof);
    setreason(props?.data?.reason);
    setTotalAmount(props?.data.amount);
  }, []);
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const openDocument = (documentOfProof) => {
    try {
      console.log(documentOfProof);
      if (typeof window !== "undefined") {
        window.open("http://localhost:5000/donation_docs/" + documentOfProof);
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#E2E2E2",
          padding: "1rem",
          borderRadius: "0.2rem",
          width:"65vw"
        }}
      >
        <div style={{ width: "40%" }}>
          <p
            style={{
              fontFamily: "sans-serif",
              // fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <strong>Name</strong>: {name}
          </p>
          <p
            style={{
              fontFamily: "sans-serif",
              // fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <strong>Reason:</strong> {reason}
          </p>
        </div>
        <div style={{ width: "40%" }}>
          <p
            style={{
              fontFamily: "sans-serif",
              // fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <strong>Amount</strong>: {totalAmount}
          </p>
          <p
            style={{
              fontFamily: "sans-serif",
              // fontWeight: "bold",
              fontSize: "20px",
            }}
            onClick={() => openDocument(document)}
          >
            <strong>document of proof:</strong>{" "}
            <div style={{ color: "#366FD1", cursor: "pointer" }}>
              {document}
            </div>
          </p>
        </div>
        <div style={{ width: "30%" }}>
          <button
            style={{
              marginBottom: "3.9rem",
              backgroundColor: "#366FD1",
              color: "white",
              fontWeight: "bold",
              border: "none",
              width: "6rem",
              height: "2rem",
              borderRadius: "0.5rem",
              marginLeft: "6rem",
            }}
            onClick={onOpenModal}
          >
            Pay
          </button>
        </div>
      </div>
      <DonationModal
        setForceUpdate={props.setForceUpdate}
        open={open}
        onCloseModal={onCloseModal}
        requestId={props?.data?.requestId}
        donationid={props?.data?._id}
      />
    </div>
  );
};

export default DonationCard;
