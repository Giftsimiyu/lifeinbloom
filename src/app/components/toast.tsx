"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaLeaf } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  type: ToastType;
  title: string;
  message: string;
  icon?: React.ReactNode;
  onDismiss?: () => void;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function Toast({
  type,
  title,
  message,
  icon,
  onDismiss,
  duration = 5000,
  action,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bgGradient: "from-green-50 to-emerald-50",
          borderColor: "border-green-200",
          accentColor: "text-green-700",
          accentBg: "bg-green-100",
          accentIcon: icon || <FaCheck />,
        };
      case "error":
        return {
          bgGradient: "from-red-50 to-rose-50",
          borderColor: "border-red-200",
          accentColor: "text-red-700",
          accentBg: "bg-red-100",
          accentIcon: icon || <MdErrorOutline />,
        };
      case "info":
      default:
        return {
          bgGradient: "from-blue-50 to-cyan-50",
          borderColor: "border-blue-200",
          accentColor: "text-blue-700",
          accentBg: "bg-blue-100",
          accentIcon: icon || <FaLeaf />,
        };
    }
  };

  const styles = getStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`bg-gradient-to-r ${styles.bgGradient} border ${styles.borderColor} rounded-xl p-4 shadow-lg backdrop-blur-sm`}
          role="alert"
        >
          <div className="flex gap-4">
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full ${styles.accentBg} flex items-center justify-center ${styles.accentColor} font-display text-lg`}
            >
              {styles.accentIcon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-display text-sm font-semibold ${styles.accentColor} mb-1`}>
                {title}
              </h3>
              <p className={`font-body text-sm ${styles.accentColor} opacity-90 leading-relaxed`}>
                {message}
              </p>
            </div>

            {/* Action Button */}
            {action && (
              <div className="flex-shrink-0 ml-4">
                <button
                  onClick={action.onClick}
                  className={`font-body text-xs font-semibold ${styles.accentColor} hover:opacity-70 transition-opacity underline`}
                >
                  {action.label}
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                setIsVisible(false);
                onDismiss?.();
              }}
              className={`flex-shrink-0 ${styles.accentColor} hover:opacity-70 transition-opacity font-body text-xl`}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
