// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO




// # IMMEDIATO!
// todo: sostituire con riferimento a db come visto a lezione
// let { posts } = require('../data/db');

const connection = require("../data/db")





const index = (req, res) => {
    

    // todo: RICREARE GESTIONE DEI FILTRI (E AGGIUNGERE POSSIBILITA FILTRAGGIO SU FRONTEND)
    // * GESTIONE VECCHIA DEI FILTRI DA IMPLEMENTARE
    // let { title, content, tags, filterAll } = req.query
    // if (tags) tags = tags.split(', ');
    // filterAll = filterAll === "false" ? false : true;

    // let filteredPosts = [...posts];

    // if (filterAll === false) {
    //     filteredPosts = [];
    //     posts.forEach(post => {
    //         let containsTags = false;
    //         tags?.forEach(tag => {
    //             if (post.tags.includes(tag)) containsTags = true;
    //         });
            
    //         if (post.title?.includes(title) || post.content?.includes(content) || containsTags === true) {
    //             filteredPosts.push(post);
    //         };
    //     })
    // } else {
    //     if (title) {
    //         filteredPosts = filteredPosts.filter(post => post.title.includes(title));
    //     };
    
    //     if (content) {
    //         filteredPosts = filteredPosts.filter(post => post.content.includes(content));
    //     };
        
    //     if (tags) {
    //         tags.forEach(tag => {
    //             filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
    //         });
    //     };
    // };

    // if (filteredPosts.length === 0) {
    //     const error = new Error(`I filtri utilizzati escludono tutti i post. Prova a modificare i filtri e riprova.`);
    //     error.statusCode = 404;
    //     throw error;
    // };

    // res
    //     .json({   
    //         description: "Lista dei post",
    //         posts: filteredPosts



    const sql = "SELECT * FROM `posts`";

    connection.query(sql, (err, results) => {
        // if (err) throw new Error("Errore nella richiesta a DB index");
        if (err) throw error;

        res
            .json({
                status: 200,
                description: "Lista dei post DA DB",
                posts: results
            });
        
    })
};



const show = (req, res) => {
    
    
    // const id = parseInt(req.params.id);
    // // console.log(`show: ${id}`);


    // const post = posts.find(post => post.id === id);
    // console.log('show', post)

    // if (!post) {
    //     const error = new Error(`Visualizzazione dettagli del post ${id} fallita: Post non trovato`);
    //     error.statusCode = 404;
    //     throw error;
    // };

    // const prevPost = posts[posts.indexOf(post) - 1]?.id;
    // const nextPost = posts[posts.indexOf(post) + 1]?.id;

    // res
    //     .json({
    //         description: `Visualizzazione dettagli del post ${id}`,
    //         posts,
    //         post,
    //         prevPost,
    //         nextPost,
    //     });


    console.log(`show: ${req.params.id}`);
    const postId = parseInt(req.params.id);

    const sql = `
        SELECT 
            * 
        FROM \`posts\` 
        WHERE id = ?
    `;

    connection.query(sql, [postId], (err, results) => {
        if (err) throw err;


        console.log("post", results[0]);
        const post = results[0];

        // # TEMPORANEO
        // todo: CAPIRE MODO MIGLIORE PER SISTEMARE
        // back-express\public\imgs\posts
        post.image = `/imgs/posts/${post.image.replace('avif', 'jpeg')}`;


        const tagsSql = `
            SELECT
                *
            FROM \`tags\`

            INNER JOIN \`post_tag\`
            ON \`tags\`.\`id\` = \`post_tag\`.\`tag_id\`
            
            WHERE \`post_tag\`.\`post_id\` = ?
        `
        connection.query(tagsSql, [postId], (err, results) => {
            if (err) throw err;

            console.log("tags", results);

            post.tags = results;

            res
                .json({
                    description: `Visualizzazione dettagli del post ${postId}`,
                    // posts: [],
                    post,
                    // todo: REINSERIRE SISTEMA PER NAVIGAZIONE A PRECEDENTE O SUCCESSIVO
                    // prevPost: null,
                    // nextPost: null,
                });
        });
    });





};



const create = (req, res) => {

    
    // console.log(req.body);
    const { title, content, image, tags } = req.body;
    // console.log('create', req.body)

    const elementsWithError = [];
    // if (!title || typeof(title) !== "string" || title.length <= 3) {
    if (!title || typeof(title) !== "string") {
        elementsWithError.push("title");
    };
    if (!image || typeof(image) !== "string") {
        elementsWithError.push("image");
    };
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
        elementsWithError.push("tags");
    };
    // console.log("elementsWithError", elementsWithError);
    // console.log(elementsWithError);
    if (elementsWithError.length) {
        const error = new Error(`An error has occured with your request`);
        // * STATUS 400 (BAD REQUEST)
        error.statusCode = 400;
        error.data = elementsWithError;
        throw error;
    };

    let maxId = 0;
    for (const post of posts) {
        // console.log(`maxId: ${maxId}, postId: ${post.id}`);
        // console.log(`maxId: ${maxId}, postId: ${post.id}`, post);
        if (post.id > maxId) maxId = post.id;
    };
    // console.log(`maxId PRIMA DI ASSEGNAZIONE: ${maxId}`);
    const newPost = { id: maxId + 1, title, content, image, tags };
    posts.push(newPost);

    // * REINVIO IL NUOVO POST PER METTERE A DISPOSIZIONE DEL CLIENT ANCHE L'ID (E EVENTUALI MANIPOAZIONI DEI DATI ESEGUITE QUI SUL SERVER)
    res
        // * STATUS 201 (CREATO CON SUCCESSO)
        .status(201)
        .json({
            message: `Creazione di un nuovo post`,
            posts,
            newPost
        });
};




const update = (req, res) => {
    const id = parseInt(req.params.id);
    const originalPost = posts.find(post => post.id === id);
    // console.log('update', originalPost)

    if (!originalPost) {
        // res
        //     .status(404)
        //     .json({
        //         error: "404 Not found",
        //         message: "Modifica totale del post " + id + " fallita: Post non trovato"
        //     });
            
        // return;

        const error = new Error(`Modifica totale del post ${id} fallita: Post non trovato`);
        error.statusCode = 404;
        throw error;
    };

    const { title, content, image, tags } = req.body;
    // * ES: NULL-COALESCING OPERATOR
    // const title = title ? title : originalPost.title;
    // const title = title ?? originalPost.title;
    // const content = content ?? originalPost.content;
    // const image = image ?? originalPost.image;
    // const tags = tags ?? originalPost.tags;

    const elementsWithError = [];
    if (!title || typeof(title) !== "string" || title.length <= 3) {
        elementsWithError.push("title");
    };
    if (!image || typeof(image) !== "string") {
        elementsWithError.push("image");
    };
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
        elementsWithError.push("tags");
    };
    if (elementsWithError.length) {
        const error = new Error(`An error has occured with your request`);
        // * STATUS 400 (BAD REQUEST)
        error.statusCode = 400;
        error.data = elementsWithError;
        throw error;
    };

    const updatedPost = { id, title, content, image, tags };
    // posts[posts.indexOf(post)] = updatedPost;
    posts.splice(posts.indexOf(originalPost), 1, updatedPost);

    res
        .json({
            message: `Modifica totale del post ${id}`,
            // posts
            updatedPost
        });
};




const modify = (req, res) => {
    const id = parseInt(req.params.id);
    const originalPost = posts.find(post => post.id === id);
    // console.log('modify', originalPost)

    if (!originalPost) {
        // res
        //     .status(404)
        //     .json({
        //         error: "404 Not found",
        //         message: "Modifica parziale del post " + id + " fallita: Post non trovato"
        //     });
            
        // return;

        const error = new Error(`Modifica parziale del post ${id} fallita: Post non trovato`);
        error.statusCode = 404;
        throw error;
    };

    const { title, content, image, tags } = req.body;

    const elementsWithError = [];
    if (title && (typeof(title) !== "string" || title.length <= 3)) {
        elementsWithError.push("title");
    };
    if (content && (typeof(content) !== "string")) {
        elementsWithError.push("content");
    };
    if (image && (typeof(image) !== "string")) {
        elementsWithError.push("image");
    };
    if (tags && (!Array.isArray(tags) || tags.length === 0)) {
        elementsWithError.push("tags");
    };
    if (elementsWithError.length) {
        const error = new Error(`An error has occured with your request`);
        // * STATUS 400 (BAD REQUEST)
        error.statusCode = 400;
        error.data = elementsWithError;
        throw error;
    };

    if (title) originalPost.title = title;
    if (content) originalPost.content = content;
    if (image) originalPost.image = image;
    if (tags) originalPost.tags = tags;

    res
        .json({
            message: `Modifica parziale del post ${id}`,
            // posts,
            // originalPost,
            post: { id, title, content, image, tags }
        });
};




const destroy = (req, res) => {
    console.log(`destroy: ${req.params.id}`)


    // todo: TENGO QUESTI COMMENTI COME ESEMPIO PER QUANDO SVOLGERO LA TODO SOTTO RELATIVAMENTE ALLA SELECT DOPO LA DELETE
    // const id = parseInt(req.params.id);
    // const post = posts.find(post => post.id === id);
    // // console.log('destroy', post)

    // if (!post) {
    //     const error = new Error(`Cancellazione del post ${id} fallita: Post non trovato`);
    //     error.statusCode = 404;
    //     throw error;
    // };

    // // posts = posts.filter(post => post.id !== id);
    // // * MIGLIORE IN TERMINI COMPUTAZIONALI
    // posts.splice(posts.indexOf(post), 1);
    // // console.log("posts DOPO LA RIMOZIONE:", posts);

    // res
    //     // // * STATUS "OK (SENZA CONTENUTO)" perchè non ho contenuto da mostrare indietro
    //     // .status(204)
    //     // .send();
    //     .json({
    //         description: "Cancellazione del post " + id + " riuscita",
    //         posts
    //     });



    const postId = req.params.id;

    // * DEBUG
    // const sql = "SELECT * FROM `posts` WHERE id = ?";
    const sql = "DELETE FROM `posts` WHERE id = ?";

    connection.query(sql, [postId], (err, results) => {
        if (err) throw err;

        const postsAfterDeleteSql = "SELECT * FROM POSTS";
        connection.query(postsAfterDeleteSql, (err, results) => {
            if (err) throw err;

            res
                // todo: SOLITAMENTE SI RISPONDE CON 204, IO AVEVO LASCIATO ORIGINARIAMENTE JSON PER AVERE LOG (prima di avere frontend) E HO QUINDI FATTO FRONTEND SECONDO QUESTA LOGICA
                // todo: MODIFICARE QUINDI FRONTEND PER GESTIRE CAMBIAMENTO DELL'ARRAY DEI POSTS INVECE DI ESEGUIRE NEL BACKEND LA SELECT DAL DB PER I POST DOPO LA CANCELLAZIONE, ASSEGNANDOLA E BASTA NEL FRONTEND
                // // * STATUS "OK (SENZA CONTENUTO)" perchè non ho contenuto da mostrare indietro
                // .status(204)
                // .send();
                .json({
                    description: "Cancellazione del post riuscita",
                    posts: results
                });
        });

    })
};




module.exports = {
    index, show, create, update, modify, destroy
};