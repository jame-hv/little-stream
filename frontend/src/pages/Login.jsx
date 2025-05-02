import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (event) => {
    event.preventDefault();

    loginMutation(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mb-4 flex items-center justify-start gap-2">
        <p className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
          Little Streaming
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error.response.data.message}</span>
        </div>
      )}

      <div className="w-full">
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="form-title">
              <h2 className="text-xl font-semibold"> Welcome back </h2>
              <span> Sign in to your account </span>
            </div>

            <div className="form-content flex flex-col gap-3">
              <div className="form-control w-full space-y-2">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="input input-bordered w-full"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control w-full space-y-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
