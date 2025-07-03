import React, { useContext, useState } from "react";
import { FaArrowLeft, FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { userDataContext } from "../Context/UserContext";
function SignUp() {
  let [showPassword, setShowPassword] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let { getuserData, setUserData } = useContext(userDataContext);

  let { serverUrl, loading, setLoading } = useContext(authDataContext);

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      toast.success("sign up successfull");
      setUserData(result.data);
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
      console.log("sign error " + error);
    }
  };
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <div
        className="w-[50px] h-[50px]  bg-[red] text-white cursor-pointer absolute top-[10%] left-[20px] rounded-full flex justify-center items-center"
        onClick={() => {
          navigate("/");
        }}
      >
        <FaArrowLeft className="w-[20px] h-[20px]" />
      </div>
      <form
        className="w-[90%] max-[900px] h-[600px] p-[20px]  lg:pl-[40px] md:pl-[40px]  flex items-start justify-center flex-col md:items-start gap-[10px]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-[30px] text-black font-semibold ">
          Welcome to Airbnb
        </h1>
        <div className="w-[90%] flex items-start  gap-[5px] justify-start flex-col mt-[30px]">
          <label htmlFor="name" className="text-[20px] ">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="name"
            required
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg outline-none text-[18px] px-[20px]"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="w-[90%] flex items-start  gap-[5px] justify-start flex-col ">
          <label htmlFor="email" className="text-[20px]">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            required
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg outline-none text-[18px] px-[20px]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="w-[90%] flex items-start  gap-[5px] justify-start flex-col ">
          <label htmlFor="name" className="text-[20px]">
            Password
          </label>
          <div className="flex flex-row justify-between items-center  w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg">
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              placeholder="password"
              required
              className=" w-[80%] outline-none text-[18px] px-[20px]"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {!showPassword ? (
              <FaEyeSlash
                className="w-[22px] h-[22px] mr-[20px] cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaEye
                className="w-[22px] h-[22px] mr-[20px] cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
        </div>
        <button
          className="px-[40px] cursor-pointer py-[5px] bg-red-500 text-white text-[18px] mt-[10px] md:px-[80px] rounded-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p className="text-[18px]">
          Already have an account ?{" "}
          <span
            className="text-red-500 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
