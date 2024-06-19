import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Autoplay, Pagination } from 'swiper';
import Slide from '../Login/Slide';
import { TEXT_SLIDE, TEXT_SLIDE1, TEXT_SLIDE2 } from '@/constant';
import image1 from '@/assets/Image/login_banner_1.jpg';
import image2 from '@/assets/Image/login_banner_2.jpg';
import image3 from '@/assets/Image/login_banner_3.jpg';

function SwiperRegister() {
    return (
        <div className="container-swiper">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
            >
                <SwiperSlide>
                    {' '}
                    <Slide image={image1} title={TEXT_SLIDE}></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={image2} title={TEXT_SLIDE1}></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={image3} title={TEXT_SLIDE2}></Slide>
                </SwiperSlide>
            </Swiper>
            <button className="btn-register"> Đăng kí</button>
        </div>
    );
}
export default SwiperRegister;
