// lib/validators.ts

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function validateEmail(email: string): string | null {
  if (!email || email.trim() === "") {
    return "Email is required.";
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return "Please enter a valid email address.";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return null;
}

export function validateName(name: string): string | null {
  if (!name || name.trim() === "") {
    return "Name is required.";
  }

  return null;
}

export function validateSignup(data: SignupInput): string | null {
  return (
    validateName(data.name) ??
    validateEmail(data.email) ??
    validatePassword(data.password)
  );
}

export function validateLogin(data: LoginInput): string | null {
  return (
    validateEmail(data.email) ??
    validatePassword(data.password)
  );
}