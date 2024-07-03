import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setEmailError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/password/forgot', {
        email: email
      });

      console.log('Password reset request sent:', response.data);
      setEmail('');
      setEmailError(false);
      alert('Check your email for reset password instructions');

    } catch (error) {
      console.error('Password reset request failed:', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false); // Reset error state when user starts typing again
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
            <h1 className="block text-2xl font-bold text-gray-800">Forgot password?</h1>
            <p className="mt-2 text-sm text-gray-600">Don't worry we'll send you reset instructions.</p>
          </div>

          <div className="mt-6">
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* Email Form Group */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-gray-600">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 ${
                        emailError ? "ring-2 ring-red-500" : ""
                      }`}
                      placeholder=" "
                      required
                      aria-describedby="email-error"
                    />
                    {emailError && (
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
                    {emailError && (
                      <p className="mt-2 text-xs text-rose-600">
                        Valid email address required for the account recovery process
                      </p>
                    )}
                  </div>
                </div>
                {/* /Email Form Group */}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset password
                </button>
                {/* /Submit Button */}
              </div>
            </form>
            {/* /Form */}
          </div>
        </div>
      </div>

      <p className="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center">
        <span className="inline pr-3 text-sm text-gray-600">
          Remember your password?{" "}
          <a className="font-medium text-gray-800 hover:underline" href="/login">
            Sign in here
          </a>
        </span>
        <a className="pl-3 text-sm text-gray-600 hover:text-gray-900 underline" href="#" target="_blank">
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default ForgotPassword;
