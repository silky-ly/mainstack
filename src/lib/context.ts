import { createContext } from "react";

export type AppContextType = {
  user?: { first_name?: string; last_name?: string; email?: string };
  wallet?: {
    balance: number;
    total_payout: number;
    total_revenue: number;
    pending_payout: number;
    ledger_balance: number;
  };
  transactions?: Array<Record<string, any>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);
