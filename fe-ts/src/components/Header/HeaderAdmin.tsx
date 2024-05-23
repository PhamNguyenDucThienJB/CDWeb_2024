import { MutableRefObject, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '@/assets/Image/logo.png';
import './header.css';
import './lib.css';
import useApplication from '@/hooks/useApplication';
import axios from 'axios';

function HeaderAdmin() {
    const navigate = useNavigate();
    const [show, setShow] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [list, setList] = useState<any>([]);
    const user = useApplication();
    const idSetTimeOut = useRef<NodeJS.Timeout | null>(null) as MutableRefObject<NodeJS.Timeout | null>;
    const [spiner, setSpiner] = useState(false);

    const computeQuantity = () => {
        let count = 0;
        user.cart.forEach((p) => {
            count += p.quantity;
        });
        return count;
    };
    // xử lí tìm kiếm sản phẩm
    const inputSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value.trim());
        try {
            if (event.target.value.trim().length === 0) {
                setShow(false);
            } else {
                setShow(true);
                if (idSetTimeOut.current) {
                    clearTimeout(idSetTimeOut.current);
                }

                idSetTimeOut.current = setTimeout(async () => {
                    setSpiner(true);
                    try {
                        // Xử lí tìm kiếm sản phẩm GET
                        const res = await axios.get(`${import.meta.env.VITE_APP_ENV}/searchAutoComplete`, {
                            params: {
                                value: event.target.value.trim(),
                            },
                        });
                        if (res.data.message === 'oke') {
                            setSpiner(false);
                            setShow(true);
                            setList(res.data.data);
                        }
                    } catch (error) {
                        setSpiner(false);
                        setShow(true);
                        setList([]);
                        console.log(error);
                    }
                }, 1500);
            }
        } catch (error) {
            console.error("Không tìm thấy " + error);
        }
    };

    const handleClickIconSearch = () => {
        if (search.length !== 0) {
            setShow(false);
            navigate(`/shop?search=${search}`);
        }
    };
    const handleClickItem = (item: any) => {
        setShow(false);
        navigate(`/detail/${item.idProduct}`);
        setSearch('');
    };

    const handleActiveClick = () => {
        setActive(!active);
    };

    const handleLogOut = () => {
        sessionStorage.removeItem('user');
        user.setUserEmpty();
        navigate('/');
    };
    console.log('USER ROLE' + user.user);
    return (
        <div className="header">
            <div onClick={handleActiveClick} className="menu-navigation">
                <i className="fa-solid fa-bars fa-2x"></i>
            </div>
            <div className="header-logo">
                <a className="logo" href="#">
                    <img src={logo} alt="" />
                </a>
            </div>
            <div className={active ? 'header-navigation' : 'header-navigation active'}>
                <div className="navigation-logo">
                    <div onClick={handleActiveClick} className="close-btn">
                        <i className="fa-solid fa-xmark fa-2x"></i>
                    </div>
                    <div className="logo-close">
                        <div>
                            <img src={logo} alt="" />
                        </div>

                        <span>Nguyen Duc</span>

                        <div className="bag-responsive">
                            <i className="fa-solid fa-bag-shopping icon-bag"></i>
                            <span className="item-shopping">{computeQuantity()}</span>
                        </div>
                    </div>
                </div>
                <hr className="hr-navigation" />
                <ul style={{ marginBottom: '0px' }}>
                    <li>
                        {' '}
                        <Link to={'/home'}>Trang chủ</Link>
                    </li>
                   
                </ul>
            </div>

            <div className="header-search">
                <div className="search">
                    <input
                        onInput={inputSearch}
                        className="input-search"
                        type="text"
                        name="search"
                        id=""
                        value={search}
                        placeholder="Tìm kiếm"
                    />
                    <i onClick={handleClickIconSearch} className="fa-solid fa-magnifying-glass"></i>
                    <ul
                        style={{ maxHeight: '300px', overflowX: 'auto' }}
                        className={show ? 'search-auto-complete show' : 'search-auto-complete'}
                    >
                        {spiner ? (
                            <div className="text-center">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {list.length === 0 ? (
                                    <div className="p-2 text-center">Không tìm thấy kết quả</div>
                                ) : (
                                    <>
                                        {list.map((item: any) => (
                                            <>
                                                <li onClick={() => handleClickItem(item)} key={item.idProduct}>
                                                    <div className="tag-auto-complete">
                                                        <img src={item.thumbnail} />
                                                    </div>
                                                    <span>{item.name}</span>
                                                </li>
                                            </>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div className="bag-shopping">
                <i className="fa-solid fa-bag-shopping"></i>
                <span className="item-shopping">{computeQuantity()}</span>
            </div>

            {user.user !== undefined ? (
                <div className="header-user">
                    <i className="fa-solid fa-user"></i>
                    <span className="name-user" style={{ minWidth: '150px' }}>
                        {JSON.parse(sessionStorage.getItem('user') ?? '').name}
                    </span>
                    <ul style={{ paddingLeft: '0', zIndex: '99999999' }} className="option">
                        <li>
                            <Link to={'/pageprofile'}>Cài đặt</Link>
                        </li>
                        {JSON.parse(sessionStorage.getItem('user') ?? '').idUser === 1 && (
                            <li>
                                <Link to={'/admin'}>Quản trị</Link>
                            </li>
                        )}
                        <li style={{ paddingBottom: '5px' }}>
                            <a className="logout" onClick={handleLogOut}>
                                {' '}
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                </div>
            ) : (
                <button onClick={() => navigate('/')} type="button" className="btn btn-primary">
                    Đăng nhập
                </button>
            )}
        </div>
    );
}

export default HeaderAdmin;
