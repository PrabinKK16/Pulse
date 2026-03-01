import { useEffect } from "react";

function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`
      fixed inset-0 flex justify-center items-center z-50
      transition-opacity duration-300
      ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }
    `}
    >
      <div
        className={`
        absolute inset-0 bg-black/40
        transition-all duration-300
        ${open ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      <div
        className={`
        relative w-full max-w-md bg-white z-10
         dark:bg-gray-800 shadow-xl p-6 rounded-xl
         transition-all duration-300
         ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"}
         `}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
