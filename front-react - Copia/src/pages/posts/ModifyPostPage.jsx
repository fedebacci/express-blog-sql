import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import pages from "../../assets/js/data/pages";



const apiUrl = 'http://localhost:3000/posts'




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
]





export default function ModifyPostPage () {

    // const params = useParams();
    // console.log(params);


    const { id } = useParams();
    // console.log(id);
    const navigate = useNavigate();

    const [post, setPost] = useState({});
    const [postData, setPostData] = useState({});

    useEffect(() => {
        axios
            .get(apiUrl + '/' + id)
            .then(response => {
                // console.info(response.data);
                setPost(response.data.post);
                setPostData(response.data.post);
            })
            .catch(error => {
                console.error(error);

                navigate('/not-found');
            })
    }, [])





    // todo: SI RIPETE, DECIDERE SE DICHIARARLA FUORI E PASSARLA NEI COMPONENTI
    const handleInputChange = (e) => {
        if (e.target.type === "checkbox") {
            // return setPostData({ ...postData, [e.target.name]: e.target.value});
            const isChecked = e.target.checked;
            const value = e.target.value;

            // console.info("isChecked", isChecked);
            // console.info("value", value);
            // console.info("postData", postData);
            // console.info("postData.tags", postData.tags);
            
            if (isChecked) {
                const newTags = [ ...postData.tags, value ];
                postData.tags.push(value);
                // console.info("newTags", newTags);
                setPostData({ ...postData, tags: newTags});
            } else {
                const newTags = [ ...postData.tags ].filter(tag => tag != value);
                // console.info("newTags", newTags);
                setPostData({ ...postData, tags: newTags});
            }

            return;
        }
        setPostData({ ...postData, [e.target.name]: e.target.value});
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        // console.info(post);
        // console.info(postData);
        // console.info(post === postData);

        console.info(apiUrl + '/' + id);

        if (post !== postData) {
            axios
                .patch(apiUrl + '/' + id, postData)
                .then(response => {
                    // console.info(response.data);
                    navigate(pages.SHOWPOST(response.data.post.id));
                })
                .catch(error => {
                    console.error(error);
                })
        }
    } 






    return (
        <main>
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">

                        <Link className="btn btn-primary" to="/posts">
                            Torna alla lista
                        </Link>


                        {
                            !post.id ? 
                                <p>
                                    Post non trovato
                                </p>
                            : 
                                <>
                                    {/* <h2 className="text-center">
                                        Modifica: {post.title} ({post.id})
                                    </h2> */}
                                    {/* RIMPIAZZO TEMPORANEAMENTE LA PORTA NELL'URL DELLE IMMAGINI PER VEDERLE SENZA ERRORI */}
                                    {/* todo: SISTEMARE */}
                                    {/* <div className="text-center my-3">
                                        <img src={post.image.replaceAll('3000', '5173')} alt={post.title} />
                                    </div>
                                    <p>
                                        {
                                            post.tags.length > 0 ?
                                            post.tags.map((tag, index) => {
                                                return (
                                                    <span key={index} className="badge text-bg-primary me-1">
                                                        {tag}
                                                    </span>
                                                )
                                            })
                                            :
                                            ""
                                        }
                                    </p>
                                    <p>
                                        {post.content}
                                    </p> */}



                                    <h3>
                                        Modifica il post: {post.title}
                                    </h3>
                                    <form>
                                        {/* <div className="mb-3">
                                            <label for="postTitle" className="form-label">
                                                Post title
                                            </label>
                                            <input type="text" className="form-control" id="postTitle" aria-describedby="postTitleHelp" />
                                            <div id="postTitleHelp" className="form-text">
                                                We'll never share your email with anyone else.
                                            </div>
                                        </div> */}



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
                                                Post image URL
                                            </label>
                                            <textarea 
                                                value={postData.image}
                                                onChange={handleInputChange}
                                                name="image"
                                                required

                                                className="form-control" 
                                                id="postImage" 
                                                rows="5"
                                            >
                                            </textarea>
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


                                </>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};