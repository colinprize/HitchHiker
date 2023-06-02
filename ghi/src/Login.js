import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
  };

  return (
    <>
      <h1 class="flex items-center justify-center">
        SUP
      </h1>
      <div class="flex items-center justify-center h-screen">
        <form class="bg-olivine shadow-md rounded px-20 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-lime-900 text-md font-bold mb-2" for="username">
              Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
          </div>
          <div class="mb-6">
            <label class="block text-lime-900 text-md font-bold mb-2" for="password">
              Password
            </label>
            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            <p class="text-red-500 text-sm italic">Please enter valid password.</p>
          </div>
          <div class="flex items-center justify-between">
            <button class="place-items-center bg-lime-600 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="button">
              Sign In
            </button>
            {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a> */}
          </div>
        </form>
        {/* <p class="text-gray-500 text-xs">
        &copy;2023 Hitch Hiker Inc. All rights reserved.
      </p> */}
      </div>
    </>
    // <div className="card text-bg-light mb-3">
    //   <h5 className="card-header">Login</h5>
    //   <div className="card-body">
    //     <form onSubmit={(e) => handleSubmit(e)}>
    //       <div className="mb-3">
    //         <label className="form-label">Username:</label>
    //         <input
    //           name="username"
    //           type="text"
    //           className="form-control"
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label className="form-label">Password:</label>
    //         <input
    //           name="password"
    //           type="password"
    //           className="form-control"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <input className="btn btn-primary" type="submit" value="Login" />
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default LoginForm;
