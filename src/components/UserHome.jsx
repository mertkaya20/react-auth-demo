import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserHome({ setToken }) {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const role = res.data.username === "emilys" ? "admin" : "user";

        if (role === "admin") {
          navigate("/admin");
          return;
        }
        setUser({ ...res.data, role });
        setIsPending(false);
      })
      .catch((err) => {
        setError(err);
        setIsPending(false);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="text-gray-900 font-semibold text-sm">Lorem.</span>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
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

        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="bg-white border border-red-200 rounded-2xl p-6 text-center max-w-sm">
              <p className="text-red-500 font-medium">Something went wrong</p>
            </div>
          </div>
        )}

        {user && (
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-gray-900 text-2xl font-bold">
                Hello, {user.firstName}! 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Welcome back to your account.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-5">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-900 font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <span className="inline-block mt-1 bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserHome;
