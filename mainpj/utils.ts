import { EmailListType } from "./app";

export function loginCheck(
  emailInput: string,
  passwordInput: string,
  data: EmailListType
) {
  for (let entry of data) {
    if (emailInput == entry.email) {
      if (passwordInput == entry.password) return true;
    //   else return false;
    }
  }
  return false;
}
