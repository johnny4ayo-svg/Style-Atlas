"use client";

import { motion, useInView, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatCounterProps {
  endValue: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ endValue, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Spring for smooth counting
  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2500
  });
  
  // Update spring when in view
  useEffect(() => {
    if (isInView) {
      springValue.set(endValue);
    }
  }, [isInView, endValue, springValue]);

  // Read spring value into state to force react render if needed, but framer-motion handles it better via motion.span
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  // Format with commas (e.g., 25000 -> 25,000)
  const formattedValue = new Intl.NumberFormat('en-US').format(displayValue);

  return (
    <motion.div 
      ref={ref}
      className="stat"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <strong>{formattedValue}{suffix}</strong>
      <span>{label}</span>
    </motion.div>
  );
}
