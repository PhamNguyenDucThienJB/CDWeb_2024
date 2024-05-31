import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
function PageContact() {
    // eslint-disable-next-line no-unused-vars
    const alter = withReactContent(Swal);
    const navigate = useNavigate();

    const [title, setTitle] = useState({ value: '', error: '' });
    const [content, setContent] = useState({ value: '', error: '' });

    const changTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle({ ...title, value: event.target.value });
    };
    const changContent = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setContent({ ...content, value: event.target.value });
    };
    const focusTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle({ ...title, error: '' });
        console.log(event);
    };
    const focusContent = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setContent({ ...content, error: '' });
        console.log(event);
    };

    const blurTitle = () => {
        validateTitle();
    };
    const blurContent = () => {
        validateContent();
    };

    const validateTitle = () => {
        if (title.value.trim().length === 0) setTitle({ ...title, error: 'is-invalid' });
        else setTitle({ ...title, error: 'is-valid' });
    };
    const validateContent = () => {
        if (content.value.trim().length === 0) setContent({ ...content, error: 'is-invalid' });
        else setContent({ ...content, error: 'is-valid' });
    };
    // Xử lí Submit gửi form Contact
    const handleSubmitContact = async (event: React.FormEvent<HTMLFormElement> | any) => {
        event.preventDefault();
        checkValidation();
        if (title.error === 'is-valid' && content.error === 'is-valid') {
            const id = JSON.parse(sessionStorage.getItem('user') ?? '').idUser;
            const data = new FormData();
            data.append('idCus', id);
            data.append('title', title.value);
            data.append('content', content.value);
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_ENV}/saveContact`, data);
                if (response.data && response.data.message === 'oke') {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Gửi liên hệ thành công',
                        allowOutsideClick: false,
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                    });
                    navigate('/contact');
                }
            } catch (error) {
                console.log(error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Cập nhật không thành công',
                });
            }
        }
    };

    const checkValidation = () => {
        if (title.value.trim().length === 0) setTitle({ ...title, error: 'is-invalid' });
        else setTitle({ ...title, error: 'is-valid' });

        if (content.value.trim().length === 0) setContent({ ...content, error: 'is-invalid' });
        else setContent({ ...content, error: 'is-valid' });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f6f9fc', padding: '50px' }}>
            <div className="col-12">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42448.72905097665!2d106.7462893949392!3d10.880995257116664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRwLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1679663826351!5m2!1svi!2s"
                    width="600"
                    height="450"
                    style={{ border: '0' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0 w-100"
                ></iframe>
            </div>
            <div style={{ width: '50%', margin: 'auto' }}>
                <form
                    onSubmit={handleSubmitContact}
                    style={{
                        padding: '50px',
                        background: '#FFFFFF',
                        borderRadius: '8px',
                        boxShadow: ' rgb(3 0 71 / 9%) 0px 1px 3px',
                    }}
                >
                    <h1 className="display-6 text-center">Liên hệ</h1>
                    <div>
                        <div>
                            <label className="form-label">Tiêu đề</label>
                            <input
                                onFocus={focusTitle}
                                onBlur={blurTitle}
                                onInput={changTitle}
                                value={title.value}
                                type="text"
                                className={title.error ? `form-control ${title.error}` : 'form-control'}
                                aria-describedby="validationServer03Feedback"
                            />
                            <div className="invalid-feedback">Vui lòng nhập tiêu đề!</div>
                        </div>
                        <div className="mt-5">
                            <label className="form-label">Nhập nội dung liên hệ</label>
                            <textarea
                                onFocus={focusContent}
                                onBlur={blurContent}
                                onInput={changContent}
                                value={content.value}
                                rows={8}
                                className={content.error ? `form-control ${content.error}` : 'form-control'}
                                placeholder="Nội dung"
                            ></textarea>
                            <div className="invalid-feedback">Vui lòng điền nội dung cần liên hệ!</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <button onClick={handleSubmitContact} className="btn btn-primary" type="submit">
                            Gửi liên hệ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PageContact;
