import React from "react";
import { motion, useCycle } from "framer-motion";

const blobPaths = [
  // Path 1
  "M44.8,-67.2C57.2,-59.2,65.6,-44.8,68.8,-29.6C72,-14.4,70.1,1.6,64.8,16.8C59.5,32,50.8,46.4,38.4,54.4C26,62.4,10,64,-5.6,66.4C-21.2,68.8,-42.4,72,-54.4,62.4C-66.4,52.8,-69.2,30.4,-68.8,10.4C-68.4,-9.6,-64.8,-27.2,-55.2,-36.8C-45.6,-46.4,-30,-48,-15.2,-56.8C-0.4,-65.6,13.6,-81.6,27.2,-81.6C40.8,-81.6,32.4,-75.2,44.8,-67.2Z",
  // Path 2
  "M54.4,-62.4C68.8,-54.4,75.2,-34.4,74.4,-16.8C73.6,0.8,65.6,16,56.8,29.6C48,43.2,38.4,55.2,25.6,62.4C12.8,69.6,-3.2,72,-18.4,68.8C-33.6,65.6,-48,56.8,-56.8,44C-65.6,31.2,-68.8,14.4,-66.4,-1.6C-64,-17.6,-56,-33.6,-44.8,-41.6C-33.6,-49.6,-19.2,-49.6,-4.8,-54.4C9.6,-59.2,19.2,-68.8,32.8,-71.2C46.4,-73.6,40,-70.4,54.4,-62.4Z"
];

interface MorphingBlobProps {
  color?: string;
  size?: number;
  className?: string;
}

const MorphingBlob: React.FC<MorphingBlobProps> = ({ color = "#8B5CF6", size = 240, className = "" }) => {
  const [current, cycle] = useCycle(0, 1);
  React.useEffect(() => {
    const interval = setInterval(() => cycle(), 4000);
    return () => clearInterval(interval);
  }, [cycle]);
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-90 -90 180 180"
      className={className}
      style={{ filter: "blur(8px)", opacity: 0.5 }}
      aria-hidden="true"
    >
      <motion.path
        d={blobPaths[current]}
        fill={color}
        animate={{ d: blobPaths[current] }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

export default MorphingBlob; 