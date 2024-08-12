# Social Wallet

This project is a React component that implements social sign-in using Firebase. The component includes buttons for signing in with Google, Facebook, and Twitter.

## Prerequisites

- Firebase account and project setup
- ReactJS

## Getting Started

- To use this module in your project, you need to install the dependencies:

```
  npm install 
  firebase 
  react 
  axios
  @web3modal/ethereum
```

## File Structure

- LoginButtons.js: Contains the React component for the social sign-in buttons
- firebase.js: Contains the getAuthConfig function for initializing the Firebase app and fetching the Firebase configuration
- tooltip.js: A custom tooltip component for the social sign-in buttons

## Usage

- The component uses the getAuthConfig function to fetch the Firebase configuration and initialize the Firebase app. The signInWithPopup method is used to sign in with the social provider (Google, Facebook, or Twitter). The setUser state is updated with the result of the sign-in operation.

- If the sign-in is successful, the access token and email of the authenticated user are stored in local storage.

- The LoginButtons component can be imported into your project as follows:

```
  import LoginButtons from './LoginButtons';
```

Then, you can use the component in your code as follows:

```
<LoginButtons />
```

## Functions

```
 getAuthConfig
```

- This function returns the authentication object from Firebase. It does so by fetching the Firebase configuration from a remote API and initializing the Firebase app with that configuration.

```
export async function getAuthConfig() {
const response = await axios
.get("<Secure-AWS-API>")
.catch((error) => {
console.log(error);
});
const firebaseConfig = await response.data;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
return auth;
}
```

## Workflow

```
Firebase/Auth and Axios import
```

- This module exports a single function getAuthConfig that returns a Firebase auth object. This function first makes an HTTP GET request to Secure API Gateway using the Axios library to retrieve the Firebase configuration. The configuration is then passed as an argument to the initializeApp function from the Firebase/App library to create a Firebase app instance. The auth object is then obtained from the app instance using the getAuth function from the Firebase/Auth library. The auth object is returned by the getAuthConfig function.

```
LoginButtons Component

```

- This component is a React functional component that provides a UI for a user to sign in with their Google, Facebook, or Twitter account. The component uses the Firebase/Auth and Axios libraries to handle authentication.

- The component uses the useState hook to store the authenticated user in state. The handleGoogleSignIn, handleFacebookSignIn, and handleTwitterSignIn functions are event handlers that are invoked when the corresponding social media icon is clicked. These functions use the getAuthConfig function from the Firebase/Auth and Axios module to obtain a Firebase auth object, create a Firebase provider instance (GoogleAuthProvider, FacebookAuthProvider, or TwitterAuthProvider), and call the signInWithPopup function with the auth object and the provider instance as arguments. The result of the signInWithPopup function is stored in state using the setUser function.

- The useEffect hook is used to store the access token and email of the authenticated user in local storage. The hook updates the local storage when the user object in state changes. The access token and email are extracted from the user object and stored in local storage using the localStorage.setItem method.

- The component renders social media icons for Google, Facebook, and Twitter that are displayed with the help of the SocialTooltip component. The social media icons are displayed as images with a width of 50 pixels and can be clicked to sign in with the corresponding social media account.
