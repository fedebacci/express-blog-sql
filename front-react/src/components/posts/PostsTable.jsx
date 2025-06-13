import PostTableRowElement from "./PostTableRowElement";

export default function PostsTable ({ posts, handleDelete }) {
    return (
        posts.length > 0 ?
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        TITLE
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    posts.map(post => {
                        return (
                            <PostTableRowElement 
                                id={post.id}
                                title={post.title}
                                handleDelete={handleDelete}
                            />
                        )
                    })
                }
            </tbody>
        </table>
        :
        <div className="col-12">
            <h5>
                Nessun post da visualizzare
            </h5>
        </div>
    );
};