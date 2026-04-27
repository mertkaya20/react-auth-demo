import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ setToken }) {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const role = res.data.username === "emilys" ? "admin" : "user";

        if (role !== "admin") {
          navigate("/");
          return;
        }
        setUser({ ...res.data, role });
        setIsPending(false);
      })
      .catch(() => {
        setError(true);
        setIsPending(false);
      });
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div>
            <span className="text-gray-900 font-semibold text-sm">
              Dashboard
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Loading */}
        {isPending && (
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="bg-white border border-red-200 rounded-2xl p-6 text-center max-w-sm">
              <p className="text-red-500 font-medium mb-1">
                Something went wrong
              </p>
              <p className="text-gray-400 text-sm">{error.message}</p>
            </div>
          </div>
        )}

        {/* Data */}
        {user && (
          <div className="flex flex-col gap-6">
            {/* Welcome */}
            <div>
              <h1 className="text-gray-900 text-2xl font-bold">
                Welcome back, {user.firstName}! 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Have a beautiful day!
              </p>
            </div>

            {/* User card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-5">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-500 text-sm truncate">{user.email}</p>
                <span className="inline-block mt-1 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Username", value: user.username },
                { label: "Phone", value: user.phone },
                { label: "Company", value: user.company?.name ?? "—" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl border border-gray-200 p-4"
                >
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-gray-900 text-sm font-semibold truncate">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Token */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">
                Access Token
              </p>
              <p className="text-gray-500 text-xs font-mono break-all leading-relaxed">
                {localStorage.getItem("token")?.substring(0, 60)}...
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
