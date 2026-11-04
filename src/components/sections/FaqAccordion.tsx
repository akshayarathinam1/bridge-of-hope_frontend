'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import type { FAQ } from "@/types/api";

export default function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.id ?? faq.question}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
              isOpen
                ? "border-brand-red shadow-md"
                : "border-gray-200/80 hover:border-gray-300"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full text-left p-4 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 font-bold text-sm sm:text-lg text-brand-black"
            >
              <span className={isOpen ? "text-brand-red" : ""}>
                {faq.question}
              </span>
              <FiChevronDown
                className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-brand-red" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
