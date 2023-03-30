import { createContext, useState } from "react";


const LanguageContext = createContext("zh-HK")

const LanguageContextProvider = ({ children }) => {
    const [language, setLanguage] = useState("zh-HK");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext, LanguageContextProvider };