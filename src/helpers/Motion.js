import { motion } from "framer-motion";

export default function Motion (children) {
    return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
          // type: "spring",
          // damping: 10,
          // stiffness: 10,
        }}
      >
      {children}
    </motion.div>
  )}