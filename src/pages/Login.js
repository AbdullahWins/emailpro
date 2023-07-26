import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  // changing the webpage title dynamically
  document.title = `${process.env.REACT_APP_ApplicationName} | Login`;

  const { loginUserEmail, verifyEmail, loading } = useContext(AuthContext);
  const [checkedStatus, setCheckedStatus] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const errorMessageToast = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event?.target;
    const email = form?.email?.value;
    const password = form?.password?.value;

    loginUserEmail(email, password)
      .then((result) => {
        console.log(result);
        form.reset();
        navigate(from, { replace: true });
      })
      .then(() => {
        if (checkedStatus) {
          verifyEmail(email);
        }
      })
      .catch((error) => {
        errorMessageToast("Invalid e-mail");
        console.log(error?.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-2 h-screen">
      <div className="w-3/4 md:w-2/4 lg:w-[450px] border border-whiteLow shadow-2xl shadow-blackLow rounded-3xl">
        <form className="px-12 py-12" onSubmit={handleLogin}>
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full font-bold focus:border-none"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full my-4 font-bold focus:border-none"
          />
          <div className="flex items-center justify-start gap-2">
            <input
              defaultChecked={checkedStatus}
              onClick={() => {
                setCheckedStatus(true);
              }}
              type="checkbox"
              className="checkbox checkbox-xs rounded-lg"
            />
            <span className="text-sm">Remember me</span>
          </div>
          <button
            disabled={loading}
            className="btn w-full rounded-full mt-6 bg-btnColor border-none normal-case"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
