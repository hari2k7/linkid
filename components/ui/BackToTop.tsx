"use client";
 
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
 
/**
 * BackToTop — Floating "Back to Top" button for LinkID
 *
 * Usage:
 *   1. Drop this file into `app/components/BackToTop.tsx`
 *   2. Import and render it once in `app/layout.tsx`:
 *
 *      import BackToTop from "@/app/components/BackToTop";
 *      ...
 *      <BackToTop />
 *
 * Props (all optional):
 *   threshold  — px scrolled before button appears (default: 300)
 *   scrollTo   — target scroll position in px       (default: 0)
 */
 
interface BackToTopProps {
  threshold?: number;
  scrollTo?: number;
}
 
export default function BackToTop({
  threshold = 300,
  scrollTo = 0,
}: BackToTopProps) {
  const [visible, setVisible] = useState<boolean>(false);
 
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);
 
  const handleClick = () => {
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  };
 
  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
      className={[
        // Position — fixed bottom-right
        "fixed bottom-6 right-6 z-50",
        // Size & shape
        "h-10 w-10 rounded-full",
        // Colours — matches LinkID dark/light theme via CSS vars
        "bg-primary text-primary-foreground",
        "border border-border",
        // Shadow
        "shadow-md",
        // Hover
        "hover:opacity-90 hover:shadow-lg",
        // Focus ring (keyboard accessible)
        "focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background",
        // Active press
        "active:scale-95",
        // Flex centre
        "flex items-center justify-center",
        // Show / hide animation
        "transition-all duration-300 ease-in-out",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}