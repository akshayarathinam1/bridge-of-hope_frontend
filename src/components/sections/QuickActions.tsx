'use client';

import { motion } from "framer-motion";
import { FiUserPlus, FiTrendingUp, FiGift } from "react-icons/fi";

const actions = [
  {
    icon: FiUserPlus,
    title: "Become a Volunteer",
    description:
      "Alone I can do little. Together, we can do anything. Join our growing family of change-makers.",
    color: "bg-brand-navy/10",
    iconColor: "text-brand-navy",
    border: "border-brand-navy/20",
  },
  {
    icon: FiTrendingUp,
    title: "Quick Fundraising",
    description:
      "Start a fundraiser for a cause you care about. Every rupee raised brings us closer to our goal.",
    color: "bg-orange-50",
    iconColor: "text-brand-orange",
    border: "border-orange-100",
  },
  {
    icon: FiGift,
    title: "Start Donating",
    description:
      "Your donation, however small, changes a life. Donate once or set up a monthly giving plan.",
    color: "bg-red-50",
    iconColor: "text-brand-red",
    border: "border-red-100",
  },
];

export default function QuickActions() {
  return (
    <section id="quick-actions" className="py-0 relative z-10 -mt-1">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
          {actions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-7 flex items-start gap-4 hover:bg-gray-50 transition-colors group"
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl ${action.color} ${action.border} border flex items-center justify-center`}
              >
                <action.icon
                  className={`w-5 h-5 ${action.iconColor}`}
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-black mb-1.5 group-hover:text-brand-red transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
