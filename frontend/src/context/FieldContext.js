import React, { useState, createContext } from react;

const FieldContext = createContext()

const FieldContextProvider = ({ children }) => {
    const [FieldArray, setFieldArray] = useState([]);

    const value = {
        fieldArray,
        setFieldArray,
    }

    return <AppContext.Provider>{ children }</AppContext.Provider>
}

export default FieldContextProvider;