import { Link } from "react-router-dom";

function HomeAnon() {
  return (
    <div className="home-anon">
      <img
        src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/logo-slogan_cxxpsa.png"
        alt="logo"
        id="logo-home"
      />

      <div id="home-body">
        <div id="section-one">
          <p>Kitten Kapital is the best option to keep your savings.</p>
          <br />
          <p>Try our Checking Account with very competitive fees.</p>
          <br />
          <p>You can always negotiate them with our trusted bank managers.</p>
          <br />
          <p>
            If you are 25 or younger, you can open a Kitty Account completely
            free, no fees whatsoever!
          </p>
          <br />
        </div>
        <div id="section-two">
          <p>
            You can become a client from the confort of your own home, <br />
            you just
            need a camera to contact one of our managers through a video call.
          </p>
          <img
            src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/business-cat_osxh4v.png"
            alt="cat"
          />
          <Link to="/video">
            <button id="get-started">Get started!</button>
          </Link>
        </div>
      </div>

      <footer>
        <div className="names">
          <p>Álvaro Rivas</p>

          <div className="links">
            <a href="https://www.linkedin.com/in/%C3%A1lvaro-rivasg/">
              <img
                src="https://myclouddoor.com/wp-content/uploads/2019/11/Linkedin-logo.png"
                alt="linkedin-icon"
                width="50px"
              />
            </a>
            <a href="https://github.com/alvarorivgar">
              <img
                src="https://pngimg.com/uploads/github/github_PNG40.png"
                alt="git-icon"
                width="40px"
              />
            </a>
          </div>
        </div>
        <div className="names">
          <p>Dani Jiménez</p>
          <div>
            <a href="https://www.linkedin.com/in/daniel-jimenez-07092754/">
              <img
                src="https://myclouddoor.com/wp-content/uploads/2019/11/Linkedin-logo.png"
                alt="linkedin-icon"
                width="50px"
              />
            </a>
            <a href="https://github.com/DJGValls">
              <img
                src="https://pngimg.com/uploads/github/github_PNG40.png"
                alt="git-icon"
                width="40px"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeAnon;
