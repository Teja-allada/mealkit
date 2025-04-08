import { motion } from "framer-motion";
import { animations, colors, decorativeElements } from "@/styles/theme";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient blobs */}
      <motion.div
        {...animations.decorativeBlob}
        className="absolute top-20 right-10 w-32 h-32 rounded-full"
        style={{ background: `linear-gradient(45deg, ${colors.primary.light}, ${colors.secondary.light})`, opacity: 0.1 }}
      />
      <motion.div
        {...animations.decorativeBlob}
        transition={{ delay: 1 }}
        className="absolute bottom-40 left-10 w-40 h-40 rounded-full"
        style={{ background: `linear-gradient(-45deg, ${colors.secondary.light}, ${colors.accent.light})`, opacity: 0.1 }}
      />

      {/* Floating spices */}
      <div className="absolute inset-0">
        {decorativeElements.spices.map((spice, index) => (
          <motion.div
            key={index}
            {...animations.float}
            transition={{ delay: spice.delay }}
            className="absolute text-2xl"
            style={{
              top: `${20 + index * 15}%`,
              left: `${5 + index * 25}%`,
              opacity: 0.5,
            }}
          >
            {spice.icon}
          </motion.div>
        ))}
      </div>

      {/* Floating utensils */}
      <div className="absolute inset-0">
        {decorativeElements.utensils.map((utensil, index) => (
          <motion.div
            key={index}
            {...animations.float}
            transition={{ delay: utensil.delay }}
            className="absolute text-2xl"
            style={{
              top: `${40 + index * 20}%`,
              right: `${10 + index * 20}%`,
              opacity: 0.5,
            }}
          >
            {utensil.icon}
          </motion.div>
        ))}
      </div>

      {/* Decorative circles */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            {...animations.spin}
            className="absolute w-40 h-40 rounded-full border-2 border-dashed"
            style={{
              borderColor: index % 2 === 0 ? colors.primary.light : colors.secondary.light,
              opacity: 0.1,
              top: `${10 + index * 20}%`,
              left: `${5 + index * 20}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
} 