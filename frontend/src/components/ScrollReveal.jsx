import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * ScrollReveal — animate children into view as they enter the viewport.
 *
 * Props:
 *   children   — content to animate
 *   delay      — animation delay in seconds (default 0)
 *   duration   — animation duration in seconds (default 0.55)
 *   y          — starting Y offset in px (default 30)
 *   className  — optional class
 *   once       — only animate once (default true)
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.55,
  y = 30,
  className = "",
  once = true,
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
