import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img from '@/assets/imageHome/breadcrumb.jpg';
import img2 from '@/assets/imageHome/banner_login2.webp';
import img3 from '@/assets/imageHome/banner_login.webp';
import img4 from '../../assets/imageHome/MainIntoduct.webp';
import img5 from '../../assets/imageHome/banh1.webp';
import img6 from '../../assets/imageHome/banh2.webp';
import img7 from '../../assets/imageHome/banh3.webp';
import img8 from '../../assets/imageHome/banh4.webp';
import img9 from '../../assets/imageHome/banh3.webp';
import img10 from '../../assets/imageHome/banh4.webp';
import img11 from '../../assets/imageHome/banh2.webp'; 
import img12 from '../../assets/imageHome/banh1.webp';
import './home.css';
import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
SwiperCore.use([Autoplay, Pagination]);
// Test Thu Xem Sao
function Home(): JSX.Element {
    const navigate = useNavigate();
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    const navigateToShop = () => {
        navigate('/shop');
    };

    const handleSwiperClick = () => {
        if (swiper) {
            (swiper as any).autoplay.stop();
        }
        navigateToShop();
    };

    return (
        <div className="home-page">
            <div className="home-header">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    onSwiper={setSwiper}
                    className="swiper-container"
                >
                    <SwiperSlide onClick={handleSwiperClick}>
                        <div className="slide-content">
                            <h1 className="display-4 text-center">Cửa hàng giảm</h1>
                            <h1 className="display-4">giá 50%</h1>
                            <button
                                onClick={navigateToShop}
                                className="btn btn-danger mt-5"
                                style={{ height: '50px', width: '150px', fontSize: '20px' }}
                            >
                                Cửa hàng
                            </button>
                        </div>
                        <div className="slide-image">
                            <img src={img2} alt="Banner" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={handleSwiperClick}>
                        <div className="slide-content">
                            <h1 className="display-4 text-center">Phone off</h1>
                            <h1 className="display-4">Đặt ngay </h1>
                            <button
                                onClick={navigateToShop}
                                className="btn btn-danger mt-5"
                                style={{ height: '50px', width: '150px', fontSize: '20px' }}
                            >
                                Cửa hàng
                            </button>
                        </div>
                        <div className="slide-image">
                            <img src={img} alt="Banner" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={handleSwiperClick}>
                        <div className="slide-content">
                            <h1 className="display-4 text-center">Nhận ngay Voucher</h1>
                            <h1 className="display-4">Mua sắm</h1>
                            <button
                                onClick={navigateToShop}
                                className="btn btn-danger mt-5"
                                style={{ height: '50px', width: '150px', fontSize: '20px' }}
                            >
                                Cửa hàng
                            </button>
                        </div>
                        <div className="slide-image">
                            <img src={img3} alt="Banner" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="home-contain">
                <div className="home-intro">
                    <div className="img-intro">
                        <img className="img-in" src={img4} alt="Introduction" />
                    </div>
                    <div className="intro-text">
                        <h1>Giới thiệu</h1>
                        <p>
                        Chào mừng bạn đến với Thulam Bakery, nơi tận tâm mang đến cho bạn những chiếc bánh sinh nhật ngọt ngào và tinh tế nhất!
                         Tại Thulam Bakery, chúng tôi tự hào với đội ngũ thợ làm bánh chuyên nghiệp, luôn sáng tạo và sử dụng nguyên liệu tươi ngon
                         , chất lượng cao. Với đa dạng hương vị, thiết kế độc đáo và dịch vụ giao hàng nhanh chóng, chúng tôi cam kết đem lại cho bạn
                          những khoảnh khắc đáng nhớ bên gia đình và bạn bè. Hãy để Thulam Bakery biến ngày sinh nhật của bạn trở nên thật đặc biệt và 
                          tràn đầy niềm vui!
                        </p>
                    </div>
                </div>
                <div className="home-coming">
                    <div className="title-coming">
                        <h1 className="title-new">Sản phẩm sắp ra mắt...</h1>
                    </div>
                    <div className="img-coming">
                        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div
                                        style={{ height: '300px' }}
                                        className="d-flex justify-content-evenly align-items-center"
                                    >
                                        <div className="div-img">
                                            <img className="d-block w-100" src={img5} alt="Product 1" />
                                        </div>
                                        <div className="div-img">
                                            <img className="d-block w-100" src={img6} alt="Product 2" />
                                        </div>
                                        <div className="div-img">
                                            <img className="d-block w-100" src={img7} alt="Product 3" />
                                        </div>
                                        <div className="div-img">
                                            <img className="d-block w-100" src={img8} alt="Product 4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div
                                        style={{ height: '300px' }}
                                        className="d-flex justify-content-evenly align-items-center"
                                    >
                                        <div className="div-img">
                                            <img className="d-block w-100" src={img9} alt="Product 5" />
                                        </div>
                                        <div className="div-img">
                                            <img className="d-block w-100" src={img10} alt="Product 6" />
                                        </div>
                                        <div className="div-img">
                                            <img className="d-block w-100" src={img11} alt="Product 7" />
                                        </div>
                                        <div className="div-img">
                                            <img className="d-block w-100" src={img12} alt="Product 8" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
