"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function StatBar({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground w-10">{label}</span>
      <div className="h-2 rounded-full bg-muted flex-1 overflow-hidden">
        <div className="h-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] tabular-nums w-8 text-right">{value}%</span>
    </div>
  );
}

function AutoSlideDashboard() {
  const categories = [
    { label: "Food", val: 48, color: "#22C55E" },
    { label: "Travel", val: 22, color: "#0ea5e9" },
    { label: "Fun", val: 15, color: "#a855f7" },
    { label: "Bills", val: 10, color: "#f59e0b" },
    { label: "Other", val: 5, color: "#ef4444" },
  ];
  return (
    <div className="h-full w-full p-3 grid grid-rows-3 gap-2 bg-gradient-to-br from-[#f0fdf4] to-white dark:from-[#052e16] dark:to-[#0a0a0a]">
      <div className="rounded-xl p-3 bg-white/80 dark:bg-white/5 backdrop-blur border">
        <p className="text-[10px] text-muted-foreground">Total this month</p>
        <p className="text-xl font-bold">$312.74</p>
      </div>
      <div className="rounded-xl p-3 bg-white/80 dark:bg-white/5 backdrop-blur border">
        <p className="text-[10px] text-muted-foreground mb-2">Category breakdown</p>
        <div className="space-y-1">
          {categories.map((c) => (
            <StatBar key={c.label} label={c.label} value={c.val} color={c.color} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl p-3 bg-white/80 dark:bg-white/5 backdrop-blur border">
          <p className="text-[10px] text-muted-foreground">You are owed</p>
          <p className="text-lg font-semibold text-[#16a34a]">$128.50</p>
        </div>
        <div className="rounded-xl p-3 bg-white/80 dark:bg-white/5 backdrop-blur border">
          <p className="text-[10px] text-muted-foreground">You owe</p>
          <p className="text-lg font-semibold text-red-600">$36.25</p>
        </div>
      </div>
    </div>
  );
}

function AutoSlideGroups() {
  const items = ["Weekend Trip", "Office Expenses", "Project Alpha"];
  return (
    <div className="h-full w-full p-3 bg-gradient-to-br from-white to-[#f0fdf4] dark:from-[#0a0a0a] dark:to-[#052e16]">
      <div className="space-y-2">
        {items.map((name, i) => (
          <div key={name} className="flex items-center justify-between rounded-lg border p-2 hover:bg-accent/60 transition">
            <span className="text-xs font-medium">{name}</span>
            <span className={`text-xs ${i === 0 ? "text-[#16a34a]" : "text-muted-foreground"}`}>
              {i === 0 ? "+$42.10" : "$0.00"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutoSlideExpense() {
  const rows = [
    { d: "Groceries", a: 24.6 },
    { d: "Ride", a: 10.2 },
    { d: "Dinner", a: 18.4 },
  ];
  return (
    <div className="h-full w-full p-3 bg-gradient-to-br from-[#f0fdf4] to-white dark:from-[#052e16] dark:to-[#0a0a0a]">
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.d} className="flex items-center justify-between rounded-lg border p-2">
            <span className="text-xs">{r.d}</span>
            <span className="text-xs font-medium">${r.a.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-muted-foreground mt-2">Auto‑generated preview</div>
    </div>
  );
}

export default function ScreenshotCarousel() {
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const slides = [<AutoSlideDashboard key="a" />, <AutoSlideGroups key="b" />, <AutoSlideExpense key="c" />];

  const scrollToIndex = (idx) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[idx];
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
    setActive(idx);
  };

  const prev = () => scrollToIndex(Math.max(0, active - 1));
  const next = () => scrollToIndex(Math.min(slides.length - 1, active + 1));

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => {
        const n = (a + 1) % slides.length;
        scrollToIndex(n);
        return n;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-4 md:px-6 scrollbar-hide justify-center w-full mx-auto"
      >
        {slides.map((node, idx) => (
          <div
            key={idx}
            className="snap-center shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"
            style={{ scrollSnapAlign: 'center' }}
          >
            <div className="mockup-device">
              <div className="screen">
                {node}
              </div>
              <div className="notch" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          onClick={prev}
          className="h-8 w-8 inline-flex items-center justify-center rounded-full border bg-card shadow hover:shadow-md transition"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === active ? "bg-[#22C55E]" : "bg-muted"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="h-8 w-8 inline-flex items-center justify-center rounded-full border bg-card shadow hover:shadow-md transition"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}


