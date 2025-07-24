import React, { createContext } from "react";

export const GetInvestorContext = createContext({
  investorList: [],
  getInvestors: () => Promise.resolve(), // Dummy function
  setInvestorList: () => {}, // Dummy function
});
