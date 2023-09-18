type UsernameChange = {
  type: "username_change";
  value: string;
};

type EmailChange = {
  type: "email_change";
  value: string;
};

type PasswordChange1 = {
  type: "password_change1";
  value: string;
};

type PasswordChange2 = {
  type: "password_change2";
  value: string;
};

export type SignupReducerAction =
  | UsernameChange
  | EmailChange
  | PasswordChange1
  | PasswordChange2;

export type LoginReducerAction = UsernameChange | PasswordChange1;
