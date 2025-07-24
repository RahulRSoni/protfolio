import React from "react";

// Skeleton Screen
export function Skeleton({ className = "w-full h-6" }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${className}`} />;
}

// Spinner
export function Spinner({ size = 8, color = "border-primary" }) {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-t-transparent ${color} border-solid rounded-full animate-spin`}
      role="status"
    />
  );
}

// Progress Bar
export function ProgressBar({ progress = 50, className = "h-2" }) {
  return (
    <div className={`w-full bg-gray-200 rounded ${className}`}>
      <div
        className="bg-primary h-full rounded transition-all duration-700"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 