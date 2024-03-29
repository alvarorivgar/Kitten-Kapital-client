import { Link } from "react-router-dom";

function HomeAnon() {
  return (
    <div>
      <img
        className="home-anon-img-logo"
        src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678960941/Kitten%20Kapital/logo-slogan_cxxpsa.png"
        alt="logo"
        id="logo-home"
      />
      <div className="container">
        <div className="row justify-content-left pt-2 mt-2 m-1">
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
            <div id="home-body">
              <div id="section-one">
                <p>Kitten Kapital is the best option to keep your savings.</p>
                <p>Try our Checking Account with very competitive fees.</p>

                <p>
                  You can always negotiate them with our trusted bank managers.
                </p>
                <p>
                  If you are 25 or younger, you can open a Kitty Account
                  completely free, no fees whatsoever!
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-end pt-1 mt-2 m-1">
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4 formulario">
            <div>
              <p>
                You can become a client from the confort of your own home,{" "}
                <br />
                you just need a camera to contact one of our managers through a
                video call.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center pt-1 mt-2 m-1">
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-4">
            <img
              className="home-anon-img"
              src="https://res.cloudinary.com/dkz1jslyi/image/upload/v1678990551/Kitten%20Kapital/business-cat_m3nhpx.png"
              alt="cat"
            />
            <Link to="/video">
              <div class="icon-btn d-flex justify-content-center">
                <button class="btn-green">
                  <span class="btn-gradient">
                    <i class="fa fa-check"></i>
                  </span>
                  <span class="btn-text">Get Started</span>
                </button>
              </div>
            </Link>
          </div>
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
