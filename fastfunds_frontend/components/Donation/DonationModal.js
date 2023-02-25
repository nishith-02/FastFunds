import styles from "../../styles/History/RepayModal.module.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { useRouter } from "next/router";
import "react-responsive-modal/styles.css";
import axios from "axios";
import useRazorpay from "react-razorpay";
export default function DonationModal(props) {
  const Razorpay = useRazorpay();
  const router = useRouter();
  const [breakDown, setBreakDown] = useState(false);
  const [interest, setInterest] = useState();
  const [principal, setPrincipal] = useState();
  const [amountToBePaid, setAmountToBePaid] = useState("");
  const payment = async (id) => {
    const url = "http://localhost:5000/donationpayment";
    const response = await axios.post(
      url,
      {
        id,
        amount: amountToBePaid,
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }
    );
    const data = response.data.data;
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      name: "Fast Funds",
      description: "Some Description",
      order_id: data.payment_id,
      handler: (response) => {
        alert("Payment Done Successfully");
        router.push("/viewdonations");
        props.onCloseModal();
        props.setForceUpdate(true);
        // props.setAmountToBePaid(
        //   parseInt(props.amountToBePaid) - parseInt(amount)
        // );
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <Modal
      open={props.open}
      onClose={props.onCloseModal}
      center
      showCloseIcon={false}
      classNames={{ modal: styles.modal }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: breakDown === true ? "3rem" : "6rem",
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Amount"
            className={styles.input}
            onChange={(e) => setAmountToBePaid(e.target.value)}
            value={amountToBePaid}
          />
        </div>
        {breakDown === true ? (
          <div style={{ color: "white", marginTop: "1rem" }}>
            <p>Principal Amount:{principal}</p>
            <p>Interest Amount:{interest}</p>
          </div>
        ) : (
          ""
        )}
        <div style={{ marginTop: "1rem" }}>
          <button
            className={styles.button}
            onClick={() => payment(props.donationid)}
          >
            Pay
          </button>
        </div>
      </div>
    </Modal>
  );
}
