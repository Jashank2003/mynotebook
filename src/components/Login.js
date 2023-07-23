import {React , useState} from "react";
import {Link, useNavigate } from "react-router-dom";

const Login = (props) => { 
  const host = "http://localhost:5000";
  let Navigate  = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password:credentials.password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        // redirect
        localStorage.setItem('token' ,json.authtoken)
        props.showAlert("Welcome Back :)", "success")
        Navigate("/home")
    }
    else{
        props.showAlert("invalid Credentials", "danger")
    }
  };
  return (
    <>
      <div className="container my-5 w-50">
      <h2 className="mb-4">
          Please Login to continue
          </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link className="mx-2"to="/signup"> Create new account</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
