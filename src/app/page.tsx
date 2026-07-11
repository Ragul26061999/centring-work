"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HardHat,
  Hammer,
  Construction,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Layers,
  Wrench,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────── Parallax Image Component ─────────────────────── */
function ParallaxBackground({
  src,
  alt,
  speed = 0.3,
  overlay,
  priority = false,
}: {
  src: string;
  alt: string;
  speed?: number;
  overlay?: React.ReactNode;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The image moves from  -speed*100  →  +speed*100  as the section scrolls
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-y-1/3 inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="100vw"
        />
      </motion.div>
      {overlay}
    </div>
  );
}

/* ───────────────────────────── Main Page ───────────────────────────── */
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionIds = ["home", "materials", "services", "about", "contact"];

  /* ── Scroll listener for navbar glass effect ── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── IntersectionObserver to track active section ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "Materials", href: "materials" },
    { name: "Services", href: "services" },
    { name: "About Us", href: "about" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ══════════════════ Navigation ══════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-lg shadow-black/[0.04] py-3"
            : "bg-background/60 lg:bg-transparent lg:bg-gradient-to-b lg:from-background/80 lg:to-transparent py-4 lg:py-6 backdrop-blur-sm lg:backdrop-blur-none"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <div className="bg-primary p-2 rounded-lg text-primary-foreground">
              <Construction size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Centring<span className="text-primary">Work</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.name}
                {/* Active indicator pill */}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden lg:flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
          >
            Get a Quote
            <ArrowRight size={16} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl py-6 px-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  scrollTo(link.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-medium py-2 transition-colors ${
                  activeSection === link.href ? "text-primary" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                scrollTo("contact");
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 flex items-center justify-center gap-2 bg-foreground text-background px-5 py-3.5 rounded-xl font-bold transition-all hover:bg-foreground/90"
            >
              Get a Quote
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </nav>

      <main className="flex-grow">
        {/* ══════════════════ Hero Section (Parallax) ══════════════════ */}
        <section
          id="home"
          className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
          <ParallaxBackground
            src="/hero_background.png"
            alt="Construction Scaffolding Background"
            speed={0.25}
            priority
            overlay={
              <div className="absolute inset-0 bg-background/40 md:bg-transparent md:bg-gradient-to-r md:from-background/90 md:via-background/50 md:to-transparent dark:bg-background/60 dark:md:bg-transparent dark:md:bg-gradient-to-r dark:md:from-background/90 dark:md:via-background/60 dark:md:to-transparent z-10" />
            }
          />

          <div className="container relative z-10 mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-md">
                Build with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                  Strength
                </span>{" "}
                &amp; Confidence
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/90 font-medium mb-8 max-w-lg leading-relaxed drop-shadow-md">
                Top-tier scaffolding, formwork, and centring materials for rent.
                Reliable equipment for projects of any scale, delivered right to
                your site.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-4 w-full sm:w-auto">
                <button
                  onClick={() => scrollTo("materials")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Explore Materials
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="bg-secondary text-secondary-foreground border border-border hover:bg-muted px-8 py-4 rounded-full font-medium transition-all flex items-center gap-2"
                >
                  <Phone size={20} />
                  Call Us Now
                </button>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-foreground/60 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  ISO Certified
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  24/7 Support
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  Fast Delivery
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════ Materials Section ══════════════════ */}
        <section id="materials" className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Premium Materials Library
              </h2>
              <p className="text-foreground/70 text-lg">
                We provide an extensive range of high-grade centring and
                scaffolding equipment to ensure safety and efficiency on your
                construction site.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Material Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-slate-50 dark:bg-zinc-900/50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden shrink-0">
                  <Image
                    src="/centering_materials.png"
                    alt="Steel Scaffolding"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    <Construction className="text-primary shrink-0" size={24} />
                    Steel Scaffolding
                  </h3>
                  <p className="text-foreground/70 mb-0 line-clamp-3">
                    Heavy-duty H-frames, cross braces, and base jacks.
                    Engineered for stability and strength, perfect for high-rise
                    commercial and residential projects.
                  </p>
                </div>
              </motion.div>

              {/* Material Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group bg-slate-50 dark:bg-zinc-900/50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden shrink-0">
                  <Image
                    src="/formwork_systems.png"
                    alt="Formwork Systems"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    <Layers className="text-primary shrink-0" size={24} />
                    Formwork Systems
                  </h3>
                  <p className="text-foreground/70 mb-0 line-clamp-3">
                    Adjustable props, spans, and high-quality shuttering plywood.
                    Designed to provide flawless concrete finishing and structural
                    support.
                  </p>
                </div>
              </motion.div>

              {/* Material Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group bg-slate-50 dark:bg-zinc-900/50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden shrink-0">
                  <Image
                    src="/accessories_fittings.png"
                    alt="Accessories and Fittings"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    <Wrench className="text-primary shrink-0" size={24} />
                    Accessories &amp; Fittings
                  </h3>
                  <p className="text-foreground/70 mb-0 line-clamp-3">
                    Clamps, joint pins, tie rods, and wing nuts. Every small but
                    critical component you need to guarantee a secure, unwavering
                    structure.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════ Why Choose Us / Services ══════════════════ */}
        <section id="services" className="py-16 lg:py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Why Partner With Us?
                </h2>
                <p className="text-foreground/70 text-lg mb-8">
                  We don&apos;t just rent equipment; we provide peace of mind.
                  Our materials are rigorously tested and maintained to ensure
                  absolute safety.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Uncompromising Safety",
                      desc: "All materials undergo strict quality checks before dispatch.",
                    },
                    {
                      icon: Construction,
                      title: "Modern Inventory",
                      desc: "Latest centering and scaffolding technology for better efficiency.",
                    },
                    {
                      icon: ArrowRight,
                      title: "Prompt Delivery & Pickup",
                      desc: "We value your time. Timely logistics right to your site.",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="bg-primary/10 p-3 rounded-xl h-fit text-primary">
                        <feature.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-foreground/70">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-[3rem] overflow-hidden relative">
                  <Image
                    src="/hero_background.png"
                    alt="Construction Site"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent mix-blend-multiply" />
                </div>
                {/* Floating stats card */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-12 left-4 right-4 md:-bottom-8 md:-left-8 md:right-auto bg-background p-4 sm:p-6 rounded-2xl shadow-2xl border border-border flex items-center justify-around md:justify-start gap-3 sm:gap-6 z-20"
                >
                  <div className="text-center md:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-primary">500+</div>
                    <div className="text-xs sm:text-sm font-medium text-foreground/70 uppercase tracking-wider mt-1">
                      Projects Completed
                    </div>
                  </div>
                  <div className="w-px h-12 sm:h-16 bg-border" />
                  <div className="text-center md:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-primary">15y</div>
                    <div className="text-xs sm:text-sm font-medium text-foreground/70 uppercase tracking-wider mt-1">
                      Industry Experience
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ About Us Section (Parallax) ══════════════════ */}
        <section
          id="about"
          className="relative py-20 lg:py-32 overflow-hidden"
        >
          <ParallaxBackground
            src="/about_parallax.png"
            alt="Aerial construction site"
            speed={0.2}
            overlay={
              <div className="absolute inset-0 bg-black/60 z-10" />
            }
          />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  About CentringWork
                </h2>
                <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-8" />
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Established over 15 years ago, CentringWork has grown from a
                  local supplier into one of the region&apos;s most trusted names in
                  construction equipment rental. We understand that the
                  foundation of any great structure lies in the reliability of
                  its temporary supports, which is why we never compromise on
                  quality.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Our mission is to empower builders, contractors, and engineers
                  with the highest-grade centring materials and scaffolding. By
                  providing well-maintained, robust equipment alongside
                  exceptional customer service and timely logistics, we ensure
                  your projects stay on schedule and your workforce stays safe.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════ Contact Section ══════════════════ */}
        <section id="contact" className="py-16 lg:py-24 bg-foreground text-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Build?
                </h2>
                <p className="text-background/70 text-lg mb-10 max-w-md">
                  Get a comprehensive quote for your next project. Fill out the
                  form or reach us directly.
                </p>

                <div className="space-y-6 text-background/80">
                  <div className="flex items-center gap-4">
                    <div className="bg-background/10 p-3 rounded-full">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-background/60 mb-0.5">
                        Call Us
                      </p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-background/10 p-3 rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-background/60 mb-0.5">
                        Email Us
                      </p>
                      <p className="font-medium">rentals@centringwork.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-background/10 p-3 rounded-full">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-background/60 mb-0.5">
                        Visit Us
                      </p>
                      <p className="font-medium">
                        123 Construction Ave, BuildCity
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background text-foreground p-8 md:p-10 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Request a Quote</h3>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell us about your material requirements..."
                    />
                  </div>
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95">
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══════════════════ Footer ══════════════════ */}
      <footer className="bg-foreground text-background/60 py-12 lg:py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Construction size={28} className="text-primary" />
                <span className="font-bold text-2xl text-background tracking-tight">
                  Centring<span className="text-primary">Work</span>
                </span>
              </div>
              <p className="text-background/60 max-w-sm mb-6 leading-relaxed">
                Your trusted partner in construction material rentals. Providing
                premium scaffolding and formwork solutions that ensure safety,
                efficiency, and structural integrity.
              </p>
            </div>

            <div>
              <h4 className="text-background font-bold text-lg mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => scrollTo("home")}
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("materials")}
                    className="hover:text-primary transition-colors"
                  >
                    Materials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("services")}
                    className="hover:text-primary transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("about")}
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-background font-bold text-lg mb-6">
                Contact
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <span>123 Construction Ave, BuildCity, ST 12345</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span>rentals@centringwork.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>
              &copy; {new Date().getFullYear()} CentringWork Materials. All
              rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
