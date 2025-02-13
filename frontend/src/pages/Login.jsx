import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", data);
      alert(res.data.message);

      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      navigate("/"); // Redirect to Home
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
       
      <form className="bg-gray-800 p-8 rounded-xl shadow-lg w-96" onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login to MelodyVerse</h2>

        {/* Email / Username Field */}
        <label className="block text-gray-700">Email or Username</label>
        <input
          type="text"
          placeholder="Enter your email or username"
          {...register("email", { required: "Email/Username is required" })}
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password Field */}
        <label className="block text-gray-700 mt-3">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {/* Remember Me Checkbox */}
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
        </div>

         {/* Not have an account? */}
         <div className="mt-2 text-right">
          <a href="/signup" className="text-blue-500 text-sm hover:underline">Not have an account? Signup</a>
        </div>



        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
