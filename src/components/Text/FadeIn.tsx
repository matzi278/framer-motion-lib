import React from 'react';
import { motion } from 'motion/react';

const FadeInText = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    Hello, Framer Motion!
  </motion.div>
);

export default FadeInText;