import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../authStateSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
const SignIn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authState.user);
  const token = useSelector((state) => state.authState.token);
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const { next } = useParams();

  const [currentTab, setCurrentTab] = useState("register");

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      email,
      password,
      phone: phoneNumber,
      name,
    };

    let res = await axios.post(
      "http://dremerz-erp.com/creamycup/register",
      data
    );
    console.log(res);
    if (res.status == 201) {
      toggleTab();
      console.log("SIGGG");
    }
  };
  const toggleTab = () => {
    if (currentTab == "signin") {
      setCurrentTab("register");
    } else {
      setCurrentTab("signin");
    }
  };
  const signInUser = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    let res = await axios.post("http://dremerz-erp.com/creamycup/login", data);

    if (res.status !== 200) {
      alert("Invalid Credentials");
      return;
    }

    dispatch(setUser(res.data.user));
    dispatch(setToken(res.data.token));
    setAuthToken(res.data.token);

    if (next) {
      navigate("/" + next);
    } else {
      navigate("/shop");
    }
  };

  return (
    <div className="sign-in">
      <div className="container">
        <div
          className={
            currentTab == "register" ? "register register-flipped" : "register"
          }
        >
          <h1>Sign Up</h1>
          <form>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            <button onClick={registerUser}>Sign Up</button>
          </form>
          <p>
            Don't have an account
            <span onClick={() => setCurrentTab("register")}> Sign In</span> ?
          </p>
        </div>
        <div
          className={
            currentTab == "register" ? "signin signin-flipped" : "signin"
          }
        >
          <h1>Sign In</h1>
          <form>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button onClick={signInUser}>Sign In</button>
          </form>
          <p>
            Already have an account
            <span onClick={() => setCurrentTab("signin")}> Sign Up</span> ?
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
