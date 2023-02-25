import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../styles/Features.module.css";
import Link from "next/link";
import "aos/dist/aos.css";
export default function FeaturesPage() {
  return (
    <div id="features" className={styles.features}>
      <Container>
        <Row lg={4} className={styles.features__row}>
          <Col xs={3}>
            <img src="/fastfunds.png" alt="fastfunds" className={styles.img} />
          </Col>
          <Col xs={3}>
            <Link href="/borrowhistory">
              <img
                src="/borrowhistory.png"
                alt="borrowhistory"
                className={styles.img}
              />
            </Link>
          </Col>
          <Col xs={3}>
            <Link href="/pendingrequest">
              <img
                src="/pendinghistory.png"
                alt="pendinghistory"
                className={styles.img}
              />
            </Link>
          </Col>
          <Col xs={3}>
            <Link href="/profile">
              <img src="/profile.png" alt="profile" className={styles.img} />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className={styles.donate}>
            <Link href="/addDonation">
            <img
              src="/donate.png"
              alt="donate"
              className={styles.img}
              align="bottom"
            />
            </Link>
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Link href="/lendhistory">
              <img
                src="/lendinghistory.png"
                alt="lendinghistory"
                className={styles.img}
                align="bottom"
              />
            </Link>
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Link href="/borrow">
            <img
              src="/connect.png"
              alt="connect"
              className={styles.img}
              align="bottom"
            />
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
