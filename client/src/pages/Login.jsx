import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authThunk";
import { useEffect } from "react";
import { clearError } from "../redux/authSlice";

import { toast } from "react-toastify";
import api from "../axios";


export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    email:"",
    password:""
  }
  )
  const {loading,errorMessage } = useSelector((state) => state.auth);
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
  try {
    await dispatch(loginUser(formData)).unwrap();
    navigate("/cart");
  } catch (err) {
    // Error is already handled by the rejected case in authSlice
    // toast will show via the useEffect above
  }
};

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotStep(1);
    setForgotLoading(false);
    setForgotData({
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSendResetOtp = async () => {
    if (!forgotData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setForgotLoading(true);
      await api.post("/auth/forget-password", {
        email: forgotData.email.trim().toLowerCase(),
      });
      toast.success("OTP sent to your email");
      setForgotStep(2);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to send OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleVerifyResetOtp = async () => {
    if (!forgotData.otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setForgotLoading(true);
      await api.post("/auth/validate-otp", {
        resetOtp: forgotData.otp.trim(),
      });
      toast.success("OTP verified. Set your new password.");
      setForgotStep(3);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Invalid OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!forgotData.newPassword || !forgotData.confirmPassword) {
      toast.error("Please enter and confirm new password");
      return;
    }

    if (forgotData.newPassword !== forgotData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setForgotLoading(true);
      await api.post("/auth/reset-password", {
        newPassword: forgotData.newPassword,
      });
      toast.success("Password reset successful. Please login.");
      closeForgotModal();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Password reset failed");
    } finally {
      setForgotLoading(false);
    }
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
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-indigo-600 hover:underline whitespace-nowrap"
            >
              Forgot password?
            </button>
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
          Don’t have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">Forgot Password</h3>

            {forgotStep === 1 && (
              <>
                <p className="mt-1 text-sm text-gray-600">Enter your account email to get OTP.</p>
                <input
                  type="email"
                  value={forgotData.email}
                  onChange={(e) =>
                    setForgotData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleSendResetOtp}
                  disabled={forgotLoading}
                  className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {forgotLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}

            {forgotStep === 2 && (
              <>
                <p className="mt-1 text-sm text-gray-600">Enter OTP sent to {forgotData.email}.</p>
                <input
                  type="text"
                  value={forgotData.otp}
                  onChange={(e) =>
                    setForgotData((prev) => ({
                      ...prev,
                      otp: e.target.value.replace(/\D/g, "").slice(0, 6),
                    }))
                  }
                  placeholder="Enter 6-digit OTP"
                  className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-base tracking-[0.25em] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  maxLength={6}
                />
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={handleVerifyResetOtp}
                    disabled={forgotLoading}
                    className="flex-1 rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {forgotLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={handleSendResetOtp}
                    disabled={forgotLoading}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    Resend
                  </button>
                </div>
              </>
            )}

            {forgotStep === 3 && (
              <>
                <p className="mt-1 text-sm text-gray-600">Set your new password.</p>
                <input
                  type="password"
                  value={forgotData.newPassword}
                  onChange={(e) =>
                    setForgotData((prev) => ({ ...prev, newPassword: e.target.value }))
                  }
                  placeholder="New password"
                  className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="password"
                  value={forgotData.confirmPassword}
                  onChange={(e) =>
                    setForgotData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                  }
                  placeholder="Confirm new password"
                  className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={forgotLoading}
                  className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {forgotLoading ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={closeForgotModal}
              disabled={forgotLoading}
              className="mt-3 w-full text-sm font-medium text-gray-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
