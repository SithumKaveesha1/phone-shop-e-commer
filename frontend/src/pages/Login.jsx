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
import { Eye, EyeOff, ShieldCheck, Lock } from "lucide-react";

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
                toast.success("Synchronized Successfully.");
            }
        } catch (err) {
            setError(err.message || "Credential Mismatch. Access Denied.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[100dvh] bg-black p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="mesh-glow bg-blue-600/10 w-[800px] h-[800px] absolute -top-40 -left-60 opacity-30 blur-[180px] animate-pulse" />
            <div className="mesh-glow bg-indigo-600/10 w-[600px] h-[600px] absolute bottom-0 right-0 opacity-20 blur-[150px]" />

            <div className="w-full max-w-[440px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
                <Card className="glass-card border border-white/5 shadow-2xl rounded-[40px] overflow-hidden backdrop-blur-3xl">
                    <CardHeader className="space-y-4 pb-8 pt-12 text-center">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-[28px] flex items-center justify-center text-blue-500 border border-blue-500/10 mx-auto mb-4 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                            <Lock size={32} />
                        </div>
                        <CardTitle className="text-4xl font-black text-white tracking-tighter uppercase">Authorized Access</CardTitle>
                        <CardDescription className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                            Enter your credentials to synchronize data
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-10 pb-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 text-xs font-black uppercase tracking-widest text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20 text-center">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-3">
                                <Label htmlFor="email" className="font-black text-[10px] text-zinc-500 uppercase tracking-[0.2em] ml-2">System Identification (Email)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="node@network.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-16 bg-white/5 border-white/5 text-white placeholder:text-zinc-800 rounded-2xl focus:border-blue-500/50 transition-all font-black"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between ml-2">
                                    <Label htmlFor="password" name="password" className="font-black text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Access Cipher</Label>
                                    <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Recover</Link>
                                </div>
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
                                {loading ? "Synchronizing..." : "Initiate Sync"}
                            </Button>
                        </form>
                        <div className="mt-12 text-center text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                            New Operator?{" "}
                            <Link to="/signup" className="text-white hover:text-blue-500 transition-colors border-b border-white/10 pb-0.5">
                                Create Identity
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                <p className="mt-10 text-center text-zinc-800 text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                    <ShieldCheck size={12} className="text-zinc-800" />
                    Secure Hardware Node Protocol Active
                </p>
            </div>
        </div>
    );
};

export default Login;