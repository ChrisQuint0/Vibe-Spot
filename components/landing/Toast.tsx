import React from "react";

interface ToastProps {
  visible: boolean;
  message: string;
  icon: string;
}

export default function Toast({ visible, message, icon }: ToastProps) {
  return (
    <div id="toast-notification" className={visible ? "active" : ""}>
      <i className={`ti ${icon || "ti-circle-check-filled"}`}></i>
      <span>{message}</span>
    </div>
  );
}
