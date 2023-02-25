import { useState } from "react";
import NavigationBar from "../components/Home/Navbar";
import HomePage from "../components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ContactUs from "../components/Home/ContactUs";
import FeaturesPage from "../components/features";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  return (
    <div style={{ maxWidth: "97vw" }}>
      <NavigationBar
        open={open}
        signUpOpen={signUpOpen}
        setOpen={setOpen}
        setSignUpOpen={setSignUpOpen}
      />
      <div style={{ maxWidth: "100vw" }} s>
        <HomePage open={open} signUpOpen={signUpOpen} />
        <FeaturesPage />
        <ContactUs open={open} signUpOen={signUpOpen} />
      </div>
    </div>
  );
}
