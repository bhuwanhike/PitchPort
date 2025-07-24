import React, { createContext } from "react";

export const GetStartupContext = createContext({
  startupList: [],
  getStartups: () => Promise.resolve(), // Dummy function
  setStartupList: () => {}, // Dummy function
});
