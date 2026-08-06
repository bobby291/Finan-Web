// lib/auth.ts

import { walletStore } from "./walletStore";
import type { Wallet } from "./types";

/**
 * Normalize email.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Demo users stored in memory.
 */
const users = new Map<
  string,
  {
    name: string;
    email: string;
    password: string;
  }
>();

/**
 * Create a new demo user.
 */
export async function createDemoUser(
  name: string,
  email: string,
  password: string
) {
  email = normalizeEmail(email);

  if (users.has(email)) {
    throw new Error("User already exists.");
  }

  const user = {
    name: name.trim(),
    email,
    password,
  };

  users.set(email, user);

  // Automatically create the wallet
  getUserWallet(email, name);

  return user;
}

/**
 * Login.
 */
export async function authenticateDemoUser(
  email: string,
  password: string
) {
  email = normalizeEmail(email);

  const user = users.get(email);

  if (!user) {
    return null;
  }

  if (user.password !== password) {
    return null;
  }

  return user;
}

/**
 * Get or create wallet.
 */
export function getUserWallet(
  email: string,
  name: string
): Wallet {
  return walletStore.getOrCreateWallet({
    email: normalizeEmail(email),
    name: name.trim(),
  });
}

/**
 * Admin helpers.
 */
export function getAllWallets(): Wallet[] {
  return walletStore.getAllWallets();
}

export function addFunds(
  email: string,
  name: string,
  amount: number
): Wallet {
  return walletStore.addFunds(
    normalizeEmail(email),
    name.trim(),
    amount
  );
}

export function setBalance(
  email: string,
  name: string,
  balance: number
): Wallet {
  return walletStore.setBalance(
    normalizeEmail(email),
    name.trim(),
    balance
  );
}

export function setInvestedBalance(
  email: string,
  name: string,
  amount: number
): Wallet {
  return walletStore.setInvestedBalance(
    normalizeEmail(email),
    name.trim(),
    amount
  );
}

export function setProfit(
  email: string,
  name: string,
  profit: number
): Wallet {
  return walletStore.setProfit(
    normalizeEmail(email),
    name.trim(),
    profit
  );
}

export function withdrawFunds(
  email: string,
  name: string,
  amount: number
): Wallet {
  return walletStore.withdraw(
    normalizeEmail(email),
    name.trim(),
    amount
  );
}
