import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";

const ComputersCanvas = lazy(() => import("../components/canvas/Computers"));


const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cek ukuran layar saat component pertama kali di-mount
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Anggap mobile jika <768px
    };

    checkScreenSize(); // Panggil saat pertama kali
    window.addEventListener("resize", checkScreenSize); // Perbarui saat resize

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Alpha</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I Develop 3D user <br className="sm:block hidden" /> interfaces and web applications
          </p>
        </div>
      </div>

      {/* Tampilkan 3D Canvas hanya jika bukan di mobile */}
      {!isMobile ? (
        <Suspense fallback={<div className="text-white text-center mt-10">Loading 3D Model...</div>}>
          <ComputersCanvas />
        </Suspense>
      ) : (
        <div className="text-center text-white mt-10">[Placeholder for mobile]</div>
      )}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
