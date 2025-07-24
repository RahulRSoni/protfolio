import React from "react";
import Lottie from "lottie-react";

interface LottieAnimProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LottieAnim: React.FC<LottieAnimProps> = ({ animationData, loop = true, autoplay = true, className = "", style }) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
};

export default LottieAnim;

// Usage:
// <LottieAnim animationData={require('../public/your-lottie.json')} className="w-40 h-40" /> 