'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface DonateModalContextType {
  isOpen: boolean;
  openDonateModal: () => void;
  closeDonateModal: () => void;
}

const DonateModalContext = createContext<DonateModalContextType>({
  isOpen: false,
  openDonateModal: () => {},
  closeDonateModal: () => {},
});

export function DonateModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DonateModalContext.Provider
      value={{
        isOpen,
        openDonateModal: () => setIsOpen(true),
        closeDonateModal: () => setIsOpen(false),
      }}
    >
      {children}
    </DonateModalContext.Provider>
  );
}

export const useDonateModal = () => useContext(DonateModalContext);
