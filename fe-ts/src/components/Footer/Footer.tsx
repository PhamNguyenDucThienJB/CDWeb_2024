import React from 'react';
// import './footer.css'
import { Link } from 'react-router-dom';

import { BsLinkedin, BsFacebook, BsYoutube, BsInstagram } from 'react-icons/bs';

const Footer = () => {
    return (
        <>
            <div className="pt-5">
            <footer className="py-4 bg-dark" >
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="text-white mb-4">Liên hệ với chúng tôi</h4>
                            <div>
                                <address className="text-white fs-6">
                                    Địa chỉ: KP6, Phường Linh Trung,
                                    <br /> Thành phố Thủ Đức, TP.HCM
                                    <br /> Mã số thuế : 12345678
                                </address>

                                <a href="tel:+84 0795035755" className="mt-3 d-block mb-1 text-white">
                                    +84 0795035755
                                </a>
                                <a href="mailto:Cakeshop@gmail.com" className="mt-2 d-block mb-0 text-white">
                                    Cakeshop@gmail.com
                                </a>
                                {/* Icon */}
                                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                                    <a className="text-white" href="#">
                                        <BsLinkedin className="fs-4" />
                                    </a>
                                    <a className="text-white" href="#">
                                        <BsFacebook className="fs-4" />
                                    </a>
                                    <a className="text-white" href="#">
                                        <BsInstagram className="fs-4" />
                                    </a>
                                    <a className="text-white" href="#">
                                        <BsYoutube className="fs-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Thông tin</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link to="#" className="text-white py-2 mb-1">
                                    Chính sách bảo mật
                                </Link>
                                <Link to="#" className="text-white py-2 mb-1">
                                    Chính sách đổi trả
                                </Link>
                                <Link to="#" className="text-white py-2 mb-1">
                                    Chính sách giao hàng
                                </Link>
                                <Link to="#" className="text-white py-2 mb-1">
                                    Điều khoản dịch vụ
                                </Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Tài khoản</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link to="#" className="text-white py-2 mb-1">
                                    Giới thiệu
                                </Link>
                                <Link to="#" className="text-white py-2 mb-1">
                                    Faq
                                </Link>
                                <Link to="#" className="text-white py-2 mb-1">
                                    Liên hệ
                                </Link>
                            </div>
                        </div>
                        <div className="col-2">
                            <h4 className="text-white mb-4">Liên kết nhanh</h4>
                            <div className="footer-links d-flex flex-column">
                                {/* <Link to="#" className="text-white py-2 mb-1">
                                    Addias
                                </Link>
                                <Link to="#" className="text-white py-2 mb-1">
                                    Nike
                                </Link>
                                <Link to="#" className="text-white py-2 mb-1">
                                    Puma
                                </Link>
                                <Link to="#" className="text-white py-2 mb-1">
                                    Karwa
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-4 bg-dark" style={{bottom: '0'}}>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12 mb-0 text-white">
                            <p className="text-center">
                                &copy; {new Date().getFullYear()} Công ty TNHH Cake Việt Nam
                            </p>
                        </div>
                    </div>
                </div>
            </footer>  
            </div>
            
        </>
    );
};

export default Footer;
