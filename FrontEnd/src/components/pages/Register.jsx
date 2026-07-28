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
    const Navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/auth/register", {
                name,
                email,
                password
            });
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            )
            Navigate('/user-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed!");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-[#09090B] grid lg:grid-cols-2">
            <AuthHero/>

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
                    handleRegister={handleRegister}
                />
            </div>
        </div>
    )
}


export default Register;