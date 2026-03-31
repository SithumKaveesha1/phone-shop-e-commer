import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/lib/api";
import { toast } from "sonner";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) {
            setError("Emails do not match.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!formData.acceptTerms) {
            setError("You must accept terms and conditions.");
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser({
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password
            });
            if (data.success) {
                toast.success("Account created successfully! Please log in.");
                navigate("/login");
            }
        } catch (err) {
            setError(err.message || "Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[100dvh] bg-[#f8f9fa] p-4 font-sans">
            <div className="w-full max-w-[500px] bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/40 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="mb-10 text-center">
                    <p className="text-zinc-400 text-[13px] mb-2 font-medium tracking-wide uppercase">Initialize Profile</p>
                    <h1 className="text-[34px] font-bold text-zinc-900 tracking-tight leading-tight">Create Account</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-4 text-sm font-semibold text-red-500 bg-red-50/50 rounded-2xl border border-red-100/50 backdrop-blur-sm animate-in fade-in zoom-in-95">
                            {error}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            id="firstname"
                            placeholder="First Name"
                            required
                            value={formData.firstname}
                            onChange={handleChange}
                            className="h-14 bg-zinc-50 border-zinc-100 text-zinc-900 placeholder:text-zinc-400 rounded-2xl focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-[15px] border-0 ring-1 ring-zinc-200/60"
                        />
                        <Input
                            id="lastname"
                            placeholder="Last Name"
                            required
                            value={formData.lastname}
                            onChange={handleChange}
                            className="h-14 bg-zinc-50 border-zinc-100 text-zinc-900 placeholder:text-zinc-400 rounded-2xl focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-[15px] border-0 ring-1 ring-zinc-200/60"
                        />
                    </div>

                    <div className="space-y-4">
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="h-14 bg-zinc-50 border-zinc-100 text-zinc-900 placeholder:text-zinc-400 rounded-2xl focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-[15px] border-0 ring-1 ring-zinc-200/60"
                        />
                        <Input
                            id="confirmEmail"
                            type="email"
                            placeholder="Confirm Email"
                            required
                            value={formData.confirmEmail}
                            onChange={handleChange}
                            className="h-14 bg-zinc-50 border-zinc-100 text-zinc-900 placeholder:text-zinc-400 rounded-2xl focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-[15px] border-0 ring-1 ring-zinc-200/60"
                        />
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="h-14 bg-zinc-50 border-zinc-100 text-zinc-900 placeholder:text-zinc-400 rounded-2xl focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-[15px] border-0 ring-1 ring-zinc-200/60"
                        />
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="h-14 bg-zinc-50 border-zinc-100 text-zinc-900 placeholder:text-zinc-400 rounded-2xl focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-[15px] border-0 ring-1 ring-zinc-200/60"
                        />
                    </div>

                    <div className="flex items-start gap-3 py-2">
                        <div className="relative flex items-center h-5">
                            <input 
                                type="checkbox" 
                                id="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="peer appearance-none w-5 h-5 rounded-md border-2 border-zinc-200 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" 
                                required
                            />
                            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-1 top-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <label htmlFor="acceptTerms" className="text-zinc-400 text-[13px] font-semibold cursor-pointer select-none group-hover:text-zinc-600 transition-colors">
                            I accept the <span className="text-blue-600 hover:underline">Terms and Conditions</span>
                        </label>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full h-14 bg-[#2f78ff] hover:bg-[#1e66eb] text-white font-bold rounded-2xl transition-all shadow-[0_10px_20px_rgba(47,120,255,0.15)] active:scale-[0.98] text-[15px]"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>

                <div className="mt-10 text-center text-[14px] font-semibold text-zinc-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 transition-colors font-bold ml-1">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;