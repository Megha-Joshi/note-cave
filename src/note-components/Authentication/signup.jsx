import "../../public-css/root.css";
import "../Authentication/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth-context";
import { signUpAPI } from "../../note-API/auth-API";
import { useState } from "react";

const Signup = () => {
const navigate = useNavigate();
const { authDispatch } = useAuth();
const [ user, setUser] = useState({email: "", password: ""});

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

navigate("/home");
} else {
throw new Error("Something went wrong! Please try again later");
}
} catch (error) {
console.log(error);
}
} else alert("Enter all the fields");
};
return (
<div className="App">
  <div class="login-container justify-align">
    <form class="container form-container">
      <h2 class="login-head">Signup</h2>
      <label for="username" class="input-text">Email address</label><br />
      <input type="text" id="username" name="username" placeholder="abc@gmail.com" class="input-box title-content"
        onChange={changeHandler} required /><br />
      <label for="password" class="input-text">Password</label><br />
      <input type="password" id="password" name="password" placeholder="**********" value={user.password}
        onChange={changeHandler} class="input-box title-content" required />
      <label for="checkbox">
        <input type="checkbox" id="checkbox" name="checkbox" required /> I accept all Terms and Conditions</label>
      <div>
        <button class="btn-info btn btn-text long-btn" onClick={signupHandler}>Create new Account</button>
      </div>
      <div class="new-ac">
        <Link to="/login">
        <button class="btn-no-bg">Already have an Account</button>
        </Link>
      </div>
    </form>
  </div>
</div>
);
}

export{Signup};