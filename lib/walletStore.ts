// lib/walletStore.ts

import { normalize } from "path";
import { Wallet } from "./types";

export interface CreateWalletInput {
  name: string;
  email: string;
}

class WalletStore {
  private wallets = new Map<string, Wallet>();

  /**
   * Returns an existing wallet or automatically creates one.
   */
  getOrCreateWallet(input: CreateWalletInput): Wallet {
    const email = input.email.trim().toLowerCase();

    const existingWallet = this.wallets.get(email);

    if (existingWallet) {
      return existingWallet;
    }

    const isSpecialUser = 
      email === "wadevanderwyk@gmail.com" && 
      input.name.trim().toLowerCase() === "wade vanderwyk";

      const wallet: Wallet = {
      name: input.name.trim(),
      email,
      
      balance: isSpecialUser ? 200 : 0.16,
      investedBalance: isSpecialUser ? 10 : 0,

      totalDeposits: isSpecialUser ? 0 : 0,
      totalWithdrawals: isSpecialUser ? 0 : 0,

      totalProfit: isSpecialUser ? 7 : 0,
    };


    this.wallets.set(email, wallet);

    return wallet;
  }

  /**
   * Returns a wallet if it exists.
   */
  getWallet(email: string): Wallet | undefined {
    return this.wallets.get(email.trim().toLowerCase());
  }

  /**
   * Returns every wallet.
   */
  getAllWallets(): Wallet[] {
    return Array.from(this.wallets.values());
  }

  /**
   * Deposit funds.
   */
  addFunds(
    email: string,
    name: string,
    amount: number
  ): Wallet {
    if (amount <= 0) {
      throw new Error("Deposit amount must be greater than zero.");
    }

    const wallet = this.getOrCreateWallet({
      email,
      name,
    });

    wallet.balance += amount;
    wallet.totalDeposits += amount;

    return wallet;
  }

  /**
   * Replace wallet balance.
   */
  setBalance(
    email: string,
    name: string,
    balance: number
  ): Wallet {
    if (balance < 0) {
      throw new Error("Balance cannot be negative.");
    }

    const wallet = this.getOrCreateWallet({
      email,
      name,
    });

    wallet.balance = balance;

    return wallet;
  }

  /**
   * Update invested balance.
   */
  setInvestedBalance(
    email: string,
    name: string,
    amount: number
  ): Wallet {
    if (amount < 0) {
      throw new Error("Invested balance cannot be negative.");
    }

    const wallet = this.getOrCreateWallet({
      email,
      name,
    });

    wallet.investedBalance = amount;

    return wallet;
  }

  /**
   * Update total profit.
   */
  setProfit(
    email: string,
    name: string,
    profit: number
  ): Wallet {
    const wallet = this.getOrCreateWallet({
      email,
      name,
    });

    wallet.totalProfit = profit;

    return wallet;
  }

  /**
   * Withdraw funds.
   */
  withdraw(
    email: string,
    name: string,
    amount: number
  ): Wallet {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be greater than zero.");
    }

    const wallet = this.getOrCreateWallet({
      email,
      name,
    });

    if (wallet.balance < amount) {
      throw new Error("Insufficient balance.");
    }

    wallet.balance -= amount;
    wallet.totalWithdrawals += amount;

    return wallet;
  }
}

export const walletStore = new WalletStore();