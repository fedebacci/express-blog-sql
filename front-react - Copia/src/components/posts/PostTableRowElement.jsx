import { Link } from "react-router-dom";
import pages from "../../assets/js/data/pages";







export default function PostTableRowElement ({ id, title, handleDelete }) {



    return (
        <tr key={id}>
            <td>
                {id}
            </td>
            <td>
                <Link to={pages.SHOWPOST(id)}>
                    {title}
                </Link>
            </td>
            <td>
                <Link className="btn btn-primary me-1" to={pages.MODIFYPOST(id)}>
                    Modifica
                </Link>

                <button 
                    onClick={() => handleDelete(id)}
                    className="btn btn-danger"
                >
                    Elimina
                </button>
            </td>
        </tr>
    );
};