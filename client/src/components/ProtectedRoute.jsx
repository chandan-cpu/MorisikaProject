import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  // Ye flags toast ko baar-baar aane se rokte hain
  const [loginToastShown, setLoginToastShown] = useState(false);
  const [successToastShown, setSuccessToastShown] = useState(false);

  useEffect(() => {
    // ❌ Login nahi hai
    if (!loading && !user && !loginToastShown) {
      toast.warning("Please login to access this page");
      setLoginToastShown(true);
    }

    // ✅ Login successful
    if (!loading && user && !successToastShown) {
      toast.success(`Welcome back, ${user.name}`);
      setSuccessToastShown(true);
    }
  }, [loading, user, loginToastShown, successToastShown]);

  // Jab tak backend response aa raha ho
  if (loading) return <p>Login check ho raha hai...</p>;

  // Login nahi hai to login page par bhej do
  if (!user) return <Navigate to="/login" />;

  // Login hai to page access allow
  return children;
}
