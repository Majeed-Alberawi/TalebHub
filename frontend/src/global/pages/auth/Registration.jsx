import {
  faInstagram,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPaperPlane,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";

export default function Registration() {
  return (
    <section className="registration">
      <div className="container">
        <div className="welcome-box">
          <Logo color="inverted" />
          <div className="welcome-content">
            <WelcomeText
              helloWord={"Welcome to "}
              webName={"Talebhub"}
              helloText={
                "We build bridges between teachers and students and provide educational tools to enrich the university experience."
              }
            />
            <SocialLinks
              instagram={"#"}
              paperPlane={"#"}
              whatsapp={"#"}
              xTwitter={"#"}
            />
          </div>
        </div>
        <div className="registration-content">
          <div className="info-box">
            <SigninHeader />
            <SigninForm />
            <SigninFooter />
          </div>
        </div>
      </div>
    </section>
  );
}

function WelcomeText({ helloWord, webName, helloText }) {
  return (
    <div className="welcome-text">
      <h1>
        {helloWord}
        <u>{webName}</u>
      </h1>
      <p>{helloText}</p>
    </div>
  );
}

function SocialLinks({ instagram, paperPlane, whatsapp, xTwitter }) {
  return (
    <div className="links-box">
      <div className="social-content">
        <a href={instagram}>
          <FontAwesomeIcon icon={faPaperPlane} className="social-icon" />
        </a>
        <a href={paperPlane}>
          <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
        </a>
        <a href={whatsapp}>
          <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
        </a>
        <a href={xTwitter}>
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
      </div>
      <div className="support-box">
        <a href="#">
          <FontAwesomeIcon icon={faCircleQuestion} className="support-icon" />
          Contact Support
        </a>
      </div>
    </div>
  );
}

function SigninHeader() {
  return (
    <div className="info-header">
      <h2>Sign in to your account</h2>
      <p>
        Please enter the following information to access your learning page.
      </p>
    </div>
  );
}

function SigninForm() {
  return (
    <form className="input-box">
      <div className="input">
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" required />
      </div>

      <div className="input">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </div>

      <div className="button-box">
        <button type="submit" className="primary-button">
          Sign In
        </button>
        <span>
          <Link to="/forgetPassword" element={<ForgetPassword />}>
            Forgot your password?
          </Link>
          <a href="#"></a>
        </span>
      </div>
    </form>
  );
}

function SigninFooter() {
  return (
    <div className="info-footer">
      <p>
        New user? <a href="#">Contact us</a>
      </p>
      <div className="support-box">
        <a href="#">
          <FontAwesomeIcon icon={faCircleQuestion} className="support-icon" />
          Contact Support
        </a>
      </div>
    </div>
  );
}

{
  /*
  import {
  faInstagram,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPaperPlane,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Registration() {
  return (
    <section className="registration">
      <div className="container">
        <div className="welcome-box">
          <Logo />
          <div className="welcome-content">
            <WelcomeText
              helloWord={"مرحباً بك في "}
              webName={"Talebhub"}
              helloText={
                "نبني جسورًا بين المعلّم والطالب، ونُقدّم أدوات تعليمية تُثري التجربة الجامعية"
              }
            />
            <SocialLinks
              instagram={"#"}
              paperPlane={"#"}
              whatsapp={"#"}
              xTwitter={"#"}
            />
          </div>
        </div>
        <div className="registration-content">
          <div className="info-box">
            <SigninHeader />
            <SigninForm />
            <SigninFooter />
          </div>
        </div>
      </div>
    </section>
  );
}

function Logo() {
  return (
    <div className="logo-box">
      <img src="./src/assets/logo.png" alt="Logo" />
      <div className="logo-text">
        <h1>طالــب</h1>
        <span>هــوب</span>
      </div>
    </div>
  );
}

function WelcomeText({ helloWord, webName, helloText }) {
  return (
    <div className="welcome-text">
      <h1>
        {helloWord}
        <u>{webName}</u>
      </h1>
      <p>{helloText}</p>
    </div>
  );
}

function SocialLinks({ instagram, paperPlane, whatsapp, xTwitter }) {
  return (
    <div className="links-box">
      <div className="social-content">
        <a href={instagram}>
          <FontAwesomeIcon icon={faPaperPlane} className="social-icon" />
        </a>
        <a href={paperPlane}>
          <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
        </a>
        <a href={whatsapp}>
          <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
        </a>
        <a href={xTwitter}>
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
      </div>
      <div className="support-box">
        <a href="#">
          <FontAwesomeIcon icon={faCircleQuestion} className="support-icon" />
          التواصل مع الدعم
        </a>
      </div>
    </div>
  );
}

function SigninHeader() {
  return (
    <div className="info-header">
      <h2>تسجيل الدخول إلى حسابك</h2>
      <p>يرجى إدخال المعلومات التالية لتتمكن من الوصول إلى صفحتك التعليمية.</p>
    </div>
  );
}

function SigninForm() {
  return (
    <form className="input-box">
      <div className="input">
        <label htmlFor="username">اسم المستخدم:</label>
        <input id="username" name="username" type="text" required />
      </div>

      <div className="input">
        <label htmlFor="password">كلمة المرور:</label>
        <input id="password" name="password" type="password" required />
      </div>

      <div className="button-box">
        <button type="submit" className="primary-button">
          تسجيل الدخول
        </button>
        <span>
          <a href="#">نسيت كلمة المرور؟</a>
        </span>
      </div>
    </form>
  );
}

function SigninFooter() {
  return (
    <div className="info-footer">
      <p>
        مستخدم جديد؟ <a href="#">تواصل معنا</a>
      </p>
      <div className="support-box">
        <a href="#">
          <FontAwesomeIcon icon={faCircleQuestion} className="support-icon" />
          التواصل مع الدعم
        </a>
      </div>
    </div>
  );
}

  */
}
