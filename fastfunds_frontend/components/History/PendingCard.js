import { useState, useEffect } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/router";
const PendingCard = (props) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("7893756391");
  const [amount, setAmount] = useState("");
  const [document, setDocument] = useState("");
  const [bankStatements, setBankStatements] = useState([]);
  const [open, setOpen] = useState(false);

  const Razorpay = useRazorpay();
  const router = useRouter();

  useEffect(() => {
    console.log(props.data);
    setName(props?.data?.borrowerData?._doc?.name);
    setPhoneNumber(props?.data?.borrowerData?._doc?.phoneNumber);
    setDocument(props?.data?.borrowerData?._doc?.document);
    setBankStatements(props?.data?.borrowerData?._doc?.bankStatements);
    setAmount(props?.data?.loanData?._doc?.amount?.$numberDecimal);
  }, []);
  const documentClick = () => {
    if (typeof window !== "undefined") {
      window.open("http://localhost:5000/documents/" + document);
    }
  };
  const bankStatementOpen = (index) => {
    if (typeof window !== "undefined") {
      window.open(
        "http://localhost:5000/bankstatements/" + bankStatements[index]
      );
    }
  };
  const rejectHandler = async () => {
    const url = "http://localhost:5000/loan/deleteRequest";
    const response = await axios.post(
      url,
      {
        id: props?.data?.loanData?._doc?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }
    );
    console.log(response);
    let pendings = props.pendings;
    pendings = pendings.filter(
      (p) => p.loanData._doc._id !== props?.data?.loanData?._doc?._id
    );
    props.setPendings(pendings);
  };

  const payment = async () => {
    try {
      console.log(props.data);
      const r = await axios.patch(
        "http://localhost:5000/loan/acceptRequest",
        {
          requestId: props.data?.loanData?._doc?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      console.log("got till here");
      console.log(props.id);
      const func = async () => {
        console.log("uffff");
        const response = await axios.post(
          "http://localhost:5000/payment",
          {
            id: props.data?.loanData?._doc?._id,
            amount: parseInt(amount),
          },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        );
        console.log("hell yes");
        const data = response.data.data;
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          name: "Fast Funds",
          description: "Some Description",
          order_id: data.payment_id,
          handler: (response) => {
            alert("Payment Done Successfully");
            router.push("/pendingrequest");
            // props.onCloseModal();
            let pendings = props.pendings;
            pendings = pendings.filter((p) => p.loanData._doc._id !== props?.data?.loanData?._doc?._id);
            props.setPendings(pendings);
            // props.setForceUpdate(true)
            // props.setAmountToBePaid(parseInt(props.amountToBePaid)-parseInt(amount))
          },
        };
        const rzp1 = new Razorpay(options);
        await rzp1.open();
      };
      func();
    } catch (error) {
      console.log(error);
    }
  };
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
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
          backgroundColor: "#E2E2E2",
          width: "73%",
          paddingTop: "1rem",
          borderRadius: "0.2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Borrower Name: {name}
            </p>
            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Mobile No: {phoneNumber}
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Amount Requested: {amount}
            </p>
            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Document Proof:
              <span
                style={{ cursor: "pointer", color: "#366FD1" }}
                onClick={documentClick}
              >
                {document.slice(0, 9) + "..."}
              </span>
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              style={{
                backgroundColor: "#366FD1",
                color: "white",
                fontWeight: "bold",
                border: "none",
                width: "6rem",
                height: "2rem",
                borderRadius: "0.5rem",
              }}
              onClick={payment}
            >
              Accept
            </button>
            <button
              style={{
                marginBottom: "1rem",
                marginTop: "1rem",
                backgroundColor: "#D13F36",
                color: "white",
                fontWeight: "bold",
                border: "none",
                width: "6rem",
                height: "2rem",
                borderRadius: "0.5rem",
              }}
              onClick={rejectHandler}
            >
              Reject
            </button>
          </div>
        </div>
        <div>
          <p
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
              marginLeft: "5.1rem",
            }}
          >
            Past Three Months Bank Statements:
            {bankStatements.map((b, index) => (
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#366FD1",
                }}
                onClick={() => bankStatementOpen(index)}
              >
                {index === bankStatements.length - 1
                  ? b.slice(0, 10) + "..."
                  : b.slice(0, 10) + "...,"}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PendingCard;
