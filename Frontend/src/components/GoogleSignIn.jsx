// src/components/GoogleSignIn.jsx
import React from "react";

const GoogleSignIn = () => {
  const handleGoogleLogin = () => {
    window.google.accounts.id.initialize({
      client_id: "horizontal-oath-467019-h4",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.prompt(); // opens the login prompt
  };

  const handleCredentialResponse = (response) => {
    const { credential } = response;

    //  Flask backend for verification
    fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("isAdmin", data.is_admin);
          window.location.href = "/report"; // Redirect to report page after login
        } else {
          alert("Authentication failed.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login failed. Try again.");
      });
  };

  return (
    <button className="report-btn" onClick={handleGoogleLogin}>
      Report Incident
    </button>
  );
};

export default GoogleSignIn;
