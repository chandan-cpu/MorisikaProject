import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authThunk";
import { useEffect } from "react";
import { clearError } from "../redux/authSlice";

import { toast } from "react-toastify";


export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  }
  )
  const {loading,isError,errorMessage } = useSelector((state) => state.auth);
    // 🔔 Show toast if login error occurs
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearError()); // error reset taaki repeat na ho
    }
  }, [errorMessage, dispatch]);
  const handelChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
const handelSubmit = async (e) => {
  e.preventDefault();
  //We dinot used try-catch here because createAsyncThunk already handles errors internally

    //Dispatch the loginUser thunk and wait for it to complete

    const response = await dispatch(loginUser(formData)).unwrap();
    localStorage.setItem("token", response.token);

    navigate("/customer");
};

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden fixed inset-0">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mx-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 sm:mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base">Login to your e-commerce account</p>

        <form className="space-y-2 sm:space-y-3" onSubmit={handelSubmit}>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600 block">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-0.5 w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={handelChange}
              required
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600 block">Password</label>
            <div className="relative mt-0.5">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.password}
                onChange={handelChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1.5 sm:top-2 text-xs sm:text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 text-xs sm:text-sm pt-1">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" className="rounded w-3 h-3" /> <span>Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:underline whitespace-nowrap">Forgot password?</a>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm mt-3"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
          Don’t have an account? <a href="#" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
