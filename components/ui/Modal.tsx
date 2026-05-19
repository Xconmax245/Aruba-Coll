import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ocean/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-cream p-8 border border-ocean/10 shadow-xl rounded z-10 max-h-[90vh] overflow-y-auto">
        {title && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl uppercase tracking-widest text-ocean">{title}</h2>
            <button onClick={onClose} className="text-ocean/60 hover:text-ocean text-lg font-sans">
              &times;
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
