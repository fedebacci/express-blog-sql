# PROGETTO COMPLETO: `BLOG ex-express-blog-sql`

Ciao ragazzi, esercizio di oggi: **ex-express-blog-sql**
<br />
repo: `express-blog-sql`

Esercizio
<br />
Prendiamo le API precedentemente create per il vostro blog ed aggiungiamo la persistenza tramite la connessione a un DB

**Milestone 1**
* Importiamo il db in allegato su MySQL Workbench
* Installiamo il client **mysql2** con `npm i mysql2` nell’app Express
* Creiamo un file di configurazione per connettere il database
* Inseriamo un console.log nella logica di connessione e proviamo ad avviare l’applicazione per verificare che non ci siano errori.

**Milestone 2**
* Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON
* Verifichiamo su Postman che la risposta sia corretta

**Milestone 3**
* Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database
* Verifichiamo su Postman che la chiamata non dia errore e risponda 204
* Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso

**Milestone 4**
* Facciamo sì che l’API di SHOW restituisca il post desiderato in formato JSON
* Verifichiamo su Postman che la risposta sia corretta

**Bonus:**
* Far sì che la SHOW restituisca il post comprensivo di tag, recuperandoli grazie alla relazione tra post e tags, esistente sul database



## Tech stack

### Frontend

#### Linguaggi
1. HTML
2. CSS
3. JS

#### Librerie
1. Bootstrap
2. Axios

#### Frameworks
1. Vite
2. React

<br /> 
<hr />

### Backend

#### Linguaggi
1. JS (NodeJS)

#### Librerie
1. Bootstrap
2. Axios

#### Frameworks
1. expressJS
2. NodeJS


<br /> 
<hr />

### DB

#### Linguaggi
1. SQL

#### DBMS
1. mySQL


<br /> 
<hr />

<br /> 

#### Bugs noti e da controllare o sistemare:
1. Creazione di un nuovo post la prima volta che viene aperto tutto: ottengo risposta corretta, ma a quanto pare il post non viene salvato davvero.
<br /> 
Le volte successive invece il post correttamente. 
<br /> 
`DA CONTROLLARE` (*Forse in React, forse in CreatePostPage*)