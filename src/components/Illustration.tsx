import signupIllustration from '../assets/signuo-illustration.svg';
import artBoard11 from '../assets/artboard11.svg';

const Illustration = () => {
  return (
    <div className="illustration-container">
      <div className="illustration-text-content">
        <p className="title-sub">Let’s get started</p>
        <h1 className="title-main">Create your account</h1>
        <p className="title-desc">Follow the steps to create your account</p>
      </div>

      <img
        src={signupIllustration}
        alt="signup-illustration"
        className="bg-topo"
      />

      <img src={artBoard11} alt="art-board-11" className="char-art" />
    </div>
  );
};

export default Illustration;
