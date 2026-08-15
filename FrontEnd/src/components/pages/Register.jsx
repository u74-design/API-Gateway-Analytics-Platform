import InputField from "../auth/InputField"
import { useState } from "react"
import PasswordInput from "../auth/PasswordInput"
import { useNavigate } from "react-router-dom"
import api from "../services/api";
import { Link } from "lucide-react"
import AuthHero from "../auth/AuthHero";
import RegisterForm from "../auth/RegisterForm";

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("")
        try {
            const res = await api.post("/auth/register", {
                name,
                email,
                password
            });

            console.log("Register response:", res.data);

            if (!res.data.success) {
                setError(
                    res.data.message || "Registration failed."
                );
                return;
            }

            // Store JWT
            localStorage.setItem(
                "token",
                res.data.token
            );

            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setSuccess(
                res.data.message || "User registered successfully"
            );

            console.log("TOKEN:", localStorage.getItem("token"));
            console.log("USER:", localStorage.getItem("user"));

            console.log("NAVIGATING TO DASHBOARD");
            // Navigate to dashboard
            navigate("/user-dashboard");

        } catch (err) {

            console.error(
                "Registration error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Registration failed."
            );

        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#09090B] grid lg:grid-cols-2">
            <AuthHero />

            <div className="flex items-center justify-center px-8">
                <RegisterForm
                    name={name}
                    setName={setName}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    loading={loading}
                    error={error}
                    success={success}
                    handleRegister={handleRegister}
                />
            </div>
        </div>
    )
}


export default Register;