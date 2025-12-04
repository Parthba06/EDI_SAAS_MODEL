// // Simple Google OAuth helper using Google Identity Services

// type GoogleTokenResponse = {
//   access_token?: string;
//   expires_in?: number;
//   token_type?: string;
//   scope?: string;
// };

// type GoogleTokenClient = {
//   requestAccessToken: (options?: { prompt?: string }) => void;
// };

// type GoogleIdentity = {
//   accounts?: {
//     oauth2?: {
//       initTokenClient: (config: {
//         client_id: string;
//         scope: string;
//         callback: (response: GoogleTokenResponse) => void;
//       }) => GoogleTokenClient;
//     };
//   };
// };

// declare global {
//   interface Window {
//     // Google Identity Services object injected by https://accounts.google.com/gsi/client
//     google?: GoogleIdentity;
//   }
// }

// export const signInWithGoogle = () => {
//   if (typeof window === "undefined") {
//     console.error("Google sign-in is only available in the browser.");
//     return;
//   }

//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   if (!clientId) {
//     console.error("VITE_GOOGLE_CLIENT_ID is not set. Add it to your .env file.");
//     return;
//   }

//   const google = window.google;

//   if (!google || !google.accounts || !google.accounts.oauth2) {
//     console.error("Google Identity Services script not loaded.");
//     return;
//   }

//   const tokenClient = google.accounts.oauth2.initTokenClient({
//     client_id: clientId,
//     scope: "openid email profile",
//     callback: (response) => {
//       // For now, just log the token response so you can verify it works.
//       console.log("Google OAuth response", response);

//       // Redirect to dashboard after successful login
//       if (response && response.access_token) {
//         window.location.href = "/dashboard";
//       }
//     },
//   });

//   tokenClient.requestAccessToken({ prompt: "consent" });
// };
