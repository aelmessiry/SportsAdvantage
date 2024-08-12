import React, { useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getAuthConfig } from "./firebase";
//import { Modal, Button, Form, CloseButton } from "react-bootstrap";
import { useAuth } from "../web3/context/AuthContext";
import { setAxiosToken } from "./AxiosToken";
import phone from "./icon/phone-icon.png";
import { toast } from "react-hot-toast";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { setToken } = useAuth();

  const handleSubmit = async () => {
    const auth = await getAuthConfig();

    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );

    const result = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return result;
    //setConfirmationResult(result);
  };

  const handleCustomSubmit = async (firebaseAuth, userPhoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      firebaseAuth
    );
    const result = await signInWithPhoneNumber(
      firebaseAuth,
      userPhoneNumber,
      recaptchaVerifier
    );
    return result;
    //setConfirmationResult(result);
  };

  const handleVerification = async () => {
    try {
      const userCredential = await confirmationResult.confirm(verificationCode);
      const user = userCredential.user;
      const accessToken = user.stsTokenManager.accessToken;
      setToken(accessToken);
      setAxiosToken(accessToken);
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
    }
  };

  return (
    <>
      <img
        alt="phone"
        src={phone}
        className="img img-fluid"
        width={"50px"}
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      />
      {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Phone Verification</Modal.Title>
          <CloseButton onClick={() => setShowModal(false)} />
        </Modal.Header>
        <Modal.Body>
          <div>
            {!confirmationResult ? (
              <>
                <input
                  type="text"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
                <Button onClick={handleSubmit}>Send Code</Button>
                <div
                  id="recaptcha-container"
                  style={{ marginTop: "1rem" }}
                ></div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <Button onClick={handleVerification}>Verify</Button>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default PhoneAuth;
