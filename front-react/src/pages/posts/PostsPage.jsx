import { Link } from "react-router-dom";



import PostsList from "../../components/posts/PostsList";
import PostsTable from "../../components/posts/PostsTable";







export default function PostsPage () {

    return (
        <main>
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <h2 className="text-center">
                            Posts
                        </h2>

                        <Link to="/posts/create" className="btn btn-primary mb-3">
                            Crea nuovo post
                        </Link>

                        <PostsTable />
                        {/* <PostsList /> */}
                    </div>
                </div>
            </div>
        </main>
    );
};