import "../../public-css/root.css";
import "../Authentication/auth.css";
import { useAuth } from "../../Context/auth-context";
import { loginAPI } from "../../note-API/auth-API";
import { Navbar } from "../Navbar/navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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

navigate("/home");
} else if (resp.status === 404) {
alert("Email not registered");
} else {
throw new Error("Something went wrong! Please try again later");
}
} catch (error) {
console.log(error);
}
} else alert("Enter both field");
};
return (
<div className="App">
  <Navbar />
  <div class="login-container justify-align">
    <form class="container form-container">
      <h2 class="login-head">Login</h2>
      <label for="username" class="input-text">Email address</label><br />
      <input type="text" id="email" name="username" placeholder="abc@gmail.com" value={user.email}
        class="input-box title-content" onChange={changeHandler} required /><br />
      <label for="password" class="input-text">Password</label><br />
      <input type="password" id="password" name="password" placeholder="**********" value={user.password}
        class="input-box title-content" onChange={changeHandler}required />
      <div class="check-pass">
        <label for="checkbox">
          <input type="checkbox" id="checkbox" name="checkbox" /> Remember me</label>
        <button class="btn-no-bg">Forgot your Password?</button>
      </div>
      <div>
        <button class="btn-info btn btn-text long-btn" onClick={guestUserHandler}>Add Guest Credential</button>
      </div>
      <div>
        <button class="btn-info btn btn-text long-btn" onClick={loginHandler}>Login</button>
      </div>
      <Link to="/signup">
      <div class="new-ac">
        <button class="btn-no-bg">Create New Account</button>
      </div>
      </Link>
    </form>
  </div>
</div>
);
};

export {Login};