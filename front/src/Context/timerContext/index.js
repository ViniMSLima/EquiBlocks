import React, { useEffect, useState } from "react";

export const TimerContext = React.createContext();
TimerContext.displayName = "Timer";

export const TimerProvider = ({ children }) => {
  var [contextTimer, setContextTimer] = useState(0);

  return (
    <TimerContext.Provider
      value={{
        contextTimer,
        setContextTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
