import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/Donation/Adddonation.module.css";
const Adddonation = () => {
  const [donorname, setdonorname] = useState("");
  const [amountrequired, setamountrequired] = useState("");
  const [reason, setreason] = useState("");
  const [error, seterror] = useState("");
  const [document, setdocument] = useState("");
  const [msg, setmsg] = useState("");
  const [doc, setdoc] = useState("");
  const submit = async () => {
    try {
      setmsg("");
      seterror("");
      const res = await axios.post(
        "http://localhost:5000/adddonation",
        {
          donorname: donorname,
          amount: amountrequired,
          reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      console.log(res);
      const formData_file = new FormData();
      console.log(document);
      formData_file.append("donationdoc", document);
      formData_file.set("id", res.data.donation._id);
      const data = await axios.post(
        "http://localhost:5000/uploaddonationdoc",
        formData_file,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      console.log(data);
      setmsg("Data succesfully added✔️");
    } catch (error) {
      seterror(error.message);
    }
  };
  const uploadDocument = async (e) => {
    console.log(e.target.files[0]);
    setdocument(e.target.files[0]);
    setdoc(e.target.files[0].name);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "8%" }}>
      <div>
        <div>
          <div
            style={{
              display: "flex",
              width: "50rem",
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
          <div className={styles.form}>
            <div className={styles.input}>
              <h3 className={styles.key}>Name:</h3>
              <input
                type="text"
                defaultValue={donorname}
                onChange={(e) => setdonorname(e.target.value)}
                placeholder="Enter the name"
                className={styles.inputbox}
              />
            </div>
            <div className={styles.input}>
              <h3 className={styles.key}>Amount:</h3>
              <input
                type="text"
                defaultValue={amountrequired}
                onChange={(e) => setamountrequired(e.target.value)}
                placeholder="Amount Needed"
                className={styles.inputbox}
              />
            </div>
            <div className={styles.reasonarea}>
              <h3 className={styles.key}>Reason for Donation:</h3>
              <br />
              <textarea
                className={styles.area}
                value={reason}
                onChange={(e) => setreason(e.target.value)}
                placeholder="Give Your Description"
              ></textarea>
            </div>
            <div className={styles.input}>
              <div>
                <label for="document" className={styles.filelabel}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  <strong style={{ marginLeft: "1rem" }}>
                    Upload Proofs Needed
                  </strong>
                </label>
                <input
                  type="file"
                  id="document"
                  name="myfile"
                  className={!doc && styles.file}
                  onChange={(e) => uploadDocument(e)}
                />
              </div>
            </div>
            <div className={styles.btndiv}>
              <button onClick={submit} className={styles.btn}>
                Submit
              </button>
              <br />
            </div>
            {error && <div>{error}</div>}
            {msg && <div style={{ color: "#fff" }}>{msg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Adddonation;

// <div className={styles.donation__main}>
// <input
//   type="text"
//   defaultValue={donorname}
//   onChange={(e) => setdonorname(e.target.value)}
//   placeholder="Enter the name:"
// />
// <input
//   type="Number"
//   defaultValue={amountrequired}
//   onChange={(e) => setamountrequired(e.target.value)}
//   placeholder="Enter the amount required:"
// />
// <input type="file" onChange={(e) => uploadDocument(e)} />
// <textarea
//   value={reason}
//   onChange={(e) => setreason(e.target.value)}
// ></textarea>
//       <button onClick={submit}>Submit</button>
// {error && <div>{error}</div>}
// {msg && <div>{msg}</div>}
//     </div>
