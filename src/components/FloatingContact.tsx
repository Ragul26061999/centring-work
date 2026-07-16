"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Smartphone, X, MessageSquareText } from "lucide-react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "917904138705";
  const displayPhone = "7904138705";
  const whatsappMessage = encodeURIComponent("Hello Om Dealer, I would like to inquire about centering materials.");

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3"
          >
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform"
            >
              <span className="font-bold">WhatsApp</span>
              <MessageCircle size={22} fill="white" />
            </a>
            
            {/* SMS Message */}
            <a
              href={`sms:+91${displayPhone}?body=${whatsappMessage}`}
              className="flex items-center justify-end gap-3 bg-[#0a84ff] text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgba(10,132,255,0.4)] hover:scale-105 transition-transform"
            >
              <span className="font-bold">Message</span>
              <MessageSquareText size={22} fill="white" />
            </a>

            {/* Phone Call */}
            <a
              href={`tel:+91${displayPhone}`}
              className="flex items-center justify-end gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <span className="font-bold">Call Us</span>
              <Phone size={22} fill="currentColor" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#846437] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-4 border-[#846437]/30"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} fill="currentColor" />}
      </button>
    </div>
  );
}
