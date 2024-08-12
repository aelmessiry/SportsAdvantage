export default function Preloader({ show }) {
  return (
    show && (
      <div
        className="fugu-preloader-holder"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div
          className={`fugu-preloader `}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="fugu-spinner">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" />
            </svg>
          </div>
          <div className="fugu-title">loading...</div>
        </div>
      </div>
    )
  );
}
