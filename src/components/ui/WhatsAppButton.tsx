'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { FiX } from 'react-icons/fi';
import { useDonateModal } from '@/context/DonateModalContext';

export default function WhatsAppButton() {
  const { isOpen: isDonateModalOpen } = useDonateModal();
  const [showTooltip, setShowTooltip] = useState(true);

  if (isDonateModalOpen) return null;

  const whatsappNumber = "919884935959";
  const defaultMessage = encodeURIComponent(
    "Hello Bridge of Hope! I would like to get more information about your causes and how to support."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Tooltip speech bubble on desktop */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ delay: 0.6, duration: 0.25 }}
            className="pointer-events-auto mb-2 mr-1 hidden sm:flex items-center gap-2 bg-white text-gray-800 px-3.5 py-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 max-w-xs text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
            </span>
            <span className="font-semibold text-gray-700">Chat with us on WhatsApp!</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-1 p-0.5 rounded-full"
              aria-label="Close tooltip"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Bridge of Hope"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-all duration-300"
      >
        {/* Glowing pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-pulse group-hover:opacity-50 transition-opacity" />

        <FaWhatsapp className="relative z-10 w-7 h-7" />

        {/* Small online badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </span>
      </motion.a>
    </div>
  );
}
