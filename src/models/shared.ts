export {};

declare global {
  interface Window {
    handleRecaptchaSuccess?: () => void;
    handleRecaptchaError?: () => void;
    handleRecaptchaExpired?: () => void;
  }
}
