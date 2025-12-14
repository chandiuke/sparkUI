"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "./transition-context";

const COLUMNS = 5;
const EASE = [0.76, 0, 0.24, 1];

export function TransitionOverlay() {
  const { phase } = useTransition();

  return (
    <>
      {/* Enter animation - bars slide up from bottom */}
      <AnimatePresence>
        {phase === "entering" && (
          <div className="fixed inset-0 z-[9999] pointer-events-none flex">
            {[...Array(COLUMNS)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-b from-primary via-primary-400 to-secondary relative overflow-hidden origin-bottom"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: EASE,
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                  initial={{ y: "100%" }}
                  animate={{ y: "-100%" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.05,
                    ease: "easeInOut",
                  }}
                />

                {/* Particle dots */}
                {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      left: `${20 + j * 30}%`,
                      top: `${30 + j * 20}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + i * 0.05 + j * 0.08,
                    }}
                  />
                ))}
              </motion.div>
            ))}

            {/* Center icon - fade in */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.25, ease: "easeOut" }}
            >
              <div className="text-white text-4xl font-bold tracking-widest">
                ✦
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exit animation - bars slide up to top */}
      <AnimatePresence>
        {phase === "exiting" && (
          <div className="fixed inset-0 z-[9999] pointer-events-none flex">
            {[...Array(COLUMNS)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-b from-primary via-primary-400 to-secondary relative overflow-hidden origin-top"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: EASE,
                }}
              />
            ))}

            {/* Center icon - fade out */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
            >
              <div className="text-white text-4xl font-bold tracking-widest">
                ✦
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
