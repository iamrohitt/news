import { useNavigate } from "react-router-dom";
import { React, useEffect } from "react";
import "../css/ProfilePage.css";
import CardBoxProfile from "../components/CardBoxProfile";
import UserInformation from "../components/ProfileDesc";
const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]); // If there is no token, redirect to the login page
  return (
    <div>
      <CardBoxProfile />{" "}
      {/* Render the CardBox component and pass the 'news' prop */}
    </div>
  );
};

export default ProfilePage;
