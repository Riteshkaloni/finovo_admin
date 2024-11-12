export const APP_NAME = "MyApp";
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "es", "fr", "de"];

export const BASE_URL = "http://192.168.1.21:9000";

//storage Key
export const STORAGE_KEYS = {
  kTOKEN: "token",
  USER_PROFILE: "userProfile",
  THEME_PREFERENCE: "themePreference",
  LANGUAGE_SETTING: "languageSetting",
};

//EndPoints
export const Endpoints = {
  SIGN_UP_SUPER_ADMIN: "/signupSuperAdmin",
  SEND_INVITATION_TO_SUB_ADMIN: "/sendInvitationToSubAdmin",
  VERIFY_EMAIL_OTP: "/verifyEmailOTP/",
  LOGIN_SUPER_ADMIN: "/loginSuperAdmin",
};

export default {
  Endpoints,
  BASE_URL,
  STORAGE_KEYS,
};
