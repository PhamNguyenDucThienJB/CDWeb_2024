import { useState } from 'react';

function InputOTP() {
    const [otp, setOTP] = useState<string>('');

    const changOTP = (event: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line prefer-const
        let value = event.target.value.trim();
        if (checkValue(event)) {
            setOTP('');
        } else {
            if (value.length <= 1) {
                setOTP(event.target.value);
            } else {
                setOTP(otp);
            }
        }
    };

    const checkValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line prefer-const
        let regex = /[0-9]{1}/;
        // eslint-disable-next-line prefer-const
        let value = event.target.value.trim();
        // eslint-disable-next-line prefer-const
        let testRegex = new RegExp(regex);
        if (testRegex.test(value)) return false;
        return true;
    };
    return (
        <input
            onChange={(event) => {
                changOTP(event);
            }}
            type="text"
            name="otp"
            value={otp}
        />
    );
}

export default InputOTP;
