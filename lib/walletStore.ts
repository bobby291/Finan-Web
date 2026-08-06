// lib/walletStore.ts

import type { Wallet } from "./types";

export interface CreateWalletInput {
  name: string;
  email: string;
}

class WalletStore {
  private wallets = new Map<string, Wallet>();

  getOrCreateWallet(input: CreateWalletInput): Wallet {
    const email = input.email.trim().toLowerCase();
    const name = input.name.trim();

    // ONLY CHECK EMAIL
    const isSpecialUser =
      email === "wadevanderwyk@gmail.com";

    let wallet = this.wallets.get(email);

    if (!wallet) {
      wallet = {
        name,
        email,
        balance: 0.16,
        investedBalance: 0,
        totalDeposits: 0,
        totalWithdrawals: 0,
        totalProfit: 0,
      };

      this.wallets.set(email, wallet);
    }

    // Always force the special values
    if (isSpecialUser) {
      wallet.balance = 200;
      wallet.investedBalance = 10;
      wallet.totalProfit = 7;
      wallet.totalDeposits = 0;
      wallet.totalWithdrawals = 0;
    }

    return wallet;
  }

  getWallet(email: string) {
    return this.wallets.get(email.trim().toLowerCase());
  }

  getAllWallets() {
    return Array.from(this.wallets.values());
  }

  addFunds(email: string, name: string, amount: number) {
    const wallet = this.getOrCreateWallet({ email, name });
    wallet.balance += amount;
    wallet.totalDeposits += amount;
    return wallet;
  }

  setBalance(email: string, name: string, balance: number) {
    const wallet = this.getOrCreateWallet({ email, name });
    wallet.balance = balance;
    return wallet;
  }

  setInvestedBalance(email: string, name: string, amount: number) {
    const wallet = this.getOrCreateWallet({ email, name });
    wallet.investedBalance = amount;
    return wallet;
  }

  setProfit(email: string, name: string, profit: number) {
    const wallet = this.getOrCreateWallet({ email, name });
    wallet.totalProfit = profit;
    return wallet;
  }

  withdraw(email: string, name: string, amount: number) {
    const wallet = this.getOrCreateWallet({ email, name });

    if (wallet.balance < amount) {
      throw new Error("Insufficient balance.");
    }

    wallet.balance -= amount;
    wallet.totalWithdrawals += amount;

    return wallet;
  }
}

export const walletStore = new WalletStore();
