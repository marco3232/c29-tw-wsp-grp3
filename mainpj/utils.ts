import { UserListType } from "./app";

export function loginCheck(
  usernameInput: string,
  passwordInput: string,
  data: UserListType
) {
  for (let entry of data) {
    if (usernameInput == entry.username) {
      if (passwordInput == entry.password) return true;
    //   else return false;
    }
  }
  return false;
}
