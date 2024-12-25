import { useState } from "react";

const ProfileModal = ({ user, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {children ? (
        <span onClick={openModal} style={{ cursor: "pointer" }}>
          {children}
        </span>
      ) : (
        <button onClick={openModal} style={{ cursor: "pointer" }}>
          View Profile
        </button>
      )}

      {isOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{user.name}</h2>
              <button onClick={closeModal} style={styles.closeButton}>
                &times;
              </button>
            </div>
            <div style={styles.modalBody}>
              <img
                style={styles.profileImage}
                src={user.pic}
                alt={user.name}
              />
              <p style={styles.modalText}>Email: {user.email}</p>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={closeModal} style={styles.closeModalButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
//   dd   all  styles in the page 
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "500px",
    maxWidth: "90%",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  modalTitle: {
    fontSize: "24px",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
  modalBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  profileImage: {
    borderRadius: "50%",
    width: "150px",
    height: "150px",
    objectFit: "cover",
  },
  modalText: {
    fontSize: "18px",
    margin: 0,
  },
  modalFooter: {
    marginTop: "20px",
  },
  closeModalButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProfileModal;