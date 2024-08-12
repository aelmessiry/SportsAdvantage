import React, { useState, useEffect } from "react";
//import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { getAuthConfig } from "./firebase";
import { Modal, CloseButton } from "react-bootstrap";
import { useAuth } from "../web3/context/AuthContext";
import { setAxiosToken } from "./AxiosToken";
import emailIcon from "./icon/email-icon.png";

const LOCALHOST_URL = "http://localhost:5173/";
const PRODUCTION_URL = import.meta.env.VITE_DOMAIN;

const EmailAuth = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInitialError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  const { setEmail, email, setToken } = useAuth();

  useEffect(() => {
    const userAuth = async () => {
      console.log("user >> ", user);
      if (user) {
        // user is already signed in
        navigate("/");
      } else {
        // user is not signed in but the link is valid
        // This condition is falese
        const auth = getAuthConfig();
        if (isSignInWithEmailLink(auth, window.location.href)) {
          // now in case user clicks the email link on a different device, we will ask for email confirmation
          let email = localStorage.getItem("email");
          if (!email) {
            email = window.prompt("Please provide your email");
          }
          // after that we will complete the login process
          setInitialLoading(true);
          signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
              console.log("result >> ", result);
              // we can get the user from result.user but no need in this case
              // console.log(JSON.stringify(result.user, null, 4));
              setUser(result.user);
              const accessToken = result.user.stsTokenManager.accessToken;
              setToken(accessToken);
              setAxiosToken(accessToken);
              localStorage.removeItem("email");
              setInitialLoading(false);
              setInitialError("");
              navigate("/");
            })
            .catch((err) => {
              setInitialLoading(false);
              setInitialError(err.message);
              navigate("/login");
            });
        }
      }
    };

    userAuth();
  }, [user, search, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const actionCodeSettings = {
      url: LOCALHOST_URL,
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // Save the email locally so we don't need to ask the user for it again
      // if they open the link on the same device.
      localStorage.setItem("email", email);
      setLoginLoading(false);
      setLoginError("");
      setInfoMsg("We have sent you an email with a link to sign in");
    } catch (err) {
      setLoginLoading(false);
      setLoginError(err.message);
    }
  };

  return (
    <>
      <img
        alt="email"
        src={emailIcon}
        className="img img-fluid"
        width={"50px"}
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Email Verification</Modal.Title>
          <CloseButton onClick={() => setShowModal(false)} />
        </Modal.Header>
        <Modal.Body>
          <div className="box">
            {initialLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {initialError !== "" ? (
                  <div className="error-msg">{initialError}</div>
                ) : (
                  <>
                    {user ? (
                      <div>Please wait...</div>
                    ) : (
                      <form
                        className="form-group custom-form"
                        onSubmit={handleLogin}
                      >
                        <label style={{ marginBottom: "1rem" }}>Email</label>
                        <input
                          type={"email"}
                          required
                          placeholder="Enter Email"
                          className="form-control"
                          value={email || ""}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ marginBottom: "1rem" }}
                        />

                        <button
                          type="submit"
                          className="btn btn-success btn-md"
                        >
                          {loginLoading ? (
                            <span>Logging you in</span>
                          ) : (
                            <span>Login</span>
                          )}
                        </button>
                        {loginError !== "" && (
                          <div className="error-msg">{loginError}</div>
                        )}

                        {infoMsg !== "" && (
                          <div
                            style={{ marginTop: "1rem" }}
                            className="info-msg"
                          >
                            {infoMsg}
                          </div>
                        )}
                      </form>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EmailAuth;
