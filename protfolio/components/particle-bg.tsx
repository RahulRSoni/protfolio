import React from "react";
import { Engine, Container } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

interface ParticleBGProps {
  className?: string;
  style?: React.CSSProperties;
}

const options = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#3B82F6", "#8B5CF6"] },
    links: { enable: true, color: "#8B5CF6", opacity: 0.2 },
    move: { enable: true, speed: 1, direction: "none", outModes: "out" },
    number: { value: 40, density: { enable: true, area: 800 } },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 2, max: 4 } },
  },
  detectRetina: true,
};

const ParticleBG: React.FC<ParticleBGProps> = ({ className = "", style }) => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };
  return (
    <div className={`absolute inset-0 -z-20 pointer-events-none ${className}`} style={style}>
      <Particles id="tsparticles" init={particlesInit} options={options} />
    </div>
  );
};

export default ParticleBG; 