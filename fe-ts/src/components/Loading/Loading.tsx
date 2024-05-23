import './loading.css';
import loading from '@/assets/Image/loading.gif';
function Loading(): JSX.Element {
    return (
        <div className="shoe-loading">
            <div className="container-loading">
                <img src={loading} />
            </div>
        </div>
    );
}
export default Loading;
