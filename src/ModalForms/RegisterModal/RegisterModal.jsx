import React, { useState } from "react";
import RegisterModelStyles from "./RegisterModel.module.css";
import closeIcon from "../../images/icons8-close-50 (2).png";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const RegisterModel = ({ handleCloseRegisterModal }) => {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleClose = () => {
    setLoginModel(true);
  };
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  console.log(import.meta.env.VITE_SERVER_HOST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.username || !formValue.password) {
      setError(true);
    } else {
      setError(false);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { username, password } = formValue;
        const user = await axios.post(
          `${import.meta.env.VITE_SERVER_HOST}/auth/register`,
          { username, password },
          config
        );
        const { data } = user;
        console.log(data);
        localStorage.setItem("swipetory_user", JSON.stringify(data));
        // toast.success(`${data.message}`, {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        toast.success("🦄 Wow so easy!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          handleCloseRegisterModal();
        }, 3000);

        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(`something went wrong`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <>
      <div
        className={RegisterModelStyles.register_model_wrapper}
        onClick={handleCloseRegisterModal}
      ></div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={RegisterModelStyles.register_model}>
        <div className={RegisterModelStyles.register_model_form}>
          <span onClick={handleCloseRegisterModal}>
            <img src={closeIcon} alt="close" />
          </span>
          <p>Register to SwipTory</p>
          <div className={RegisterModelStyles.input_box}>
            <label htmlFor="username">Username</label>
            <input
              className={RegisterModelStyles.input}
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              value={formValue.username}
            />
          </div>

          <div className={RegisterModelStyles.input_box}>
            <label htmlFor="password">Password</label>
            <input
              className={RegisterModelStyles.input}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formValue.password}
            />
          </div>
          <p className={RegisterModelStyles.error}>
            {error ? "* all fields required in the form" : ""}
          </p>
          <button
            onClick={handleSubmit}
            className={RegisterModelStyles.signup_model_btn}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterModel;
