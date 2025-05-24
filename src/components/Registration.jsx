export default function Registration() {
  return (
    <section className="registration">
      <div className="container">
        <div className="img-box">
          <img src="./src/assets/Learning-bro.svg" alt="Learning-bro" />
        </div>
        <div className="registration-content">
          <div className="input">
            <label>User Name</label>
            <input type="text" />
          </div>
          <div className="input">
            <label>Password</label>
            <input type="password" />
          </div>
        </div>
      </div>
    </section>
  );
}
