import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { registerUser } from "@/lib/api";
import { Eye, EyeOff, UserPlus, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await registerUser(formData);
            if (data.success) {
                toast.success("Identity Created. Verification Required.");
                navigate("/login");
            }
        } catch (err) {
            setError(err.message || "Protocol Failure. Internal System Error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[100dvh] bg-black p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] absolute -top-40 -right-60 opacity-30 blur-[180px] animate-pulse" />
            <div className="mesh-glow bg-purple-600/10 w-[600px] h-[600px] absolute bottom-0 left-0 opacity-20 blur-[150px]" />

            <div className="w-full max-w-[480px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
                <Card className="glass-card border border-white/5 shadow-2xl rounded-[40px] overflow-hidden backdrop-blur-3xl">
                    <CardHeader className="space-y-4 pb-8 pt-12 text-center">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-[28px] flex items-center justify-center text-blue-500 border border-blue-500/10 mx-auto mb-4 shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-transform hover:rotate-12">
                            <UserPlus size={32} />
                        </div>
                        <CardTitle className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Create Identity</CardTitle>
                        <CardDescription className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                            Initialize your operational profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-10 pb-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 text-xs font-black uppercase tracking-widest text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20 text-center">
                                    {error}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="firstname" className="font-black text-[10px] text-zinc-500 uppercase tracking-[0.2em] ml-2">Internal First Name</Label>
                                    <Input
                                        id="firstname"
                                        placeholder="John"
                                        required
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="h-16 bg-white/5 border-white/5 text-white placeholder:text-zinc-800 rounded-2xl focus:border-blue-500/50 transition-all font-black"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="lastname" className="font-black text-[10px] text-zinc-500 uppercase tracking-[0.2em] ml-2">Internal Last Name</Label>
                                    <Input
                                        id="lastname"
                                        placeholder="Doe"
                                        required
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="h-16 bg-white/5 border-white/5 text-white placeholder:text-zinc-800 rounded-2xl focus:border-blue-500/50 transition-all font-black"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="font-black text-[10px] text-zinc-500 uppercase tracking-[0.2em] ml-2">Grid Link (Email)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@network.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-16 bg-white/5 border-white/5 text-white placeholder:text-zinc-800 rounded-2xl focus:border-blue-500/50 transition-all font-black"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="password" name="password" className="font-black text-[10px] text-zinc-500 uppercase tracking-[0.2em] ml-2">Encryption Cipher</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="h-16 bg-white/5 border-white/5 text-white placeholder:text-zinc-800 rounded-2xl focus:border-blue-500/50 transition-all font-black pr-14"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full h-18 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black rounded-2xl mt-8 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 uppercase tracking-widest text-xs"
                                disabled={loading}
                            >
                                {loading ? "Initializing..." : "Register Identity"}
                            </Button>
                        </form>
                        <div className="mt-12 text-center text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                            Already Synchronized?{" "}
                            <Link to="/login" className="text-white hover:text-blue-500 transition-colors border-b border-white/10 pb-0.5">
                                Log In
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                <p className="mt-10 text-center text-zinc-800 text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                    <ShieldCheck size={12} className="text-zinc-800" />
                    Distributed Network Protocol Active
                </p>
            </div>
        </div>
    );
};

export default Signup;