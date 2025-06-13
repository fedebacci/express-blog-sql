import { createContext, useContext, useState } from "react";



const AlertContext = createContext();



const alertInitialData = {
    type: "",
    text: "",
    show: false,
};





function AlertProvider ({ children }) {

    const [ alertData, setAlertData ] = useState(alertInitialData);
    


    const showAlert = (text, type = "info") => {
        if (!text) return;
        setAlertData({ text, type, show: true});
    };
    
    const hideAlert = () => {
        setAlertData(alertInitialData);
    };

    const alertHandler = {
        data: alertData,
        showAlert,
        hideAlert,
    };
    


    return (
        <AlertContext.Provider value={alertHandler}>
            {children}
        </AlertContext.Provider>
    );
};



function useAlert () {
    return useContext(AlertContext);
};



export { AlertProvider, useAlert };