import React, { useState } from "react";
import useSignup from "../hooks/useSingup";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isPending, error, signupMutation } = useSignup();

  const handleSignup = (event) => {
    event.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Confirm password do not match");
      return;
    }

    signupMutation(signupData);
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
        <form onSubmit={handleSignup}>
          <div>
            <h2 className="text-xl font-semibold">Create an Account</h2>
            <p className="text-sm opacity-70">Join and start your journey!</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  className="input input-bordered w-full"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered w-full"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
                <p className="text-xs opacity-70 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Confirm password</span>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered w-full"
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                <p className="text-xs opacity-70 mt-1">
                  Must be same as the password
                </p>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    required
                  />
                  <span className="text-xs leading-tight">
                    I agree to the{" "}
                    <span className="text-primary hover:underline">
                      terms of service
                    </span>{" "}
                    and{" "}
                    <span className="text-primary hover:underline">
                      privacy policy
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <button className="btn btn-primary w-full" type="submit">
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
