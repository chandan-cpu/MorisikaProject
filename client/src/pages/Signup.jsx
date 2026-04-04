import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../redux/authThunk";
import { clearError } from "../redux/authSlice";
import api from "../axios";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, errorMessage } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearError());
    }
  }, [dispatch, errorMessage]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      Phonenumber: formData.Phonenumber.trim(),
      password: formData.password,
      role: "customer",
    };

    try {
      await dispatch(registerUser(payload)).unwrap();
      setPendingEmail(payload.email);
      setShowOtpDialog(true);
      toast.success("Signup successful. Enter OTP sent to your email.");
    } catch (_error) {
      // Error toast handled by redux state effect.
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setOtpLoading(true);
      await api.post("/auth/verify-otp", {
        email: pendingEmail,
        otp: otp.trim(),
      });
      toast.success("OTP verified successfully. Please login.");
      setShowOtpDialog(false);
      setOtp("");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      await api.post("/auth/send-otp", {
        email: pendingEmail,
      });
      toast.success("New OTP sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-y-auto fixed inset-0 py-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mx-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 sm:mb-2">Create Account</h2>
        <p className="text-gray-500 text-center mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base">
          Join Moriskia and start your shopping journey
        </p>

        <form className="space-y-2 sm:space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600 block">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="mt-0.5 w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600 block">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-0.5 w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600 block">Phone Number</label>
            <input
              type="tel"
              name="Phonenumber"
              placeholder="Enter your phone number"
              className="mt-0.5 w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.Phonenumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600 block">Password</label>
            <div className="relative mt-0.5">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Strong password"
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1.5 sm:top-2 text-xs sm:text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600 block">Confirm Password</label>
            <div className="relative mt-0.5">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter password"
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 sm:py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1.5 sm:top-2 text-xs sm:text-sm text-gray-500"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm mt-3"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {showOtpDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">Verify Your Email</h3>
            <p className="mt-1 text-sm text-gray-600">
              Enter the OTP sent to <span className="font-medium">{pendingEmail}</span>
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-base tracking-[0.25em] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              maxLength={6}
            />

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otpLoading}
                className="flex-1 rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOtpDialog(false);
                  setOtp("");
                }}
                disabled={otpLoading}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendLoading || otpLoading}
              className="mt-3 w-full text-sm font-medium text-indigo-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {resendLoading ? "Resending OTP..." : "Resend OTP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
