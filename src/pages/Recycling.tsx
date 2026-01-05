import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
    Recycle,
    ArrowRight,
    ChevronRight,
    BarChart3,
    Factory,
    Leaf,
    Zap,
    ShieldCheck,
    Globe,
    TrendingUp,
    Settings,
    Truck,
    Droplets,
    Container,
    Flame,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    Hammer,
    Plane,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function Recycling() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        company_name: '',
        contact_person: '',
        email: '',
        phone: '',
        metal_type: '',
        estimated_quantity: '',
        location: '',
        description: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({
                title: "Login Required",
                description: "Please sign in to submit a recycling request.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        try {
            const { error } = await (supabase as any)
                .from('recycling_requests')
                .insert([
                    {
                        ...formData,
                        user_id: user.id,
                        status: 'Pending',
                        admin_is_read: false
                    }
                ]);

            if (error) throw error;

            toast({
                title: "Request Submitted Successfully",
                description: "Our recycling experts will review your request and contact you soon.",
            });
            setIsFormOpen(false);
            setFormData({
                company_name: '',
                contact_person: '',
                email: '',
                phone: '',
                metal_type: '',
                estimated_quantity: '',
                location: '',
                description: ''
            });
        } catch (error: any) {
            toast({
                title: "Submission Failed",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const recyclingProcess = [
        {
            icon: Container,
            title: "Collection & Sorting",
            description: "Strategic collection networks and advanced sensor-based sorting to categorize various metal alloys."
        },
        {
            icon: Settings,
            title: "Processing & Cleaning",
            description: "Removing contaminants and coatings through eco-friendly chemical and mechanical processes."
        },
        {
            icon: Hammer,
            title: "Shredding & Compacting",
            description: "Reducing large metal components into small, high-density pieces for efficient melting."
        },
        {
            icon: Flame,
            title: "Melting & Purification",
            description: "Energy-efficient furnace melting at precise temperatures to ensure maximum purity of the secondary metal."
        },
        {
            icon: Droplets,
            title: "Solidification",
            description: "Casting into standard industrial shapes like ingots or billets ready for remanufacturing."
        },
        {
            icon: ShieldCheck,
            title: "Quality Assurance",
            description: "Rigorous testing to ensure recycled metal meets or exceeds virgin material specifications."
        }
    ];

    const materials = [
        {
            name: "Ferrous Metals",
            desc: "Industrial steel scrap, heavy machinery parts, and structural beams.",
            recovery: 98,
            savings: 75,
            icon: Factory
        },
        {
            name: "Aluminum",
            desc: "Aerospace scrap, engine blocks, and industrial structural elements.",
            recovery: 95,
            savings: 95,
            icon: Plane
        },
        {
            name: "Copper & Brass",
            desc: "Electrical wiring, plumbing fixtures, and precision components.",
            recovery: 90,
            savings: 85,
            icon: Zap
        },
        {
            name: "Stainless Steel",
            desc: "High-grade medical, industrial, and food-grade scrap.",
            recovery: 92,
            savings: 70,
            icon: ShieldCheck
        }
    ];

    const metrics = [
        { label: "Tons Recycled Annually", value: "15,000+", icon: Container },
        { label: "Reduction in CO₂ Emissions", value: "60%", icon: Leaf },
        { label: "Energy Saved vs. Virgin", value: "85%", icon: Zap },
        { label: "Business Partners", value: "50+", icon: Users }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                {/* HERO SECTION */}
                <section className="relative min-h-[70vh] flex items-center bg-slate-950 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-40">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
                        <img
                            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=2000"
                            className="w-full h-full object-cover"
                            alt="Recycling Facility"
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 py-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-3xl"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
                                <Recycle className="w-4 h-4" />
                                Sustainability Leadership
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                                Sustainable Metal <br />
                                <span className="text-green-500">Recycling Solutions</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-12 max-w-2xl">
                                Lohakart is redefining metal recycling through innovation and technology, driving a circular economy for metals while cutting environmental impact.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white h-16 px-8 text-xl font-bold rounded-2xl shadow-2xl transition-all hover:scale-105">
                                            Request for Recycling <ArrowRight className="ml-2 h-6 w-6" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] bg-white rounded-3xl p-8 overflow-y-auto max-h-[90vh]">
                                        <DialogHeader className="mb-6">
                                            <DialogTitle className="text-3xl font-black text-slate-900 mb-2">Recycling Request</DialogTitle>
                                            <DialogDescription className="text-lg text-slate-500">
                                                Please provide your industrial scrap details. Our experts will contact you for valuation and logistics.
                                            </DialogDescription>
                                        </DialogHeader>

                                        {!user ? (
                                            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                                <AlertCircle className="w-16 h-16 text-[#be1800] mx-auto mb-4" />
                                                <h3 className="text-xl font-bold text-slate-900 mb-2">Authentication Required</h3>
                                                <p className="text-slate-500 mb-8">You must be signed in to submit a recycling request.</p>
                                                <Link to="/auth">
                                                    <Button className="bg-[#005081]">Sign In Now</Button>
                                                </Link>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700">Company Name</label>
                                                        <Input name="company_name" value={formData.company_name} onChange={handleInputChange} required className="rounded-xl border-slate-200 h-12" placeholder="e.g. Acme Steels" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700">Contact Person</label>
                                                        <Input name="contact_person" value={formData.contact_person} onChange={handleInputChange} required className="rounded-xl border-slate-200 h-12" placeholder="John Doe" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700">Business Email</label>
                                                        <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="rounded-xl border-slate-200 h-12" placeholder="john@company.com" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                                        <Input name="phone" value={formData.phone} onChange={handleInputChange} required className="rounded-xl border-slate-200 h-12" placeholder="+91 ..." />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700">Metal Type</label>
                                                        <Input name="metal_type" value={formData.metal_type} onChange={handleInputChange} required className="rounded-xl border-slate-200 h-12" placeholder="e.g. HMS, Aluminum" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700">Estimated Quantity</label>
                                                        <Input name="estimated_quantity" value={formData.estimated_quantity} onChange={handleInputChange} required className="rounded-xl border-slate-200 h-12" placeholder="e.g. 50 Tons" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Pickup Location</label>
                                                    <Input name="location" value={formData.location} onChange={handleInputChange} required className="rounded-xl border-slate-200 h-12" placeholder="City, State" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700">Description / Specifications</label>
                                                    <Textarea name="description" value={formData.description} onChange={handleInputChange} className="rounded-xl border-slate-200 min-h-[100px]" placeholder="Briefly describe the condition and type of scrap..." />
                                                </div>
                                                <Button type="submit" disabled={loading} className="w-full h-14 bg-green-600 hover:bg-green-700 rounded-xl text-lg font-bold">
                                                    {loading ? "Submitting..." : "Submit Request"}
                                                </Button>
                                            </form>
                                        )}
                                    </DialogContent>
                                </Dialog>

                                <Link to="/contact">
                                    <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 h-16 px-8 text-xl font-bold rounded-2xl backdrop-blur-md">
                                        Talk to Expert
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* RECYCLING PROCESS */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <span className="text-green-600 font-black tracking-widest text-sm uppercase mb-4 block">The Circular Path</span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">Our Recycling Process</h2>
                            <p className="text-xl text-slate-600 font-medium">
                                At LohaKart, we employ an efficient, environmentally responsible process to recycle metals and minimize waste across the industrial supply chain.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {recyclingProcess.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative group p-10 rounded-[40px] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-green-900/5"
                                >
                                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-green-600 text-xl font-black border-2 border-green-600 z-10">
                                        {idx + 1}
                                    </div>
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-white group-hover:bg-green-600 group-hover:text-white transition-colors duration-500 text-green-600">
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* MATERIALS GRID */}
                <section className="py-32 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Materials We Recycle</h2>
                            <div className="w-24 h-2 bg-green-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {materials.map((m, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-[50px] p-10 flex flex-col md:flex-row gap-10 items-center border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="w-32 h-32 rounded-3xl bg-slate-50 flex items-center justify-center text-green-600 border border-green-500/10">
                                        <m.icon className="w-16 h-16" />
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{m.name}</h3>
                                            <p className="text-slate-500 font-medium">{m.desc}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm font-black uppercase text-slate-400">
                                                    <span>Recovery Rate</span>
                                                    <span className="text-green-600">{m.recovery}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${m.recovery}%` }}
                                                        className="h-full bg-green-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm font-black uppercase text-slate-400">
                                                    <span>Energy Saved</span>
                                                    <span className="text-blue-600">{m.savings}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${m.savings}%` }}
                                                        className="h-full bg-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* IMPACT METRICS */}
                <section className="py-32 bg-white relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[100px] -z-10" />
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8">Environmental Stewardship</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {metrics.map((m, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center space-y-4"
                                >
                                    <div className="w-20 h-20 rounded-3xl bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6">
                                        <m.icon className="w-10 h-10" />
                                    </div>
                                    <h4 className="text-5xl font-black text-slate-900 tracking-tighter">{m.value}</h4>
                                    <p className="text-lg font-bold text-slate-400 uppercase tracking-widest">{m.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="py-40 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <img
                            src="https://images.unsplash.com/photo-1516383740770-fbcc5cbece03?auto=format&fit=crop&q=80&w=2000"
                            className="w-full h-full object-cover"
                            alt="Sustainability Footer"
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">
                                Ready to Transform Your <br />
                                <span className="text-green-500">Metal Waste?</span>
                            </h2>
                            <p className="text-2xl text-slate-400 mb-16 leading-relaxed">
                                Partner with LohaKart for sustainable, efficient, and profitable recycling solutions that drive your business toward a circular economy.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6">
                                <Button
                                    onClick={() => setIsFormOpen(true)}
                                    size="lg"
                                    className="bg-green-600 hover:bg-green-700 text-white min-w-[280px] h-20 text-2xl font-bold rounded-3xl shadow-2xl transition-all hover:scale-105 active:scale-95"
                                >
                                    Request for Recycling <ChevronRight className="ml-3 h-8 w-8" />
                                </Button>
                                <Link to="/contact">
                                    <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 min-w-[280px] h-20 text-2xl font-bold rounded-3xl backdrop-blur-md">
                                        Contact Team
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
