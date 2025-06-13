// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO




// - DOTENV Import
// * IMPORTO DOTENV PER ACCEDERE ALLE VARIABILI DI SISTEMA
require('dotenv').config();

// # EXPRESS (gestione richieste/risposte e middlewares - dependency)

// - EXPRESS Import
// * IMPORTO I PACCHETTI DI EXPRESS INSTALLATI (DOPO AVER FATTO npm i express)
const express = require('express');

// - EXPRESS Express app initialization
// * INIZIALIZZO L'APPLICAZIONE EXPRESS INVOCANDO LA FUNZIONE express()
const app = express();
const { APP_PORT, APP_HOST, FRONTEND_APP_URL } = process.env;
// console.debug(`APP_PORT: ${APP_PORT}`);
// console.debug(`APP_HOST: ${APP_HOST}`);
// console.debug(`FRONTEND_APP_URL=: ${FRONTEND_APP_URL}`);




// # CUSTOM IMPORTS

const { postsRouter } = require('./routers/posts');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { notFound } = require('./middlewares/notFound');
const cors = require('cors');




// # MIDDLEWARES - "Parti di mezzo" (Funzionalità agg. messe a disposizione da pacchetti di express)

// - .static('foldername = public') => Gestione files statici
// * UTILIZZO MIDDLEWARE STATIC PER METTERE A DISPOSIZIONE LE IMMAGINI DEI POST
app.use(express.static('public'))

// - .json()
// * UTILIZZO MIDDLEWARE JSON PER BODY-PARSING (INTERPRETAZIONE BODY DELLE RICHIESTE DEL CLIENT)
// * NB: OGNI TIPO DI DECODIFICA HA IL SUO MIDDLEWARE, DA AGGIUNGERE SE NECESSARIO
app.use(express.json());

// - cors
const corsConfig = {
    origin: FRONTEND_APP_URL
}
app.use(cors(corsConfig))




// # ROUTERS
app.use("/posts", postsRouter);





// # ERROR HANDLING MIDDLEWARES
app.use(notFound);
app.use(errorsHandler);





// # ASCOLTO DELLA PORTA DA PARTE DEL SERVER

// - SERVER LISTEN
// * METTO IL SERVER IN ASCOLTO PER LE RICHIESTE SULLA PORTA APP_PORT
app.listen(APP_PORT, () => {
    console.log(`Server del mio blog in ascolto sulla porta: ${APP_PORT}`);
});