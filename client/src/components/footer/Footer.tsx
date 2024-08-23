import classes from "./style.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleTermsClick = () => {
    navigate("/terms");
  };

  return (
    <div className={classes.container}>
      <div>
        <p onClick={handleContactClick}>CONTACT</p>

        <p onClick={handleTermsClick}>TERMS</p>
      </div>
    </div>
  );
};
export default Footer;
