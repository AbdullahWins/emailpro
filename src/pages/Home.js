import React, { useContext } from "react";
import ColdEmail from "../components/Modules/ColdEmail";
import { ThemeContext } from "../contexts/ThemeContext";

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <ColdEmail></ColdEmail>
    </div>
  );
};

export default Home;
