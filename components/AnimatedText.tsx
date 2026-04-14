"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function AnimatedText({ text, className = "", as: Component = "span" }: AnimatedTextProps) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Component className={className}>{text}</Component>;
  }

  // We use the language as the key so Framer Motion knows when to swap the elements
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={language}
        initial={{ opacity: 0, filter: "blur(4px)", y: 2 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(4px)", y: -2 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`inline-block ${className}`}
      >
        <Component className={className}>
          {text}
        </Component>
      </motion.span>
    </AnimatePresence>
  );
}
