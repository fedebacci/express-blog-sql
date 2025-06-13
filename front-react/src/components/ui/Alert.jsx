import { useAlert } from "../../contexts/AlertContext";


export default function Alert () {

    const { data, hideAlert } = useAlert();

    if (!data.show) return <></>;


    return (
        <>
            <div className="container mt-3">
                {
                    data.show && 
                    (
                        <div className={`alert alert-${data.type} mb-0 d-flex align-items-center justify-content-between`}>
                            {data.text}

                            <button onClick={hideAlert} type="button" className="btn btn-close"></button>
                        </div>
                    )
                }
            </div>
        </>
    );
};