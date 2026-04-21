import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, FormEvent } from "react";
import { 
  Phone, Mail, MapPin, Activity, CheckCircle, Clock, 
  ShieldCheck, ArrowRight, Menu, X, Droplets, Stethoscope, 
  Dna, XCircle, Home, Star, HeartPulse, Microscope
} from "lucide-react";
import axios from "axios";
import { cn } from "./lib/utils";
import { packages, PackageOffer } from "./packagesData";

// --- Loading Screen ---

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative">
        {/* Glowing Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-48 h-48 border-4 border-accent-red/20 border-t-accent-red rounded-full -m-6"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-56 h-56 border-2 border-white/5 border-b-white/20 rounded-full -m-10"
        />
        
        {/* Central Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-36 h-36 bg-white rounded-full p-4 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center relative z-10"
        >
          <img 
            src="/logo.png" 
            alt="Loading..." 
            className="w-full h-full object-contain" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-white font-black tracking-[8px] uppercase text-xs mb-2">Sriram Clinical Lab</h2>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-accent-red rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Components ---

const Navbar = ({ onHome }: { onHome: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-5">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 flex items-center justify-center cursor-pointer drop-shadow-xl"
            onClick={onHome}
          >
            <img src="/logo.png" alt="Sriram Lab Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="hidden md:block cursor-pointer" onClick={onHome}>
            <h1 className="text-2xl font-black tracking-tighter text-navy leading-none">
              SRIRAM <span className="text-accent-red">LAB</span>
            </h1>
            <p className="text-[10px] uppercase font-black text-slate-500 mt-1 tracking-[4px]">Advanced Diagnostics</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-10 items-center font-bold text-xs tracking-widest text-navy uppercase">
          <button onClick={onHome} className="hover:text-accent-red transition-colors">Home</button>
          <a href="#services" className="hover:text-accent-red transition-colors">Services</a>
          <a href="#packages" className="hover:text-accent-red transition-colors">Packages</a>
          <a href="#contact" className="hover:text-accent-red transition-colors">Contact</a>
          <a href="#book" className="bg-accent-red text-white px-6 py-2.5 rounded-full hover:bg-navy transition-all shadow-lg shadow-accent-red/20 uppercase tracking-widest text-[10px]">
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-navy"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 text-center font-bold text-sm tracking-widest text-navy uppercase lg:hidden"
          >
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#packages" onClick={() => setIsMobileMenuOpen(false)}>Packages</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <a href="#book" onClick={() => setIsMobileMenuOpen(false)} className="bg-accent-red text-white py-4 rounded-xl">Book Appointment</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent-red/5 rounded-full blur-[100px] -mr-[10vw] -mt-[10vw]" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-navy/5 rounded-full blur-[100px] -ml-[5vw] -mb-[5vw]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl p-2 flex items-center justify-center">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <span className="inline-block py-1 px-4 rounded-full bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px] font-black uppercase tracking-[4px]">
              Chromepet's Finest Since 1999
            </span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-display leading-[0.9] text-navy font-black tracking-tighter">
            ACCURATE<br />
            <span className="text-accent-red uppercase">Diagnostics</span><br />
            FOR HEALTH.
          </h1>
          <p className="mt-8 text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
            Sriram Clinical Lab provides a luxury diagnostic experience in Chennai. From daily tests to advanced genetic screening, we ensure precision with world-class technology.
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
            <a href="#book" className="bg-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-accent-red transition-all shadow-2xl flex items-center gap-3 group">
              Book Home Pickup <ArrowRight className="group-hover:translate-x-2 transition" />
            </a>
            <a href="tel:9841323800" className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full border-2 border-navy flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Emergency Call</p>
                <p className="text-xl font-bold text-navy tracking-tight">98413 23800</p>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white/50">
            <img 
              src="https://images.unsplash.com/photo-1579152276503-317f22312d4d?auto=format&fit=crop&q=80&w=1000" 
              alt="Diagnostic Lab"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Stats Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 z-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <ShieldCheck size={32} />
              </div>
              <div>
                <p className="text-3xl font-black text-navy">100%</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Accurate Reports</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute top-10 -left-10 bg-accent-red p-6 rounded-[2rem] shadow-2xl text-white z-20"
          >
            <p className="text-2xl font-black italic">Thyrocare</p>
            <p className="text-[10px] font-bold tracking-widest uppercase">Certified Partner</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = ({ onDetail }: { onDetail: (name: string) => void }) => {
  const servicesData = [
    { 
      title: "Blood Analysis", 
      icon: <Droplets size={32} />, 
      desc: "Complete panel including Biochemistry, Hematology, and Specialized profiles.",
      color: "text-accent-red",
      bg: "bg-accent-red/5"
    },
    { 
      title: "Imaging & X-Ray", 
      icon: <Activity size={32} />, 
      desc: "Digital X-Ray, ECG, Doppler, and high-frequency Ultrasound available.",
      color: "text-blue-600",
      bg: "bg-blue-600/5"
    },
    { 
      title: "Genetic Testing", 
      icon: <Dna size={32} />, 
      desc: "Elite DNA screening for hereditary markers and personalized healthcare.",
      color: "text-navy",
      bg: "bg-navy/5"
    },
    { 
      title: "Corporate Health", 
      icon: <Stethoscope size={32} />, 
      desc: "Dedicated onsite checkups and specialized industrial wellness programs.",
      color: "text-green-600",
      bg: "bg-green-600/5"
    },
    { 
      title: "Home Sample", 
      icon: <Home size={32} />, 
      desc: "Safe and hygienic doorstep collection by expert phlebotomists.",
      color: "text-orange-500",
      bg: "bg-orange-500/5"
    },
    { 
      title: "Wellness Panels", 
      icon: <HeartPulse size={32} />, 
      desc: "Comprehensive packages covering Vitamins, Organ profiles, and more.",
      color: "text-purple-600",
      bg: "bg-purple-600/5"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-accent-red font-black uppercase tracking-[5px] text-xs mb-4">Our Expertise</h2>
            <h3 className="text-5xl font-display font-black text-navy leading-tight uppercase tracking-tighter">
              Advanced <span className="text-accent-red font-black text-6xl italic luxury-text-gradient uppercase tracking-tighter">Science</span> for Your Service.
            </h3>
          </div>
          <p className="mt-8 lg:mt-0 text-slate-500 font-medium max-w-sm">
            We combine high-end technology with local empathy to provide diagnostic excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[3rem] border border-slate-100 bg-white hover:border-accent-red transition-all duration-500 hover:shadow-2xl hover:shadow-accent-red/5"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110", s.bg, s.color)}>
                {s.icon}
              </div>
              <h4 className="text-2xl font-bold text-navy mb-4">{s.title}</h4>
              <p className="text-slate-500 leading-relaxed font-medium mb-8">{s.desc}</p>
              <button 
                onClick={() => onDetail(s.title)}
                className="text-accent-red flex items-center gap-2 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-all"
              >
                Learn More <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Packages = ({ onSelect }: { onSelect: (name: string) => void }) => {
  return (
    <section id="packages" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[50%] bg-white/50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-accent-red font-black uppercase tracking-[5px] text-xs mb-4">Partnered With Thyrocare</h2>
          <h3 className="text-5xl font-display font-black text-navy uppercase tracking-tight">Curated Health Packages</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between hover:border-accent-red transition-all group shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-navy/5 text-navy text-[8px] font-black uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold text-navy mb-2 leading-tight">{pkg.name}</h4>
                <p className="text-[10px] font-black text-accent-red mb-6 uppercase tracking-widest italic">{pkg.testsCount} Comprehensive Tests</p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-black text-navy tracking-tighter">₹{pkg.discountedPrice}</span>
                  <span className="text-slate-400 line-through text-sm font-bold">₹{pkg.originalPrice}</span>
                  <span className="ml-auto text-green-600 font-black text-[10px] uppercase">{pkg.discount}</span>
                </div>
                <button 
                  onClick={() => onSelect(pkg.name)}
                  className="w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[2px] transition-all bg-navy text-white group-hover:bg-accent-red"
                >
                  Book Package
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppointmentForm = ({ selectedTest }: { selectedTest?: string }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", testType: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (selectedTest) {
      setFormData(prev => ({ ...prev, testType: selectedTest }));
    }
  }, [selectedTest]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const response = await axios.post("/api/book-appointment", formData);
      if (response.data.status === "Sent") {
        setStatus("success");
        
        // WhatsApp Redirect implementation
        const msg = `*NEW BOOKING: SRIRAM LAB*\n--------------------------\n*Package:* ${formData.testType}\n*Patient:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Date:* ${formData.date}\n--------------------------\n_Please confirm the availability._`;
        
        setTimeout(() => {
          window.open(`https://wa.me/919841323800?text=${encodeURIComponent(msg)}`);
        }, 1500);

        setFormData({ name: "", phone: "", email: "", testType: "", date: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="py-32 bg-navy relative overflow-hidden px-6">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent-red/10 rounded-full blur-[100px]" />
      
      <div className="max-w-6xl mx-auto bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 border-8 border-white/20">
        <div className="lg:w-2/5 bg-accent-red p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
          <div className="relative z-10">
            <h2 className="text-5xl font-black tracking-tighter mb-8 leading-none">Luxury Healthcare,<br />Just a Click Away.</h2>
            <p className="text-slate-100 font-medium opacity-80 leading-relaxed mb-12">
              Fill out your details and our team will get in touch via WhatsApp for confirmation.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Phone size={18} /></div>
                <p className="font-bold">98413 23800</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Clock size={18} /></div>
                <p className="font-bold">Home Pickup: 7 AM - 9 PM</p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-[10px] font-black uppercase tracking-[3px] border-t border-white/20 pt-8 opacity-50">
            Automated SMS & WhatsApp Confirmation Included
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:w-3/5 p-16 flex flex-col gap-6 bg-white self-center">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Patient Name</label>
              <input 
                required
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-4 ring-accent-red/10 border-none font-bold text-navy placeholder:text-slate-300"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">WhatsApp Number</label>
              <input 
                required
                type="tel" 
                placeholder="Phone Number" 
                className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-4 ring-accent-red/10 border-none font-bold text-navy"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="patient@example.com" 
              className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-4 ring-accent-red/10 border-none font-bold text-navy"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Select Test Category</label>
              <select 
                className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-4 ring-accent-red/10 border-none font-bold text-navy appearance-none"
                value={formData.testType}
                onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
              >
                <option value="">Choose a Service</option>
                <option>Blood Test At Home</option>
                <option>Executive Full Body (127 Tests)</option>
                <option>X-Ray / Scan Slot</option>
                <option>Genetic Testing Profile</option>
                <option>Aarogyam Basic</option>
                <option>Senior Citizen Profile</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Preferred Date</label>
              <input 
                required
                type="date" 
                className="w-full bg-slate-100 p-5 rounded-2xl outline-none focus:ring-4 ring-accent-red/10 border-none font-bold text-navy"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className={cn(
              "w-full py-6 rounded-2xl font-black text-xl tracking-tighter shadow-2xl transition-all duration-300 mt-4",
              loading ? "bg-slate-200 text-slate-400" : "bg-navy text-white hover:bg-accent-red hover:scale-[1.02]"
            )}
          >
            {loading ? "PROCESSING..." : "CONFIRM BOOKING"}
          </button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 text-green-600 font-bold bg-green-50 p-4 rounded-2xl"
              >
                <CheckCircle size={20} /> Appointment Sent Successfully! Redirecting to WhatsApp...
              </motion.div>
            )}
            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 text-accent-red font-bold bg-red-50 p-4 rounded-2xl"
              >
                <XCircle size={20} /> Failed to send. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-12">
          <div>
            <h2 className="text-accent-red font-black uppercase tracking-[5px] text-xs mb-4">Location</h2>
            <h3 className="text-4xl font-display font-black text-navy uppercase tracking-tight">Find Us in Chennai</h3>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-navy flex-shrink-0"><MapPin size={24} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Our Address</p>
                <p className="text-lg font-bold text-navy leading-tight">No.77A, Naidu Shop Road, Near Radha Nagar Police Booth, Chromepet, Chennai - 600044</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-navy flex-shrink-0"><Phone size={24} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Contact Numbers</p>
                <p className="text-lg font-bold text-navy leading-tight">044-33265562 <br /> 98413 23800</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 border-8 border-surface">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.751284561!2d80.1444!3d12.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f0000000000%3A0x0000000000000000!2sChromepet%2C%20Chennai!5e0!3m2!1sen!2sin!4v1620000000000" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-32 pb-16 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[linear-gradient(to_top,rgba(0,0,0,0.2)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden shadow-lg p-2">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tighter">SRIRAM <span className="text-accent-red">LAB</span></h3>
                <p className="text-[10px] font-black uppercase tracking-[3px] text-slate-500">Excellence in Chennai</p>
              </div>
            </div>
            <p className="text-slate-400 font-medium text-lg max-w-sm mb-12">
              Leading diagnostic center in Chromepet providing accurate results for over two decades. Your health, our commitment.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-red transition-all">
                <Activity size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-red transition-all">
                <ShieldCheck size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-red transition-all">
                <Droplets size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-accent-red font-black text-[10px] uppercase tracking-[5px] mb-8">Quick Links</h4>
            <ul className="space-y-4 font-bold text-slate-300">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#packages" className="hover:text-white transition">Thyrocare Packages</a></li>
              <li><a href="#book" className="hover:text-white transition">Book Appointment</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-luxury-red font-black text-[10px] uppercase tracking-[5px] mb-8">Operational Hours</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Monday - Saturday</p>
                <p className="text-xl font-bold">7:00 AM - 9:00 PM</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Sunday</p>
                <p className="text-xl font-bold">7:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[3px]">© 2026 Sriram Clinical Lab. All rights reserved.</p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#">Privacy Policy</a>
            <a href="#">Compliance</a>
            <a href="#">Report Issue</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Detail Page Content ---

const serviceDetails = {
  "Blood Analysis": {
    description: "Our state-of-the-art blood analysis unit provides comprehensive insights into your health. We use robotic automation for zero-error processing.",
    testing: [
      "Complete Hemogram (30 parameters)",
      "Biochemistry Profiles (Kidney, Liver, Heart)",
      "Hormonal Assays (Thyroid, Fertility)",
      "Infection Screening (Hepatitis, HIV, Malaria)",
      "Immune System Analysis"
    ],
    offers: ["Executive Full Body (₹1579)", "Aarogyam Basic (₹999)", "Health Check with Vitamins (₹1699)"]
  },
  "Imaging & X-Ray": {
    description: "Advanced digital imaging with low-radiation technology and high-frequency ultrasound for crystal clear diagnostics.",
    testing: [
      "Digital X-Ray (All projections)",
      "12-Lead ECG / EKG",
      "Color Doppler Ultrasound",
      "Cardiac Stress Monitoring",
      "Specialized Pregnancy Scans"
    ],
    offers: ["Aarogyam Advanced (₹1589)", "Senior Citizen Profile (₹2399)"]
  },
  "Genetic Testing": {
    description: "Unlock the secrets of your DNA. Elite genetic screening to predict health risks and personalize your wellness journey.",
    testing: [
      "Hereditary Cancer Markers",
      "Carrier Screening for Couples",
      "Pharmacogenomics (Drug Response)",
      "Nutrigenomics (Diet Mapping)",
      "Fitness & Skin DNA Panels"
    ],
    offers: ["Aarogyam Tax Saver Advanced (₹4379)", "Aarogyam 1+1 Dual Offer (₹2998)"]
  },
  "Corporate Health": {
    description: "Tailored wellness programs for organizations. We conduct onsite screenings and comprehensive industrial health audits.",
    testing: [
      "Pre-employment Checkups",
      "Annual Health Audits",
      "Onsite Phlebotomy Service",
      "Stress & Lifestyle Counseling",
      "Occupational Health Panels"
    ],
    offers: ["Executive Full Body (Bulks available)", "Aarogyam Basic Corporate Pack"]
  },
  "Home Sample": {
    description: "Luxury health care at your doorstep. Safe, hygienic, and convenient collection by senior phlebotomists.",
    testing: [
      "Priority Slot Booking",
      "Temperature-controlled logistics",
      "All Blood & Urine profiles",
      "Immediate Digital Reports",
      "Senior Citizen Care Focus"
    ],
    offers: ["FREE Home Collection on all packages above ₹1000"]
  },
  "Wellness Panels": {
    description: "Holistic wellness screening covering vitamins, metabolic markers, and organ functions for a complete health overview.",
    testing: [
      "Vit B12 / Vit D3 screening",
      "Diabetes Management Panel",
      "Obesity & Metabolic Risk",
      "Iron Deficiency Profile",
      "Liver & Kidney Wellness"
    ],
    offers: ["Extensive vitamins (₹2679)", "Aarogyam Basic (₹999)"]
  }
};

const ServiceDetailPage = ({ serviceName, onBack }: { serviceName: string, onBack: () => void }) => {
  const detail = serviceDetails[serviceName as keyof typeof serviceDetails];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-surface pt-32 pb-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-navy font-black text-xs uppercase tracking-widest mb-12 hover:text-accent-red transition-all group"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-2 transition" /> Back to Home
        </button>

        <div className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl border border-slate-100">
          <h1 className="text-5xl lg:text-7xl font-display font-black text-navy mb-8 uppercase tracking-tighter">
            {serviceName}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium mb-16">
            {detail?.description}
          </p>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-accent-red font-black text-xs uppercase tracking-[4px] mb-8">Testing Included</h2>
              <ul className="space-y-6">
                {detail?.testing.map((test, i) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex items-center gap-4 text-navy font-bold text-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-red" /> {test}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-navy/5 rounded-[3rem] p-10">
              <h2 className="text-navy font-black text-xs uppercase tracking-[4px] mb-8">Special Offers</h2>
              <ul className="space-y-6">
                {detail?.offers.map((offer, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="font-bold text-navy leading-tight">{offer}</p>
                  </li>
                ))}
              </ul>
              <a href="#book" onClick={onBack} className="mt-12 block w-full py-5 bg-accent-red text-white text-center rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-navy transition-all shadow-xl shadow-accent-red/20">
                Book This Service Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState<string | undefined>();
  const [currentService, setCurrentService] = useState<string | null>(null);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePackageSelect = (name: string) => {
    setSelectedTest(name);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans antialiased">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <Navbar onHome={() => setCurrentService(null)} />
      <AnimatePresence mode="wait">
        {currentService ? (
          <ServiceDetailPage 
            serviceName={currentService} 
            onBack={() => setCurrentService(null)} 
          />
        ) : (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero />
            <Services onDetail={setCurrentService} />
            <Packages onSelect={handlePackageSelect} />
            <AppointmentForm selectedTest={selectedTest} />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
