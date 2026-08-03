export interface User {
  name: string;
  email: string;
}

export interface Wallet {
  name: string;
  email: string;

  balance: number;

  investedBalance: number;

  totalDeposits: number;

  totalWithdrawals: number;

  totalProfit: number;
}

export interface SessionPayload {
  name: string;
  email: string;
}