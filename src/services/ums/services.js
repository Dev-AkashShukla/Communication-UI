//file name is given is not a standard name you renamed it according to file uses

//the basic structure

// import { fetchFromDB } from "@/lib/fetch";

// export const login = async (username, password) => {
//   const Authorization = `Basic ${btoa(`${username}:${password}`)}`;
//   return fetchFromDB("ums.user.login", {
//     headers: {
//       Authorization,
//     },
//   });
// };

// export const logout = async () => {
//   return fetchFromDB("ums.user.logout");
// };

// export const changePassword = async (oldPassword, newPassword) => {
//   const resetHeader = `Change ${btoa(`${oldPassword}:${newPassword}`)}`;
//   return fetchFromDB("ums.user.changePassword", {
//     headers: {
//       "Change-Password": resetHeader,
//     },
//   });
// };
