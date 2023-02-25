import { useEffect } from "react";
import { useRouter } from "next/router";
import Adddonation from "../components/Donation/Adddonation";
import NavigationBar from "../components/Home/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
export default function AddDonation() {
  const router = useRouter();
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user === undefined || user === null) {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <NavigationBar />
      <Adddonation />
    </div>
  );
}
