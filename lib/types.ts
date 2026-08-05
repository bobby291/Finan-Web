// lib/types.ts

/**
 * Basic authenticated user.
 */
export interface User {
  name: string;
  email: string;
}

/**
 * Wallet information.
 */
export interface Wallet {
  name: string;
  email: string;

  balance: number;
  investedBalance: number;

  totalDeposits: number;
  totalWithdrawals: number;

  totalProfit: number;
}

/**
 * JWT session payload.
 */
export interface SessionPayload {
  name: string;
  email: string;
}

/**
 * Stored inside the signed demo cookie.
 * This allows the same browser to log in again
 * without using an in-memory user store.
 */
export interface DemoUser {
  name: string;
  email: string;
  password: string;
}

/**
 * Signup request body.
 */
export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

/**
 * Login request body.
 */
export interface LoginInput {
  email: string;
  password: string;
}