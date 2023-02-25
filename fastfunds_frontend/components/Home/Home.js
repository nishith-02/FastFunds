import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../styles/Home/Home.module.css";
import {useRouter} from "next/router";
export default function HomePage(props) {
  const router=useRouter()
  const redirectBorrow=()=>{
    router.push("/borrow")
  }
  const redirectDonate=()=>{
    router.push("/addDonation")
  }
  return (
    <div
      className={styles.Container}
      style={{ filter: props.open || props.signUpOpen ? "blur(10px)" : "" }}
      id="home"
    >
      <Container>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <div className={styles.home__content}>
              <h1 className={styles.home__text}>Financial Issues?</h1>
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "35px",
                  marginTop: "-7px",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                We Got Your Back!
              </h2>
              <div className={styles.home__buttons}>
                <button className={styles.borrow_btn} onClick={redirectBorrow}>Borrow</button>
                <button className={styles.donate_btn} onClick={redirectDonate}>Donate</button>
              </div>
            </div>

            {<img src="/blobimg.png" className={styles.blob} />}
          </Col>
          <Col>{<img src="/bgimg.png" className={styles.bgimg} />}</Col>
        </Row>
      </Container>
    </div>
  );
}
