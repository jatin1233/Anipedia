import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import Search from "./Search";

firebase.initializeApp({
  apiKey: "AIzaSyDqakaOjA99U1sqsmDLzBag6KJ6VnQ4zj4",
  authDomain: "moengage-anipedia.firebaseapp.com",
});

function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  });

  return (
    <div>
      {isSignedIn ? (
        <Search />
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}

export default Home;
