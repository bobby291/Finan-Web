// lib/walletStore.ts

import { Wallet } from "./types";

export interface CreateWalletInput {
  name: string;
  email: string;
}

class WalletStore {
  private wallets = new Map<string, Wallet>();

  /**
   * Get an existing wallet or create one.
   */
  getOrCreateWallet(input: CreateWalletInput): Wallet {
    const email = input.email.trim().toLowerCase();

    const existing = this.wallets.get(email);

    if (existing) {
      return existing;
    }

    const wallet: Wallet = {
      name: input.name,
      email,

      balance: 0.16,

      investedBalance: 0,

      totalDeposits: 0,

      totalWithdrawals: 0,

      totalProfit: 0,
    };

    this.wallets.set(email, wallet);

    return wallet;
  }

  /**
   * Get wallet by email.
   */
  getWallet(email: string): Wallet | undefined {
    return this.wallets.get(email.trim().toLowerCase());
  }

  /**
   * Return all wallets.
   */
  getAllWallets(): Wallet[] {
    return Array.from(this.wallets.values());
  }

  /**
   * Add funds.
   */
  addFunds(email: string, amount: number): Wallet | null {
    const wallet = this.getWallet(email);

    if (!wallet) {
      return null;
    }

    wallet.balance += amount;

    wallet.totalDeposits += amount;

    return wallet;
  }

  /**
   * Replace wallet balance.
   */
  setBalance(email: string, balance: number): Wallet | null {
    const wallet = this.getWallet(email);

    if (!wallet) {
      return null;
    }

    wallet.balance = balance;

    return wallet;
  }

  /**
   * Update profit.
   */
  setProfit(email: string, profit: number): Wallet | null {
    const wallet = this.getWallet(email);

    if (!wallet) {
      return null;
    }

    wallet.totalProfit = profit;

    return wallet;
  }

  /**
   * Update invested balance.
   */
  setInvestedBalance(email: string, amount: number): Wallet | null {
    const wallet = this.getWallet(email);

    if (!wallet) {
      return null;
    }

    wallet.investedBalance = amount;

    return wallet;
  }

  /**
   * Record withdrawal.
   */
  withdraw(email: string, amount: number): Wallet | null {
    const wallet = this.getWallet(email);

    if (!wallet) {
      return null;
    }

    if (wallet.balance < amount) {
      return null;
    }

    wallet.balance -= amount;

    wallet.totalWithdrawals += amount;

    return wallet;
  }
}

export const walletStore = new WalletStore();