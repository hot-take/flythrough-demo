import './textSection.css'; // Import the CSS file for styling

const TextSection = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">L A W L E S S</span>
      </div>
      <div className="navbar-right">
        <a href="#about">About</a>
        <a href="#devblog">DevBlog</a>
        <a href="#community">Community</a>
      </div>
    </div>
  );
};

export default TextSection;