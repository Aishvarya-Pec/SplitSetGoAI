"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FEATURES, STEPS, TESTIMONIALS } from "@/lib/landing";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import ScreenshotCarousel from "@/components/landing/screenshot-carousel";
import Script from "next/script";

export default function LandingPage() {
  const parallaxRef = useRef(null);
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--tx", `${x * 10}px`);
      el.style.setProperty("--ty", `${y * 10}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="flex flex-col pt-16">
      <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "SplitSetGO",
        description: "The smartest way to split expenses with friends.",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: (typeof window !== 'undefined' ? window.location.origin : 'https://splitsetgo.app')
      })}} />
      {/* ───── Hero ───── */}
      <section className="mt-20 pb-12 space-y-10 md:space-y-15 px-5">
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center space-y-6 relative"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(transparent,black_60%)]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-30 gradient"></div>
            <div className="absolute right-10 bottom-0 h-64 w-64 rounded-full blur-2xl opacity-20 bg-[#0ea5e9]"></div>
          </div>
          <Badge
            variant="outline"
            className="bg-[#f0fdf4] text-[#065f46] text-base md:text-lg lg:text-xl px-4 md:px-5 py-1.5 md:py-2 rounded-full font-semibold"
          >
            Bill? Chill.
          </Badge>

          <h1 className="gradient-title mx-auto max-w-6xl text-4xl font-bold md:text-8xl">
            The smartest way to split expenses with friends
          </h1>

          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Track shared expenses, split bills effortlessly, and settle up
            quickly. Never worry about who owes who again.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Button asChild size="lg" className="bg-[#22C55E] hover:bg-[#16a34a] shadow-md hover:shadow-lg">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#22C55E] text-[#16a34a] hover:bg-[#f0fdf4]"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="container mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-xl"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div ref={parallaxRef} className="gradient p-1 aspect-[16/9] rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 [transform:translate(var(--tx),var(--ty))] transition-transform p-2">
              <Image src="/hero.png" alt="App preview" width={1280} height={720} className="rounded-xl object-cover w-full h-full" priority />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="bg-muted py-20">
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="bg-[#f0fdf4] text-[#065f46]">
            Features
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            Everything you need to split expenses
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Our platform provides all the tools you need to handle shared
            expenses with ease.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ title, Icon, bg, color, description }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card className="flex flex-col items-center space-y-4 p-6 text-center">
                  <div className={`rounded-full p-3 ${bg} ring-1 ring-[#dcfce7]` }>
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>

                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── Screenshots Carousel ───── */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4 md:px-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gradient-title text-3xl md:text-4xl text-center mb-8">Glimpse the experience</h2>
          <ScreenshotCarousel />
        </motion.div>
      </section>

      {/* ───── How it works ───── */}
      <section id="how-it-works" className="py-20">
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="bg-[#f0fdf4] text-[#065f46]">
            How It Works
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            Splitting expenses has never been easier
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Follow these simple steps to start tracking and splitting expenses
            with friends.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map(({ label, title, description }, idx) => (
              <motion.div
                key={label}
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdf4] text-xl font-bold text-[#22C55E] ring-1 ring-[#dcfce7]">
                  {label}
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground text-center">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="bg-muted py-20">
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="bg-[#f0fdf4] text-[#065f46]">
            Testimonials
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            What our users are saying
          </h2>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, image }, idx) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card className="flex flex-col justify-between">
                  <CardContent className="space-y-4 p-6">
                    <p className="text-muted-foreground">{quote}</p>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        {/* Placeholder avatar */}
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback className="uppercase">
                          {name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-sm text-muted-foreground">{role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── Call‑to‑Action ───── */}
      <section className="py-20 gradient">
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center space-y-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">
            Ready to simplify expense sharing?
          </h2>
          <p className="mx-auto max-w-[600px] text-[#dcfce7] md:text-xl/relaxed">
            Join thousands of users who have made splitting expenses
            stress‑free.
          </p>
          <Button asChild size="lg" className="bg-white text-[#16a34a] hover:opacity-90">
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* ───── Footer ───── */}
        <footer className="border-t bg-muted py-12 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SplitSetGO. All rights reserved.
        </footer>
    </div>
  );
}
