import { Link } from "react-router-dom";

export default function NotFoundPage () {
    return (
        <main>
            <div className="container my-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">
                            Pagina non trovata
                        </h2>
                        <p className="text-center">
                            <Link to="/">
                                Torna alla homepage
                            </Link>
                        </p>
                        <p className="text-center">
                            <Link to="/posts">
                                Torna alla lista dei post
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};