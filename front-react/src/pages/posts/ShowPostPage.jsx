import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import pages from "../../assets/js/data/pages";



const apiUrl = 'http://localhost:3000/posts'



let prevPostId = null;
let nextPostId = null;


export default function ShowPostPage () {

    const { id } = useParams();
    
    const [post, setPost] = useState({});
    const [currentPostId, setCurrentPostId] = useState(id);

    const navigate = useNavigate();



    const fetchPost = (postId) => {
        axios
            .get(apiUrl + '/' + postId)
            .then(response => {
                prevPostId = response.data.prevPost;
                nextPostId = response.data.nextPost;
                setPost(response.data.post);
                navigate(pages.SHOWPOST(postId));
            })
            .catch(error => {
                console.error(error);

                navigate('/not-found');
            })
    }


    useEffect(() => {
        fetchPost(id);
    }, [])

    useEffect(() => {
        fetchPost(currentPostId);
    }, [currentPostId])


    



    return (
        <main>
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <Link className="btn btn-primary mb-1" to={pages.POSTS()}>
                            Torna alla lista
                        </Link>

                        <br />


                        {
                            <button 
                                disabled={prevPostId == undefined} 
                                onClick={() => setCurrentPostId(prevPostId)} 
                                className="btn btn-secondary me-1"
                            >
                                Post precedente
                            </button>
                        }
                        {
                            <button 
                                disabled={nextPostId == undefined} 
                                onClick={() => setCurrentPostId(nextPostId)} 
                                className="btn btn-secondary me-1"
                            >
                                Post successivo
                            </button>
                        }







                        {
                            !post.id ? 
                                <p>
                                    Post non trovato
                                </p>
                            : 
                            <>
                                <h2 className="text-center">
                                    {post.title}
                                </h2>
                                <div className="text-center my-3">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 

                                        className="post-image"
                                    />
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
                                </p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};