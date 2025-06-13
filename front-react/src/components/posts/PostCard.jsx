import { Link } from "react-router-dom";



import pages from "../../assets/js/data/pages";




export default function PostCard ({ post }) {
    return (
        <div className="col">
            <div className="card shadow h-100" data-id={post.id}>
                <div className="card-header p-0 overflow-hidden">
                    <img src={post.image} alt={post.title} />
                </div>
                <div className="card-body">
                    <h6>
                        <strong>
                            {post.title}
                        </strong>
                    </h6>
                    <p>
                        {post.content}
                    </p>
                    <Link to={pages.MODIFYPOST(post.id)}>
                        Modifica post
                    </Link>
                </div>
            </div>
        </div>
    );
};