import styles from "../../styles/Home/ContactUs.module.css";
import "aos/dist/aos.css"
export default function ContactUs(props) {
  return (
    <div className={styles.root} id="contact" style={{filter:props.open||props.signUpOpen?"blur(10px)":""}}>
      <div className={styles.main}>
        <div>
          <div className={styles.side1}>
            <img src="/Location.svg" className={styles.picture}/>
            <p className={styles.text}>India</p>
          </div>
          <div className={styles.side} style={{marginTop:"3rem"}}>
              <img src="/Phone.svg" className={styles.picture}/>
              <p className={styles.text}>+917893756391</p>
          </div>
          <div className={styles.side} style={{marginTop:"3rem"}}>
              <img src="/Mail.svg" className={styles.picture}/>
              <p className={styles.text}>Fastfunds@gmail.com</p>
          </div>
          <div className={styles.side} style={{marginTop:"3rem"}}>
              <img src="/instagram.svg" className={styles.picture}/>
              <p className={styles.text}>Fast Funds</p>
          </div>
        </div>
        <div className={styles.contact}>
            <p className={styles.subhead}>Contact Us</p>
            <form className={styles.form}>
                <input className={styles.input} type="text" placeholder="Enter Your Name"/>
                <input className={styles.input2} type="text" placeholder="Enter Your Email Id"/>
                <textarea className={styles.textarea} placeholder="Feedback" rows="5" cols="33"></textarea>
                <button className={styles.button} type="submit">Submit</button>
            </form>
        </div>
      </div>
    </div>
  );
}
