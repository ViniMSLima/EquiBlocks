import React, { useEffect, useState } from "react";

export const PesoContext = React.createContext();
PesoContext.displayName = 'Peso';

export const PesoProvider = ({ children }) => {
    var [contextPeso, setContextPeso] = useState(0);

    return (
        <PesoContext.Provider
            value={{
                contextPeso,
                setContextPeso,
            }}
        >
            {children}
        </PesoContext.Provider>
    )
}