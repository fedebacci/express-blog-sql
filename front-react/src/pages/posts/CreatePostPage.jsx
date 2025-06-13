import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import pages from "../../assets/js/data/pages";


const apiUrl = 'http://localhost:3000/posts';




const postInitialData = {
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








export default function CreatePostPage () {

    const [postData, setPostData] =  useState({ ...postInitialData });
    const navigate = useNavigate();



    // todo: SI RIPETE, DECIDERE SE DICHIARARLA FUORI E PASSARLA NEI COMPONENTI
    const handleInputChange = (e) => {
        if (e.target.type === "checkbox") {
            const isChecked = e.target.checked;
            const value = e.target.value;

            if (isChecked) {
                const newTags = [ ...postData.tags, value ];                
                setPostData({ ...postData, tags: newTags});
            } else {
                const newTags = [ ...postData.tags ].filter(tag => tag != value);
                setPostData({ ...postData, tags: newTags});
            };

            return;
        };
        setPostData({ ...postData, [e.target.name]: e.target.value});
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(apiUrl, postData)
            .then(response => {
                setPostData({ ...postInitialData });
                navigate(pages.SHOWPOST(response.data.newPost.id));
            })
            .catch(error => {
                console.error(error);
            });
    };





    return (
        <main>
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <Link className="btn btn-primary" to="/posts">
                            Torna alla lista
                        </Link>
                        <h2>
                            Create new Post
                        </h2>


                        <form>
                            <div className="mb-3">
                                <label htmlFor="postTitle" className="form-label">
                                    * Post title
                                </label>
                                <input 
                                    value={postData.title}
                                    onChange={handleInputChange}
                                    name="title"
                                    required

                                    type="text" 
                                    className="form-control" 
                                    id="postTitle" 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="postImage" className="form-label">
                                    * Post image URL
                                </label>
                                <input 
                                    value={postData.image}
                                    onChange={handleInputChange}
                                    name="image"
                                    required

                                    type="text" 
                                    className="form-control" 
                                    id="postImage" 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="postContent" className="form-label">
                                    * Post content
                                </label>
                                <textarea 
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    name="content"
                                    required

                                    className="form-control" 
                                    id="postContent" 
                                    rows="5"
                                >
                                </textarea>
                            </div>



                            <div className="mb-3">

                                {
                                    possibleTags.map(tag => {
                                        return (
                                            <div className="form-check" key={tag.id}>
                                                <input 
                                                    onChange={handleInputChange}
                                                    checked={postData.tags.includes(tag.text)}
                                                    value={tag.text} 

                                                    id={`check-${tag.text}`} 

                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                />
                                                <label className="form-check-label" htmlFor={`check-${tag.text}`}>
                                                    {tag.text}
                                                </label>
                                            </div>
                                        )
                                    })
                                }

                            </div>


                            <button 
                                onClick={handleSubmit}

                                type="submit" 
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};