import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!password || password.length < 6) {
      setPasswordError(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/password/reset', {
        password: password,
        confirmPassword: confirmPassword
      });

      console.log('Password reset successful:', response.data);
      setResetSuccess(true);
      setPassword('');
      setConfirmPassword('');
      setPasswordError(false);
      setConfirmPasswordError(false);
      setResetError('');

    } catch (error) {
      console.error('Password reset failed:', error.response.data);
      setResetError(error.response.data.message);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(false);
  };

  return (
    <div className="mx-auto max-w-md mt-20">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-gray-200 p-2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h1 className="block text-2xl font-bold text-gray-800">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-600">Please enter your new password.</p>
          </div>

          <div className="mt-6">
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* Password Form Group */}
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm text-gray-600">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 ${
                        passwordError ? "ring-2 ring-red-500" : ""
                      }`}
                      placeholder=" "
                      required
                    />
                    {passwordError && (
                      <div className="pointer-events-none absolute top-3 right-0 flex items-center px-3">
                        <svg
                          className="h-5 w-5 text-rose-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    )}
                    {passwordError && (
                      <p className="mt-2 text-xs text-rose-600">
                        Password must be at least 6 characters long.
                      </p>
                    )}
                  </div>
                </div>
                {/* /Password Form Group */}

                {/* Confirm Password Form Group */}
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm text-gray-600">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className={`peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 ${
                        confirmPasswordError ? "ring-2 ring-red-500" : ""
                      }`}
                      placeholder=" "
                      required
                    />
                    {confirmPasswordError && (
                      <div className="pointer-events-none absolute top-3 right-0 flex items-center px-3">
                        <svg
                          className="h-5 w-5 text-rose-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    )}
                    {confirmPasswordError && (
                      <p className="mt-2 text-xs text-rose-600">
                        Passwords do not match.
                      </p>
                    )}
                  </div>
                </div>
                {/* /Confirm Password Form Group */}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset Password
                </button>
                {/* /Submit Button */}
              </div>
            </form>
            {/* /Form */}
          </div>

          {resetError && (
            <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-md">
              {resetError}
            </div>
          )}

          {resetSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-600 rounded-md">
              Password reset successful! You can now <a href="/login" className="font-medium text-blue-600 hover:underline">sign in here</a>.
            </div>
          )}

        </div>
      </div>

      <p className="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center">
        <a className="pl-3 text-sm text-gray-600 hover:text-gray-900 underline" href="#" target="_blank">
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default ResetPassword;
