import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-header text-header-foreground"
      style={{ background: "var(--gradient-header)" }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative z-10 px-6 py-12 md:py-16 text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br from-accent to-accent/80 p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-header flex items-center justify-center text-4xl font-display font-bold text-accent">
              CK
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3"
        >
          Can Kurt
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl text-header-foreground/70 mb-6 font-medium"
        >
          Passioneret indenfor IT og Virksomhed
        </motion.p>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm md:text-base"
        >
          <span className="flex items-center gap-2 text-header-foreground/60">
            <MapPin className="w-4 h-4" />
            Copenhagen, Denmark
          </span>
          
          <a
            href="tel:+4528701213"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <Phone className="w-4 h-4" />
            +45 28 70 12 13
          </a>
          
          <a
            href="mailto:cankurtcvr@gmail.com"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          
          <a
            href="https://linkedin.com/in/canxkurt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
