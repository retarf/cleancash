import React, { useState, createContext } from react;

const ChildContext = createContext()

const ChildContextProvider = ({ children }) => {
    const [childArray, setChildArray] = useState([]);

    const value = {
        childArray,
        setChildArray,
    }

    return <AppContext.Provider>{ children }</AppContext.Provider>
}

export default ChildContextProvider;