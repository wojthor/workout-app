import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ImLinkedin2 } from "react-icons/im";

export default function App() {
  return (
    <MDBFooter
      className="bg-light text-center text-white"
      style={{ position: "fixed", bottom: "0", width: "100%" }}
    >
      <div className="footer">
        <div className="d-flex flex-row justify-content-center  ">
          <div className=" d-flex justify-content-center text-dark gap-2 w-50">
            <p>© 2023 wojthor</p>
          </div>

          <div className="d-flex text-dark w-50 justify-content-center gap-4 ">
            <div className="d-flex flex-row gap-2">
              <p className=" text-white   ">
                <Link
                  to="https://github.com/wojthor"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-dark d-flex gap-1 "
                >
                  GitHub
                </Link>
              </p>
              <p>
                <BsGithub />
              </p>
            </div>

            <div className="d-flex flex-row gap-2">
              <p className=" text-white   ">
                <Link
                  to="https://www.linkedin.com/in/wojciech-aniszewski-990750268/"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-dark d-flex gap-1 "
                >
                  Linkedin
                </Link>
              </p>
              <p>
                <ImLinkedin2 />
              </p>
            </div>
          </div>
        </div>
      </div>
    </MDBFooter>
  );
}
