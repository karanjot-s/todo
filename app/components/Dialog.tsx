import { ReactNode, useEffect, useRef } from "react";

export default function Dialog({
  children,
  open,
  onClose,
  title,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog
      className="backdrop:bg-black backdrop:opacity-70 bg-green-950 rounded-md"
      ref={ref}
      onClick={(e) => {
        if (!ref.current) return;
        const dialogDimensions = ref.current.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          onClose();
        }
      }}
      style={{ maxWidth: "500px" }}
    >
      <h3 className="text-xl text-green-50 text-center mb-4">{title}</h3>
      {children}
    </dialog>
  );
}
