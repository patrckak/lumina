"use client";

import Image from "next/image";
import tipografia from "@/public/lumina-tipografia.svg";

import { motion } from "framer-motion";
export default function HomeLogo() {
  const opts = {
    hidden: { opacity: 0, z: 80 },
    visible: {
      opacity: 1,
      z: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <span className="m-auto flex flex-col gap-2 justify-center items-center text-center">
        <h1 className="text-9xl sm:text-2xl --font-inter font-bold hover:text-purple-100 text-white hover:scale-102 transition-transform transition-duration-[900ms] ease-in-out text-center">
          <Image src={tipografia} alt="Lumina Logo" width={300} height={300} />
        </h1>
        <p className="font-mono items-center  text-2xl text-white">
          Iluminação inteligente
        </p>
      </span>
    </motion.div>
  );
}
