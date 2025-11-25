"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Logo({ ariaLabel = "Logo Guido Hotel", size = 40 }: { ariaLabel?: string; size?: number }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{ y: hover ? -12 : 0, scale: hover ? 1.12 : 1, rotate: hover ? -2 : 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 10, bounce: 0.5 }}
      className="grid place-items-center"
      style={{ width: size, height: size }}
    >
      <motion.svg viewBox="0 0 512 512" width={size} height={size} role="img" aria-label={ariaLabel}>
        <path d="M256 28 28 196v244c0 18 14 32 32 32h392c18 0 32-14 32-32V196L256 28Z" fill="#d72459" />
        <motion.g
          animate={{ scaleY: hover ? 0.15 : 1, y: hover ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 12, bounce: 0.6 }}
        >
          <path
            d="M180 320c-14 0-26-10-26-26 0-24 20-44 46-44s46 20 46 44c0 6-2 12-4 18-26-18-50-16-62-8Z"
            fill="#fff"
          />
          <path
            d="M332 320c-14 0-26-10-26-26 0-24 20-44 46-44s46 20 46 44c0 6-2 12-4 18-26-18-50-16-62-8Z"
            fill="#fff"
          />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}

