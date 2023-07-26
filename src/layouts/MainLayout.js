import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <section
      className={`min-h-screen flex flex-col justify-start md:justify-between`}
    >
      <Outlet></Outlet>
    </section>
  );
};

export default MainLayout;
