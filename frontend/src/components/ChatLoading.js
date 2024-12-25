const ChatLoading = () => {
  return (
    <div style={styles.stack}>
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} style={styles.skeleton}></div>
      ))}
    </div>
  );
};

const styles = {
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  skeleton: {
    height: "45px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    animation: "pulse 1.5s infinite",
  },
  "@keyframes pulse": {
    "0%": { backgroundColor: "#e0e0e0" },
    "50%": { backgroundColor: "#f0f0f0" },
    "100%": { backgroundColor: "#e0e0e0" },
  },
};

export default ChatLoading;