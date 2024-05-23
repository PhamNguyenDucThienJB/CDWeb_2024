import { Link } from 'react-router-dom';

function Error404Page() {
    return (
        <div className="container-page-not-found">
            <div className="c">
                <div className="_404">404</div>
                <div className="_1">THE PAGE</div>
                <div className="_2">WAS NOT FOUND</div>
                <Link to="/home">
                    <button className="btn-back-home">Back to Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Error404Page;
