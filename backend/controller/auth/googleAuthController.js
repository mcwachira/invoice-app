// import passport from "passport";
// import jwt from "jsonwebtoken";
// import User from "../../models/userModel.js";

// // &-title Login route to passport google strategy
// // $-path Get /api/v1/auth/google
// export const googleAuthenticate = () => {
//   return passport.authenticate("google", {
//     session: false,
//     scope: ["profile", "email"],
//     accessType: "offline",
//     prompt: "consent",
//   });
// };

// // &-title Redirect route to passport google strategy
// // $-path Get /api/v1/auth/google/redirect

// export const googleRedirect = () => {
//   return (
//     passport.authenticate("google", {
//       failureRedirect: "/login",
//       session: false,
//     }),
//     async (req, res) => {
//       const existingUser = await User.findById(req.user.id);

//       const payload = {
//         id: req.user.id,
//         roles: existingUser.roles,
//         firstName: existingUser.firstName,
//         lastName: existingUser.lastName,
//         username: existingUser.username,
//         provider: existingUser.provider,
//         avatar: existingUser.avatar,
//       };

//       jwt.sign(
//         payload,
//         process.env.JWT_ACCESS_SECRET_KEY,
//         { expiresIn: "20m" },
//         (err, token) => {
//           const jwt = `${token}`;

//           const embedJWT = `
//     <htmL>
//     <script>
//     windows.localStorage.setItem("googleToken", '${jwt}')
//     window.location.href='/dashboard'
//     </script>
//     </htmL>
//     `;

//           res.send(embedJWT);
//         }
//       );
//     }
//   );
// };
