import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import useApplication from '@/hooks/useApplication';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import Swal from 'sweetalert2';
import './detail.css';
import axios from 'axios';

type ProductData = {
    id: number;
    name: string;
    price: number;
    color: string;
  
    size: number;
    description: string;
    quantity: number;
};

type BranchData = {
    idBranch: number;
    nameBranch: string;
};

type ImageData = {
    id: number;
    linkImage: string;
};

function Detail(): JSX.Element {
    const navigate = useNavigate();
    const popup = withReactContent(Swal);
    const useApp = useApplication();
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ProductData>({
        id: 0,
        name: '',
        price: 0,
        color: '',
      
        size: 0,
        description: '',
        quantity: 0,
    });
    const [branch, setBranch] = useState<BranchData>({
        idBranch: 1,
        nameBranch: '',
    });
    const [listImage, setListImage] = useState<ImageData[]>([]);
    const [image, setImage] = useState({ image: '', index: 1 });
    const [active, setActive] = useState('DETAIL');

    const addItem = () => {
        setData({ ...data, quantity: data.quantity + 1 });
    };
    const subItem = () => {
        if (data.quantity > 1) setData({ ...data, quantity: data.quantity - 1 });
    };
    const addCart = () => {
        useApp.addItemDetail(data);
        popup
            .fire({
                icon: 'success',
                title: 'Thêm vào giỏ hàng thành công',
                text: 'Đi đến giỏ hàng để kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: 'Kiểm tra giỏ hàng',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    navigate('/pagecart');
                }
            });
    };

    useEffect(() => {
        setLoading(true);
        // Tìm kiếm sản phẩm theo ID
        try {
            axios.get(`${import.meta.env.VITE_APP_ENV}/findProductById?id=${id}`).then((response) => {
                const data = response.data;
                // let object = {...data.data[0] ,quantity:1}
                const object = { ...data.data[0], quantity: 1 };
                setData(object);
                setBranch(data.data[1]);
                setListImage(data.data[2]);
                setImage({ ...image, image: data.data[2][0].linkImage });
                console.log(data.data);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [id]);
    const click = (image: { image: string; index: number }) => {
        setImage(image);
    };
    const clickActive = (text: string) => {
        setActive(text);
    };

    return (
        <div className="detail-product">
           
                    <div className="d-flex content-product">
                        <div>
                            <div className="img-product">
                                <img src={image.image.length === 0 ? '' : image.image} />
                            </div>
                            <div className="d-flex mt-4 justify-content-center">
                                <div
                                    onClick={() =>
                                        click({ image: listImage.length === 0 ? '' : listImage[0].linkImage, index: 1 })
                                    }
                                    className={`imgs-product me-2 ${image.index === 1 ? 'active' : ''}`}
                                >
                                    <img src={listImage.length === 0 ? '' : listImage[0].linkImage} />
                                </div>

                                <div
                                    onClick={() =>
                                        click({ image: listImage.length === 0 ? '' : listImage[1].linkImage, index: 2 })
                                    }
                                    className={`imgs-product me-2 ${image.index === 2 ? 'active' : ''}`}
                                >
                                    <img src={listImage.length === 0 ? '' : listImage[1].linkImage} />
                                </div>
                                <div
                                    onClick={() =>
                                        click({ image: listImage.length === 0 ? '' : listImage[2].linkImage, index: 3 })
                                    }
                                    className={`imgs-product me-2 ${image.index === 3 ? 'active' : ''}`}
                                >
                                    <img src={listImage.length === 0 ? '' : listImage[2].linkImage} />
                                </div>
                            </div>
                        </div>
                        <div className="ms-5" style={{ lineHeight: '3.5' }}>
                            <h2>{data.name}</h2>
                            <div className="d-flex">
                                <div className="me-3"> Brand :</div>
                                <strong>{branch.nameBranch}</strong>
                            </div>
                            <h3 style={{ color: '#D23F57' }}>
                                {' '}
                                {(data.price + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')} vnd
                            </h3>
                            <div>Còn hàng</div>
                            <div className="d-flex align-items-center">
                               
                                <div onClick={subItem} className="descre" style={{ fontSize: '35px' }}>
                                    -
                                </div>
                                <div className="me-4 " style={{ fontSize: '25px' }}>
                                    {data.quantity}
                                </div>
                                <div onClick={addItem} className="incre me-4" style={{ fontSize: '25px' }}>
                                    +
                                </div>
                            </div>
                            <div className="mt-5">
                                <button
                                    onClick={addCart}
                                    type="button"
                                    className="btn btn-danger pe-5 ps-5 pt-3 pb-3 ms-0"
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ul style={{ width: '80%', margin: 'auto' }} className="nav nav-tabs mt-5">
                            <li className="nav-item" style={{ cursor: 'pointer' }}>
                                <div
                                    onClick={() => clickActive('DETAIL')}
                                    className={active === 'DETAIL' ? 'nav-link active' : 'nav-link'}
                                >
                                    Thông tin chi tiết
                                </div>
                            </li>
                            <li className="nav-item" style={{ cursor: 'pointer' }}>
                                <div
                                    onClick={() => clickActive('DESCRIPTION')}
                                    className={active === 'DESCRIPTION' ? 'nav-link active' : 'nav-link'}
                                >
                                    Mô tả
                                </div>
                            </li>
                        </ul>
                        <div className="display-detail">
                            {active === 'DETAIL' ? (
                                <>
                                    {Object.keys(data).length === 0 ? (
                                        ''
                                    ) : (
                                        <ul className="pt-3 ms-5" style={{ lineHeight: '2' }}>
                                            <li>Tên sản phẩm :{data.name}</li>
                                            <li>
                                                Giá : {(data.price + ' ').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}{' '}
                                                vnd
                                            </li>
                                            <li>Màu sắc : {data.color}</li>
                                            
                                            <li>Kích cỡ : {data.size}</li>
                                            <li>
                                                Thương hiệu : {branch.nameBranch.length === 0 ? '' : branch.nameBranch}
                                            </li>
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="description pt-3 ms-5">{data.description}</div>
                                </>
                            )}
                        </div>
                    </div>
             
      
        </div>
    );
}

export default Detail;
