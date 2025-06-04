import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const url = "https://683c227128a0b0f2fdc64619.mockapi.io/register";
      const response = await axios.get(url);

      const foundUser = response.data.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );

      if (foundUser) {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Logged in successfully",
        });

        localStorage.setItem("user", JSON.stringify(foundUser));
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username or password is wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "❌ اسم المستخدم أو كلمة المرور غير صحيحة.",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>

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
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
        >
          Sign in
        </button>
        <Link to={"/signup"}>
          <div className="text-white underline">
            don't have an account? click here to register
          </div>
        </Link>
      </form>
    </div>
  );
}

export default Login;
