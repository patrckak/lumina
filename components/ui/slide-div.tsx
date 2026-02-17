import { motion, easeOut } from "framer-motion";
interface SlideProps {
  children: React.ReactNode;
  direction?: "left" | "right";
}

export default function SlideDiv({
  children,
  direction = "left",
}: Readonly<SlideProps>) {
  const slideVariants = {
    left: {
      hidden: { opacity: 0, x: -80 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: easeOut,
        },
      },
    },
    right: {
      hidden: { opacity: 0, x: 80 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: easeOut,
        },
      },
    },
  };

  return (
    <motion.div
      variants={slideVariants[direction]}
      initial="hidden"
      animate="visible"
      className="w-fit"
    >
      {children}
    </motion.div>
  );
}
