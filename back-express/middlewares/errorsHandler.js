const errorsHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    // * err.message VIENE PASSATO DIRETTAMENTE IN: new Error(`Message`)
    const errMessage = err.message ?? "Server error";

    const responseObject = {
        error: errMessage
    };

    if (err.data) {
        responseObject.data = err.data;
    };
    
    // console.log("ERROR HANDLER PARTITO: ", responseObject);
    // console.log("ERROR HANDLER PARTITO: ", err);
    console.log("ERROR HANDLER PARTITO: ");

    res
        .status(statusCode)
        .json(responseObject);
};


module.exports = { errorsHandler };