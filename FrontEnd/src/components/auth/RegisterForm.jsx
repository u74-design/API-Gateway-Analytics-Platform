import { Link } from "react-router-dom";

import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

const RegisterForm = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  loading,
  error,
  success,
  handleRegister,
}) => {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-bold text-white">
        Register
      </h1>

      <p className="text-gray-400 mt-2">
        Make your API Console.
      </p>

      <form
        onSubmit={handleRegister}
        className="space-y-5 mt-8"
      >
        <InputField
          label="Name"
          type="name"
          placeholder="Udiv"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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

        {success && (
          <p className="text-green-400 text-sm">
            {success}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full h-12 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
        >
          {loading ? "Signing In..." : "Register"}
        </button>

        <p className="text-center text-gray-400">
          Already have an account ?{" "}
          <Link
            to="/"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;