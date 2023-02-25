import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../styles/Profile.module.css";
export default function Profilepage(props) {
  const [name, setname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [accountno, setAccountNo] = useState("");
  const [ifsc, setifsc] = useState("");
  const [amount, setamount] = useState("");
  const [intrestrate, setintrestrate] = useState("");
  const [months, setmonths] = useState("");
  const [error, seterror] = useState("");
  const [idproof, setidproof] = useState("");
  const [bankstatement, setBankStatements] = useState([]);
  const [edit, setedit] = useState(false);
  const [id, setId] = useState("");
  const [msg, setmsg] = useState("");
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/");
      return;
    }
    const getdetails = async () => {
      try {
        setmsg("");
        seterror("");
        const { data } = await axios.get(
          "http://localhost:5000/getuserdetails",
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        );
        console.log("data", data);
        setname(data.user.name);
        setEmail(data.user.email);
        setAccountNo(data.user.bankAccountNumber);
        setifsc(data.user.IFSCCode);
        setId(data.user.document);
        setBankStatements(data.user.bankStatements);
        setPhonenumber(data.user.phoneNumber);
      } catch (error) {
        seterror(error.message);
      }
    };
    getdetails();
  }, []);

  const uploadIdProof = async (e) => {
    try {
      setidproof(e.target.files[0]);
      const formData = new FormData();
      formData.append("document", idproof);
      const res = await axios.post(
        "http://localhost:5000/uploaddocument",
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (error) {
      seterror(error.message);
    }
  };

  const uploadBankStatement = async (e) => {
    try {
      const formdata_bankstatements = new FormData();
      formdata_bankstatements.append("bankStatements", e.target.files[0]);
      formdata_bankstatements.append("bankStatements", e.target.files[1]);
      formdata_bankstatements.append("bankStatements", e.target.files[2]);

      console.log(formdata_bankstatements);
      const res = await axios.post(
        "http://localhost:5000/uploadbankstatements",
        formdata_bankstatements,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      console.log(res);
      setBankStatements(res.data.user.bankStatements);
    } catch (error) {
      seterror(error.message);
    }
  };

  const getIdProof = async () => {
    try {
      if (typeof window !== "undefined") {
        window.open("http://localhost:5000/documents/" + id);
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  const getbankStatement = async (file) => {
    try {
      if (typeof window !== "undefined") {
        window.open("http://localhost:5000/bankstatements/" + file);
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  const submit = async () => {
    try {
      setmsg("");
      const obj = {
        bankAccountNumber: accountno,
        IFSCCode: ifsc,
        amount,
        intrestrate,
        months,
      };
      const res = await axios.patch(
        "http://localhost:5000/updateprofile",
        obj,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      console.log(res);
      setmsg("Profile Updated✔️");
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className={styles.profile}>
      <Container>
        <Row className={styles.row1} lg={3}>
          <Col className={styles.col1} xs={4}>
            <img
              src="/avatar1.png"
              alt="profilepic"
              className={styles.avatar}
            />
            <div className={styles.details}>
              <div>
                <h5>{name}</h5>

                <div style={{ color: "#366FD1" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>{" "}
                  Chennai, India
                </div>
                <div>{email}</div>
                <div>{phonenumber}</div>
              </div>
            </div>
          </Col>
          <Col xs={3} className={styles.bankdetails}>
            {edit ? (
              <div>
                <h5>Bank Details</h5>
                <div style={{ color: "#366FD1" }}>
                  Account No:{" "}
                  <input
                    type="text"
                    placeholder="Account Number"
                    defaultValue={accountno}
                    onChange={(e) => setAccountNo(e.target.value)}
                    style={{ marginLeft: "4px" }}
                  />
                </div>
                <div style={{ color: "#366FD1" }}>
                  IFSC Code:
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    defaultValue={ifsc}
                    onChange={(e) => setifsc(e.target.value)}
                    style={{ marginLeft: "20px" }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h5>Bank Details</h5>
                <div style={{ color: "#366FD1" }}>
                  Account No:{" "}
                  {accountno === undefined || accountno === null
                    ? "-"
                    : accountno}
                </div>
                <div style={{ color: "#366FD1" }}>
                  IFSC Code: {ifsc === undefined || ifsc === null ? "-" : ifsc}
                </div>
              </div>
            )}
          </Col>
          <Col className={styles.edit} xs={3}>
            <div className={styles.edit_btn} onClick={() => setedit(!edit)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
              <strong>Edit</strong>
            </div>
          </Col>
        </Row>
        <Row className={styles.row2}>
          <Row>
            <Col className={styles.col}>
              {!id ? (
                <div>
                  <label for="idproof" className={styles.filelabel}>
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
                    Upload ID Proof (Aadhar card and Pan Card)
                  </label>
                  <input
                    type="file"
                    id="idproof"
                    name="myfile"
                    className={styles.file}
                    onChange={(e) => uploadIdProof(e)}
                  />
                </div>
              ) : (
                <div style={{ cursor: "pointer" }}>
                  <strong>Id Proof:</strong> <u onClick={getIdProof}>{id}</u>
                </div>
              )}

              {bankstatement.length > 0 ? (
                <div>
                  <strong>Bank Statements:</strong>
                  {bankstatement.map((x) => (
                    <div
                      key={x}
                      style={{ cursor: "pointer" }}
                      onClick={() => getbankStatement(x)}
                    >
                      <u>{x}</u>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <label for="bankstatements" className={styles.filelabel}>
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
                    Upload Proof (3 Months Bank Statements)
                  </label>
                  <input
                    type="file"
                    id="bankstatements"
                    name="bankstatements"
                    multiple
                    className={styles.file}
                    defaultValue={bankstatement}
                    onChange={(e) => uploadBankStatement(e)}
                  />
                </div>
              )}
            </Col>
            <Col xs={5}>
              <h6>Add Money</h6>
              <input
                type="text"
                placeholder="Amount to Lend"
                className={styles.amt}
                defaultValue={amount}
                onChange={(e) => setamount(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Intrest Rate"
                style={{ marginRight: "1rem", width: "7rem" }}
                defaultValue={intrestrate}
                onChange={(e) => setintrestrate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Months"
                style={{ width: "7rem" }}
                defaultValue={months}
                onChange={(e) => setmonths(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <button className={styles.btn} onClick={submit}>
              <strong>Submit</strong>
            </button>
            {msg && <div style={{ color: "green" }}>{msg}</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
          </Row>
        </Row>
      </Container>
    </div>
  );
}
