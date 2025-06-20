import { useEffect } from "react";
import { useAlert } from "../contexts/AlertContext";


export default function HomePage () {

    const { showAlert, hideAlert } = useAlert();



    // useEffect(() => {
    //     showAlert("Hai aperto la home", "success");
    //     // ! ATTENZIONE
    //     // ? SENZA IL RETURN QUA SOTTO L'ALERT RIMANE ANCHE AL CAMBIO PAGINA
    //     return () => {
    //         hideAlert();
    //     };
    // }, []);


    const appName = import.meta.env.VITE_APP_NAME;


    return (
        <main>
            <div className="container my-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">
                            {/* Homepage */}
                            {appName}
                        </h2>
                    </div>
                </div>
            </div>
        </main>
    );
};