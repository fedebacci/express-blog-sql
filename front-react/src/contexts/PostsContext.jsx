import { createContext, useContext, useState, useEffect } from "react";

import pages from "../assets/js/data/pages";

import axios from "axios";

import { useAlert } from "./AlertContext";


const PostsContext = createContext();


// const apiUrl = 'http://localhost:3000/posts';
const apiUrl = import.meta.env.VITE_API_URL + '/posts';
const newPostInitialData = {
    title: "",
    image: "",
    content: "",
    tags: [],
};
const possibleTags = [
    {
        id: 1, 
        text: "Antipasti"
    },
    {
        id: 2, 
        text: "Primi piatti"
    },
    {
        id: 3, 
        text: "Dolci veloci"
    },
    {
        id: 4, 
        text: "Ricette veloci"
    },
    {
        id: 5, 
        text: "Dolci"
    },
    {
        id: 6, 
        text: "Dolci al cioccolato"
    },
    {
        id: 7, 
        text: "Ricette vegetariane"
    },
    {
        id: 8, 
        text: "Torte"
    },
    {
        id: 9, 
        text: "Ricette al forno"
    },
];







function PostsProvider ({ children }) {
    
    const [posts, setPosts] = useState([]);

    const { showAlert } = useAlert();

    /**
     * Funzione che richiede l'intera lista dei post al server
     * Se ha successo esegue setPosts
     */
    const fetchPosts = () => {
        axios
            .get(apiUrl)
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error(error);
            })
    }


    useEffect(() => {
        fetchPosts();
    }, [])


    /**
     * Funzione che riceve un ID e esegue la richiesta delete per l'ID ricevuto.
     * Se ha successo esegue setPosts, passandogli la nuova lista di post ricevuta
     * @param {number} id Id del post da cancellare
     */
    const deletePost = (id) => {
        axios
            .delete(apiUrl + '/' + id)
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error(error);
            });
    };

    /**
     * Funzione che riceve i dati del nuovo post e la funzione per gestire la navigazione e esegue la richiesta per creare il nuovo post.
     * Se ha successo esegue prima setPosts, passandogli la nuova lista di post ricevuta, poi esegue la funzione per la navigazione al post appena creato
     * @param {object} postData Dati del nuovo post da creare
     * @param {function} handleNavigation Funzione per navigare all'ID ricevuto dalla risposta alla richiesta di creazione
     */
    const createPost = (postData, handleNavigation) => {
        axios
            .post(apiUrl, postData)
            .then(response => {
                setPosts(response.data.posts);
                handleNavigation(pages.SHOWPOST(response.data.newPost.id));
            })
            .catch(error => {
                showAlert("C'è stato un errore con la creazione del post", "danger");
                console.error(error);
            });
    };



    const postsHandler = {
        posts,
        newPostInitialData,
        possibleTags,
        fetchPosts,
        deletePost,
        createPost
    }





    return (
        <PostsContext.Provider value={postsHandler}>
            {children}
        </PostsContext.Provider>
    );
};



function usePosts () {
    return useContext(PostsContext);
};



export { PostsProvider, usePosts };