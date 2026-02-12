function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

export default Modal;