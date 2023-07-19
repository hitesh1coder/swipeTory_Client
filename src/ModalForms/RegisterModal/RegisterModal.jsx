import React, { useState } from "react";
import RegisterModelStyles from "./RegisterModel.module.css";
import closeIcon from "../../images/icons8-close-50 (2).png";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const RegisterModel = ({ handleCloseRegisterModal }) => {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username and password are provided
    if (!formValue.username || !formValue.password) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { username, password } = formValue;

      // Make POST request to register user
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/auth/register`,
        { username, password },
        config
      );

      const { data } = response;

      // Check if registration was successful
      if (data.status === "success") {
        toast.success("User Registered Successfully");
      } else {
        toast.error("Something went wrong");
      }

      // Store user data in local storage
      localStorage.setItem("swipetory_user", JSON.stringify(data));

      setTimeout(() => {
        handleCloseRegisterModal();
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={RegisterModelStyles.register_model_wrapper}
        onClick={handleCloseRegisterModal}
      ></div>
      <Toaster />
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
