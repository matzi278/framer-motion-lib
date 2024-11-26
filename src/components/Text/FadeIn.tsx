"use client";

import { motion, useInView } from "motion/react";
import React from "react";
import { useRef } from "react";

interface FadeInTextProps {
  children: React.ReactNode;
  className?: string;
  options?: {
    once?: boolean;
    staggerChildren?: number;
    height?: number;
    margin?: number;
  };
}

export const FadeInText = ({ children, options, className }: FadeInTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once || true,
    // @ts-ignore
    margin: `-${options?.margin || 20}% 0px -${options?.margin || 20}% 0px`,
  });

  const textVariants = {
    hidden: { opacity: 0, y: (options?.height ?? 80) * 1.1 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  const wrapperVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: options?.staggerChildren || 0.02 } },
  };

  const words = React.Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(" ");
    }
    return child;
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={wrapperVariants}
      className={`flex flex-wrap ${className}`}
    >
      {words?.map((word, index) => (
        <span key={index} className="flex overflow-hidden">
          <motion.div variants={textVariants}>{word}</motion.div>
          <span className="mr-1" />
        </span>
      ))}
    </motion.div>
  );
};

export default FadeInText;
