import { TEXT_REPEAT_PASS } from '@/constant';
import { getListError } from '@/services';
import { useState } from 'react';
import './input.css';
import axios from 'axios';

interface InputProps {
    children?: React.ReactNode;
    config: {
        name: string;
        label: string;
        listError: string[];
        index: number;
        repeat?: {
            name: string;
            value: string;
        };
        type?: string;
        url?: {
            type: string;
            url: string;
        };
    };
    refFunc: React.MutableRefObject<(() => boolean)[]>;
    handleInputChangeParent?: any;
}

function Input({ children, config, refFunc, handleInputChangeParent }: InputProps) {
    const { name, label, listError, index, repeat, type, url } = config;
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
    const [input, setInput] = useState({
        value: '',
        messageError: ' ',
        listError: getListError(listError),
        isErr: false,
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (repeat) {
            repeat.value === event.target.value
                ? setInput({ ...input, value: event.target.value, messageError: ' ' })
                : setInput({ ...input, value: event.target.value, messageError: TEXT_REPEAT_PASS });
        } else setInput({ ...input, value: event.target.value });
        function setValueForParent() {
            handleInputChangeParent(() => {
                return event.target.value;
            });
        }
        handleInputChangeParent && setValueForParent();
    };
    const handleInputBlur = async () => {
        if (check() && url) {
            if (url.type === 'email') {
                try {
                    const response = await axios.get(`${url.url}${input.value}`);
                    if (response.data && response.data.message === 'oke') {
                        setInput({ ...input, messageError: 'Email này đã được sử dụng !', isErr: true });
                    } else {
                        setInput({ ...input, messageError: '', isErr: false });
                    }
                } catch (error) {
                    setInput({ ...input, messageError: '', isErr: true });
                    console.log(error);
                }
                return;
            }
        }
    };
    const check = () => {
        if (type && repeat && input.value.length !== 0) {
            repeat.value === input.value
                ? setInput({ ...input, messageError: ' ' })
                : setInput({ ...input, messageError: TEXT_REPEAT_PASS });
            return repeat.value === input.value;
        }
        if (listError.length === 0) return true;
        let check = false;
        input.listError.forEach((func) => {
            if (func(input.value) === undefined) {
                check = true;
                setInput({ ...input, messageError: ' ', isErr: false });
            } else {
                check = false;
                setInput({ ...input, messageError: func(input.value) ?? '', isErr: true });
                return;
            }
        });
        return check;
    };
    const handleInputFocus = () => {
        setInput({ ...input, isErr: false, messageError: ' ' });
    };
    refFunc.current[index] = check;
    if (type) {
        return (
            <div className={input.isErr ? 'field-form text-err' : 'field-form'}>
                <input
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    className={!input.isErr ? 'input-form' : 'input-form border-err'}
                    placeholder=" "
                    type={isPasswordVisible ? 'password' : 'text'}
                    name={name}
                    id={name}
                    value={input.value}
                />
                <label className={input.isErr ? 'label-form label-err' : 'label-form'} htmlFor={name}>
                    {label}
                </label>
                {children}
                <span className="message-error">{input.messageError}</span>

                {isPasswordVisible ? (
                    <div onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="eye">
                        <i className="fa-solid fa-eye-slash"></i>
                    </div>
                ) : (
                    <div onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="eye">
                        <i className="fa-solid fa-eye"></i>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className={input.isErr ? 'field-form text-err' : 'field-form'}>
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                className={!input.isErr ? 'input-form' : 'input-form border-err'}
                placeholder=" "
                type="text"
                name={name}
                id={name}
                value={input.value}
            />
            <label className={input.isErr ? 'label-form label-err' : 'label-form'} htmlFor={name}>
                {label}
            </label>
            {children}
            <span className="message-error">{input.messageError}</span>
        </div>
    );
}
export default Input;
