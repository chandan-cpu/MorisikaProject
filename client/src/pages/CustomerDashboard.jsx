import { useSelector } from "react-redux";

export default function CustomerDashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log("CustomerDashboard User:", user);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>
      <p className="text-gray-500">Your personal shopping dashboard</p>
    </div>
  );
}
