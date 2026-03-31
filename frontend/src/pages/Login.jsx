import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/api";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

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
                dispatch(setUser(data.user));
                toast.success("Welcome back! Successfully logged in.");
            }
        } catch (err) {
            setError(err.message || "Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        toast.info("Google Sign in feature coming soon!");
    };

    return (
        <div className="flex items-center justify-center min-h-[100dvh] bg-[#f8f9fa] p-4 font-sans">
            <div className="w-full max-w-[420px] bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/40 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="mb-10">
                    <p className="text-zinc-400 text-[13px] mb-2 font-medium tracking-wide">Please enter your details</p>
                    <h1 className="text-[34px] font-bold text-zinc-900 tracking-tight leading-tight">Welcome back</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="p-4 text-sm font-semibold text-red-500 bg-red-50/50 rounded-2xl border border-red-100/50 backdrop-blur-sm animate-in fade-in zoom-in-95">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-5">
                        <div className="group transition-all duration-300">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email address"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="h-14 bg-zinc-50 border-zinc-100 text-zinc-900 placeholder:text-zinc-400 rounded-2xl focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-[15px] border-0 ring-1 ring-zinc-200/60"
                            />
                        </div>
                        <div className="group transition-all duration-300">
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="h-14 bg-zinc-50 border-zinc-100 text-zinc-900 placeholder:text-zinc-400 rounded-2xl focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-[15px] border-0 ring-1 ring-zinc-200/60"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-[13px] py-1 font-semibold">
                        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                            <div className="relative flex items-center justify-center">
                                <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-md border-2 border-zinc-200 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-zinc-400 group-hover:text-zinc-600 transition-colors">Remember for 30 days</span>
                        </label>
                        <Link to="/forgot-password" name="forgot-password" className="text-blue-600 hover:text-blue-700 transition-colors underline-offset-4 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="pt-4 space-y-4">
                        <Button 
                            type="submit" 
                            className="w-full h-14 bg-[#2f78ff] hover:bg-[#1e66eb] text-white font-bold rounded-2xl transition-all shadow-[0_10px_20px_rgba(47,120,255,0.15)] active:scale-[0.98] text-[15px]"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                        
                        <Button 
                            type="button" 
                            onClick={handleGoogleLogin}
                            className="w-full h-14 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200/70 font-semibold rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-[15px]"
                        >
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign in with Google
                        </Button>
                    </div>
                </form>

                <div className="mt-10 text-center text-[14px] font-semibold text-zinc-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 transition-colors font-bold ml-1">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;