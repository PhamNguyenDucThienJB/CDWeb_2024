import { useNavigate } from 'react-router-dom';
import useApplication from '../../hooks/useApplication';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import './shop.css';
import './lib.css'

type ListItem = {
    idProduct: string | number;
    thumbnail: string | unknown;
    name: string;
    price: string | unknown;
};

function Shop({ list }: ListItem | any) {
    const navigate = useNavigate();
    const useApp = useApplication();
    const popup = withReactContent(
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        }),
    );

    const addCart = (item: any) => {
        useApp.addItem(item);
        popup.fire({
            icon: 'success',
            title: 'Thêm vào giỏ hàng thành công ',
        });
    };
    return (
        <div className="cards mb-5">
            {list.map((item: any) => (
                <div key={item.idProduct} className="card-item ">
                    <div onClick={() => navigate(`/detail/${item.idProduct}`)} className="img-item mb-5">
                        <img src={item.thumbnail} alt="" />
                    </div>

                    <h6 className="mt-2 mb-3 "> {item.name}</h6>
                    <span className="d-block" style={{ color: '#d23f57', fontSize: '18px' }}>
                        {(item.price + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')} <sup>vnd</sup>
                    </span>
                    <button
                        onClick={() => addCart(item)}
                        type="button"
                        className="btn btn-primary btn-add-to-cart"
                        style={{ width: 'calc(100% - 20px)', position: 'absolute', bottom: '10px', left: '10px' }}
                    >
                        <i className="fa-solid fa-bag-shopping d-inline-block me-2"></i>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            ))}
        </div>
    );
}
export default Shop;
