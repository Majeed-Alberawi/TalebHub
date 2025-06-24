import img from "../../assets/404-error.svg";

const NotFound = () => {
  return (
    <div className="not-found">
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="floating-element element-1">📚</div>
        <div className="floating-element element-2">🎓</div>
        <div className="floating-element element-3">✏️</div>
        <div className="floating-element element-4">📝</div>
        <div className="floating-element element-5">🔍</div>
        <div className="floating-element element-6">💡</div>
        <div className="floating-element element-7">🌟</div>
        <div className="floating-element element-8">📖</div>
      </div>

      <div className="container">
        <div className="not-found-content">
          {/* 404 SVG Illustration */}
          <div className="illustration">
            <img src={img} alt="" className="not-found-svg " />
          </div>

          {/* Main Content */}
          <div className="content">
            <h1 className="title">Oops! Page Not Found</h1>

            {/* Action Buttons */}
            <div className="actions">
              <button
                className="btn btn-primary"
                onClick={() => window.history.back()}
              >
                <i className="fas fa-arrow-left"></i>
                Go Back
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => (window.location.href = "/")}
              >
                <i className="fas fa-home"></i>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
