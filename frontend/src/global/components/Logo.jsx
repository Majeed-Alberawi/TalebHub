export default function Logo({ icon = "visible", color = "normal" }) {
  return (
    <div className="logo-box">
      {icon === "visible" && <img src="/src/assets/logo.png" alt="Logo" />}
      <div
        className={`logo-text ${
          color === "normal" ? "normal" : color === "inverted" ? "inverted" : ""
        } `}
      >
        <span className="main">Taleb</span>
        <span>Hub</span>
      </div>
    </div>
  );
}
