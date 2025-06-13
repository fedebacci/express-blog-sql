import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import pages from "../../assets/js/data/pages";



import PostsList from "../../components/posts/PostsList";
import PostsTable from "../../components/posts/PostsTable";





const apiUrl = 'http://localhost:3000/posts'








export default function PostsPage () {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(apiUrl)
            .then(response => {
                // console.info(response.data);
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])



    const deletePost = (id) => {
        axios
            .delete(apiUrl + '/' + id)
            .then(response => {
                console.info(response);
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error(error);
            });
    };




    return (
        <main>
            <div className="container my-3">


                {/* <div className="row g-3">
                    <div className="col-12">
                        <h2 className="text-center">
                            Posts
                        </h2>
                    </div>

                    <PostsList posts={posts} />
                </div> */}


                <div className="row g-3">
                    <div className="col-12">
                        <h2 className="text-center">
                            Posts
                        </h2>

                        <Link to="/posts/create" className="btn btn-primary mb-3">
                            Crea nuovo post
                        </Link>

                        <PostsTable
                            posts={posts}
                            handleDelete={deletePost}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};