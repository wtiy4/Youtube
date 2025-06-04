import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const send = async () => {
    const { username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be the same",
      });
      return;
    }

    const url = "https://683c227128a0b0f2fdc64619.mockapi.io/register";
    try {
      await axios.post(url, { username, password });
      Swal.fire({
        icon: "success",
        title: "",
        text: "Account has been created successfully ✅",
      });

      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Create a new account
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-xl bg-gray-700 border border-gray-600 text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-xl bg-gray-700 border border-gray-600 text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-xl bg-gray-700 border border-gray-600 text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Sign up
        </button>
        <Link to={"/login"}>
          <div className="text-white underline ">
            got an account? click here to sign in
          </div>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
