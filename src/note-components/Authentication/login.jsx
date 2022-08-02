import "../../public-css/root.css";
import "../Authentication/auth.css";
import { useAuth } from "../../Context/auth-context";
import { loginAPI } from "../../note-API/auth-API";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/theme-context";
import { Navbar } from "../Navbar/navbar";
import { toast } from "react-hot-toast";

const Login = () => {
const { theme, setTheme } = useTheme();
const { authDispatch} = useAuth();
const navigate = useNavigate();
const [ user, setUser ] = useState({email: "", password: ""});

const guestUser = {
email: "adarshbalika@gmail.com",
password: "adarshBalika123",
};

const changeHandler = (e) => {
const { id, value } = e.target;
setUser({ ...user, [id]: value });
};

const guestUserHandler = (e) => {
e.preventDefault();
setUser(guestUser);
};

const loginHandler = async (e) => {
e.preventDefault();
if ((user.email !== "", user.password !== "")) {
try {
const resp = await loginAPI(user);
if (resp.status === 200) {
localStorage.setItem("token", resp.data.encodedToken);
localStorage.setItem("user", JSON.stringify(resp.data.foundUser));

authDispatch({
type: "LOGIN",
payload: {
user: resp.data.foundUser,
token: resp.data.encodedToken,
},
});
toast.success("Logged In Successfully!")
navigate("/home");
} else if (resp.status === 404) {
toast.error("Email not registered");
} else {
throw new Error("Something went wrong! Please try again later");
}
} catch (error) {
console.log(error);
toast.error("Cannot login in");
}
} else
toast.error("Enter both field");
};
return (
<div className="App">
  <Navbar />
  <div class="login-container justify-align">
    <form class="container" onSubmit={loginHandler}>
      <h2 class="login-head note-text-color">Login</h2>
      <label for="username" class="input-text note-text-color">Email address</label><br />
      <input type="email" id="email" name="username" placeholder="abc@gmail.com" value={user.email}
        class="input-box login-input-box title-content" onChange={changeHandler} required /><br />
      <label for="password" class="login--text note-text-color">Password</label><br />
      <input type="password" id="password" name="password" placeholder="**********" value={user.password}
        class="input-box login-input-box title-content" onChange={changeHandler}required />
      {/* <div class="check-pass note-text-color">
        <label for="checkbox">
          <input type="checkbox" id="checkbox" name="checkbox" /> Remember me</label>
        <button class="btn btn-secondary-login">Forgot your Password?</button>
      </div> */}
      <div>
        <button class="btn-primary-login btn btn-text long-btn" onClick={guestUserHandler}>Add Guest Credential</button>
      </div>
      <div>
        <button class="btn-primary-login btn btn-text long-btn">Login</button>
      </div>
      <Link to="/signup">
      <div class="new-ac">
        <button type="submit" class="btn btn-secondary-login">Create New Account</button>
      </div>
      </Link>
    </form>
  </div>
</div>
);
};

export {Login};