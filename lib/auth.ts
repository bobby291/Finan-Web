// lib/auth.ts

import { walletStore } from "./walletStore";
import { User, Wallet } from "./types";

interface MockUser extends User {
  password: string;
}

const userStore = new Map<string, MockUser>();

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function userExists(email: string): boolean {
  return userStore.has(normalizeEmail(email));
}

export function registerUser(
  name: string,
  email: string,
  password: string
): Wallet {
  const normalizedEmail = normalizeEmail(email);

  const user: MockUser = {
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  userStore.set(normalizedEmail, user);

  return walletStore.getOrCreateWallet({
    name: user.name,
    email: user.email,
  });
}

export function authenticateUser(
  email: string,
  password: string
): User | null {
  const normalizedEmail = normalizeEmail(email);

  const user = userStore.get(normalizedEmail);

  if (!user) {
    return null;
  }

  if (user.password !== password) {
    return null;
  }

  walletStore.getOrCreateWallet({
    name: user.name,
    email: user.email,
  });

  return {
    name: user.name,
    email: user.email,
  };
}

export function getUser(email: string): User | null {
  const user = userStore.get(normalizeEmail(email));

  if (!user) {
    return null;
  }

  return {
    name: user.name,
    email: user.email,
  };
}

export function getUserWallet(
  email: string,
  name?: string
): Wallet {
  const normalizedEmail = normalizeEmail(email);

  let user = userStore.get(normalizedEmail);

  if (!user) {
    if (!name) {
      throw new Error("User not found");
    }

    user = {
      name,
      email: normalizedEmail,
      password: "",
    };

    userStore.set(normalizedEmail, user);
  }

  return walletStore.getOrCreateWallet({
    name: user.name,
    email: user.email,
  });
}

export function getAllUsers(): User[] {
  return Array.from(userStore.values()).map(({ password, ...user }) => user);
}