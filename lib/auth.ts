// lib/auth.ts

import { walletStore } from "./walletStore";
import { Wallet } from "./types";
import { getDemoUser } from "./session";
import { DemoUser } from "./types";

/**
 * Normalize email for consistent storage and lookups.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Always return a wallet.
 * If one doesn't exist yet, it is created automatically.
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
 * Authenticate a demo user.
 *
 * Since this project has no database, authentication
 * is performed using the signed demo cookie that was
 * created during signup.
 */
export async function authenticateDemoUser(
  email: string,
  password: string
): Promise<DemoUser | null> {
  const demoUser = await getDemoUser();

  if (!demoUser) {
    return null;
  }

  // Check email
  if (
    normalizeEmail(demoUser.email) !==
    normalizeEmail(email)
  ) {
    return null;
  }

  // Check password
  if (demoUser.password !== password) {
    return null;
  }

  return demoUser;
}
/**
 * Return every wallet.
 * Used by the Admin dashboard.
 */
export function getAllWallets(): Wallet[] {
  return walletStore.getAllWallets();
}

/**
 * Add funds to a wallet.
 */
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

/**
 * Replace the wallet balance.
 */
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

/**
 * Update invested balance.
 */
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

/**
 * Update total profit.
 */
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

/**
 * Withdraw funds.
 */
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