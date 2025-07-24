import React, { useRef, useState, ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from "react";

// 1. Button Ripple Effect
interface Ripple {
  x: number;
  y: number;
  size: number;
  key: number;
}
interface ButtonRippleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
export const ButtonRipple: React.FC<ButtonRippleProps> = ({ children, className = "", ...props }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = btnRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple: Ripple = { x, y, size, key: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => setRipples((prev) => prev.slice(1)), 500);
  };

  return (
    <button
      ref={btnRef}
      className={`relative overflow-hidden ${className}`}
      onClick={createRipple}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className="absolute bg-white/40 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
};

// 2. Field Focus Animation
interface FieldFocusProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export const FieldFocus: React.FC<FieldFocusProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`transition-all border-2 border-gray-300 focus:border-primary focus:shadow-lg focus:outline-none ${className}`}
      {...props}
    />
  );
};

// 3. Menu Slide Transition
interface MenuSlideProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}
export const MenuSlide: React.FC<MenuSlideProps> = ({ open, children, className = "" }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// 4. Tooltip
interface TooltipProps {
  children: ReactNode;
  text: string;
}
export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-dark text-white text-xs rounded shadow-lg opacity-0 animate-fade-in z-50 whitespace-nowrap">
          {text}
        </span>
      )}
    </span>
  );
};

// 5. Modal Fade
interface ModalFadeProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}
export const ModalFade: React.FC<ModalFadeProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-8 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-dark" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

// Add fade-in animation to globals.css:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 0.3s ease; }
// .animate-ripple { animation: ripple 0.5s linear; }
// @keyframes ripple { to { opacity: 0; transform: scale(2); } } 