import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
const PROPOSAL_TARGET = "Eternity"; // Replace with your target's name
const CUSTOM_FONT = "Cinzel, serif"; 
const PRIMARY_COLOR = "linear-gradient(135deg, #00C6FF, #0072FF)";
const SECONDARY_COLOR = "#FFD700"; // Gold accent

// --- UTILITY COMPONENTS ---

interface ConfettiParticleProps {
  x: number;
  y: number;
}

// 1. Particle Effect (for the explosion)
const ConfettiParticle: React.FC<ConfettiParticleProps> = ({ x, y }) => (
  <motion.div
    initial={{ scale: 0, opacity: 1, x, y, rotate: 0 }}
    animate={{ 
      scale: [1, 0.5], 
      opacity: [1, 0], 
      x: x + Math.random() * 200 - 100, 
      y: y - 100 - Math.random() * 200, 
      rotate: Math.random() * 720 
    }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    style={{ 
      position: 'absolute', 
      width: '8px', 
      height: '8px', 
      borderRadius: '50%', 
      background: SECONDARY_COLOR, 
      boxShadow: `0 0 5px ${SECONDARY_COLOR}`
    }}
  />
);

// 2. The Main Proposal Component
const BadassProposal = () => {
  const [step, setStep] = useState(0); // 0: Start, 1: Question, 2: Accepted, 3: Denied
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

  // Triggered on 'Yes' click
  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Confetti effect on click location
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const newParticles = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      x: x - window.scrollX,
      y: y - window.scrollY,
    }));
    setParticles(newParticles);
    
    // Vibrate device for haptic feedback on acceptance (if supported)
    if (window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100, 50, 500]);
    }

    setStep(2); // Move to Accepted screen
  };

  // 'No' button logic - makes it hard to click
  const handleNoHover = () => {
    setIsHovering(true);
  };

  const handleNoClick = () => {
    setStep(3); // Move to Denied screen
  };

  // The main text content that appears in steps
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 },
  };
  
  // The 'No' button physics to make it run away
  const runningButtonVariants = {
    initial: { x: 0, y: 0 },
    run: {
      x: [0, Math.random() * 300 - 150, Math.random() * 300 - 150, 0],
      y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
      transition: { 
        type: 'spring', 
        stiffness: 500, 
        damping: 10, 
        duration: 0.5, 
        repeat: Infinity, 
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 3000); // 3-second delay for dramatic intro
      return () => clearTimeout(timer);
    }
  }, [step]);

  // --- RENDER LOGIC ---

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#1a1a2e', // Deep Space Theme
        color: '#FFFFFF',
        fontFamily: CUSTOM_FONT,
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Particle Overlay */}
      <AnimatePresence>
        {particles.map(p => (
          <ConfettiParticle key={p.id} x={p.x} y={p.y} />
        ))}
      </AnimatePresence>

      {/* Content based on step */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="intro" variants={titleVariants} initial="hidden" animate="visible" exit="hidden">
            <h1 style={{ fontSize: '3rem', letterSpacing: '0.5rem', textShadow: `0 0 10px ${SECONDARY_COLOR}` }}>
              A P R I O R I
            </h1>
            <p style={{ fontSize: '1.5rem', marginTop: '1rem', color: '#999' }}>
              The moment has arrived, {PROPOSAL_TARGET}.
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="question" variants={titleVariants} initial="hidden" animate="visible" exit="hidden" style={{ width: '90%', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '2rem', background: PRIMARY_COLOR, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: `0 0 20px rgba(0, 114, 255, 0.5)` }}>
              Will you compile my code for {PROPOSAL_TARGET}?
            </h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '4rem' }}>
              
              {/* YES Button */}
              <motion.button 
                onClick={handleAccept}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ 
                  padding: '15px 40px', 
                  fontSize: '1.5rem', 
                  borderRadius: '50px', 
                  border: 'none', 
                  cursor: 'pointer', 
                  background: PRIMARY_COLOR,
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 15px rgba(0, 114, 255, 0.5)',
                  transition: 'background 0.3s'
                }}
              >
                {"// True"}
              </motion.button>

              {/* NO Button (The Runner) */}
              <motion.button 
                onClick={handleNoClick}
                onMouseEnter={handleNoHover}
                variants={isHovering ? runningButtonVariants : {}}
                animate={isHovering ? "run" : "initial"}
                style={{
                  padding: '15px 40px', 
                  fontSize: '1.5rem', 
                  borderRadius: '50px', 
                  border: '2px solid #FF3B30', 
                  cursor: 'pointer', 
                  background: 'none',
                  color: '#FF3B30',
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px rgba(255, 59, 48, 0.3)',
                  transition: 'all 0.3s',
                  position: 'relative' // Essential for relative movement
                }}
              >
                {"// False"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="accepted" variants={titleVariants} initial="hidden" animate="visible">
            <h1 style={{ fontSize: '5rem', color: SECONDARY_COLOR, textShadow: `0 0 30px ${SECONDARY_COLOR}` }}>
              COMPILATION SUCCESSFUL.
            </h1>
            <p style={{ fontSize: '2rem', marginTop: '1.5rem' }}>
              Thank you for the privilege of your time. Now, let's ship.
            </p>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div key="denied" variants={titleVariants} initial="hidden" animate="visible">
            <h1 style={{ fontSize: '5rem', color: '#FF3B30', textShadow: `0 0 30px #FF3B30` }}>
              RUNTIME ERROR.
            </h1>
            <p style={{ fontSize: '2rem', marginTop: '1.5rem' }}>
              The universe has temporarily paused. Checking stack trace...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BadassProposal;
