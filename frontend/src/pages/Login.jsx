import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const  dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginUser(formData);
            if (data.success) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                navigate("/");
                dispatch(setUser(data.user))
                toast.success(data.message)
            }
        } catch (err) {
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#fdeff4] p-4">
            <Card className="w-full max-w-[400px] bg-white border-none shadow-sm rounded-[15px]">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-xl font-bold">Create your account</CardTitle>
                    <CardDescription className="text-sm text-gray-400">
                        Enter given details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
                                {error}
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="font-bold text-[13px]">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="h-11 border-gray-100 placeholder:text-gray-300 rounded-[8px]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password" name="password" className="font-bold text-[13px]">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-11 border-gray-100 placeholder:text-gray-300 rounded-[8px] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full h-11 bg-[#d81b60] hover:bg-[#c2185b] text-white font-semibold rounded-[8px] mt-2 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-[13px] text-gray-500 font-medium">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#d81b60] hover:underline">
                            Signup
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;