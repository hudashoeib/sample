import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { sendEmailVerification } from "firebase/auth";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "Styles/Spinner";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [resendMsg, setResendMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  // ⏳ Case 1: Firebase still loading
  if (loading) {
    return (
      <div>
        <Header />
        <main
          className="loading-parent"
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </main>
        <Footer />
      </div>
    );
  }

  // 🚫 Case 2: No user signed in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // ⚠️ Case 3: User signed in but not verified
  if (user && !user.emailVerified) {
    return (
      <div>
        <Header />
        <main style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Email Verification Required</h2>
          <p>
            Please verify your email before accessing this page. A verification
            link was sent to <b>{user.email}</b>.
          </p>

          <button
            className="delete"
            onClick={async () => {
              try {
                await sendEmailVerification(user);
                setResendMsg("Verification email sent again!");
              } catch (error) {
                console.error("Error resending email:", error);
                setResendMsg("Failed to resend. Try again later.");
              }
            }}
          >
            Resend verification email
          </button>

          <br />
          <br />

          <button
            onClick={async () => {
              try {
                await auth.currentUser.reload(); // 🔥 refresh user info
                if (auth.currentUser.emailVerified) {
                  window.location.reload(); // reload app state so ProtectedRoute re-checks
                } else {
                  setResendMsg("Still not verified. Check your inbox.");
                }
              } catch (error) {
                console.error("Error refreshing user:", error);
              }
            }}
          >
            I have verified my email ✅
          </button>

          {resendMsg && (
            <p style={{ marginTop: "1rem", color: "green" }}>{resendMsg}</p>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // ✅ Case 4: Signed in AND verified → show protected content
  return children;
};

export default ProtectedRoute;
