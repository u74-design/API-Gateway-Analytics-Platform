import { Link } from "react-router-dom";

import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  loading,
  error,
  handleLogin,
}) => {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-bold text-white">
        Sign in
      </h1>

      <p className="text-gray-400 mt-2">
        Continue to your API Console.
      </p>

      <form
        onSubmit={handleLogin}
        className="space-y-5 mt-8"
      >
        <InputField
          label="Email"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full h-12 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-gray-400">
          No account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;