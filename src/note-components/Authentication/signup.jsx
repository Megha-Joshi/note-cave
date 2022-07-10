import "../../public-css/root.css";
import "../Authentication/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth-context";
import { signUpAPI } from "../../note-API/auth-API";
import { useState } from "react";
import { useTheme } from "../../Context/theme-context";
import { Navbar } from "../Navbar/navbar";
import { toast } from "react-hot-toast";

const Signup = () => {
const navigate = useNavigate();
const { theme, setTheme } = useTheme();
const { authDispatch } = useAuth();
const [ user, setUser] = useState({email: "", password: "", name: ""});

const changeHandler = (e) => {
const { id, value } = e.target;
setUser({ ...user, [id]: value });
};

const checkInputFields = () => {
return user.email !== "", user.password !== "";
};

const signupHandler = async (e) => {
e.preventDefault();
if (checkInputFields()) {
try {
const resp = await signUpAPI(user);

if (resp.status === 201) {
localStorage.setItem("token", resp.data.encodedToken);
localStorage.setItem("user",JSON.stringify(resp.data.createdUser));

authDispatch({
type: "SIGNUP",
payload: {
user: resp.data.createdUser,
token: resp.data.encodedToken,
},
});
toast.success("Signed In successfully!");
navigate("/home");
} else {
throw new Error("Something went wrong! Please try again later");
}
} catch (error) {
console.log(error);
toast.error("Cannot sign in");
}
} else
toast.error("Enter all the fields");
};
return (
<div className="App">
  <Navbar />
  <div class="login-container justify-align">
    <form class="container">
      <h2 class="login-head note-text-color">Signup</h2>
      <label for="username" class="input-text note-text-color">Name</label><br />
      <input type="text" id="username" name="username" placeholder="Adarsh Balika" class="input-box title-content"
        onChange={changeHandler} required /><br />
      <label for="username" class="input-text note-text-color">Email address</label><br />
      <input type="text" id="username" name="username" placeholder="abc@gmail.com" class="input-box title-content"
        onChange={changeHandler} required /><br />
      <label for="password" class="input-text note-text-color">Password</label><br />
      <input type="password" id="password" name="password" placeholder="**********" value={user.password}
        onChange={changeHandler} class="input-box title-content" required />
      <label for="checkbox" className="note-text-color">
        <input type="checkbox" id="checkbox" name="checkbox" class="checkbox-inp-text" required /> I accept all Terms
        and Conditions</label>
      <div>
        <button class="btn-primary-login btn btn-text long-btn" onClick={signupHandler}>Create new Account</button>
      </div>
      <div class="new-ac">
        <Link to="/login">
        <button class="btn btn-secondary-login">Already have an Account</button>
        </Link>
      </div>
    </form>
  </div>
</div>
);
}

export{Signup};