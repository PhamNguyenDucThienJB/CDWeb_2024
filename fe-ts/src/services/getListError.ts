import {
    FIELD_EMPTY,
    PASSWORD,
    REQUIRE_EMAIL,
    REQUIRE_PHONE,
    TEXT_ERROR_EMPTY,
    TEXT_PASS,
    TEXT_REQUIRE_EMAIL,
    TEXT_REQUIRE_PHONE,
} from '@/constant/ErrorForm';

const empty = (value: string): string | undefined => {
    return value.trim().length === 0 ? TEXT_ERROR_EMPTY : undefined;
};

const email = (value: string): string | undefined => {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    return regex.test(value.trim()) ? undefined : TEXT_REQUIRE_EMAIL;
};

const phone = (value: string): string | undefined => {
    const regex = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/);
    return regex.test(value.trim()) ? undefined : TEXT_REQUIRE_PHONE;
};

const pass = (value: string): string | undefined => {
    return value.length < 8 ? TEXT_PASS : undefined;
};

const getListError = (listNameError: string[]): ((value: string) => string | undefined)[] => {
    const listError: ((value: string) => string | undefined)[] = [];
    listNameError.forEach((err) => {
        switch (err) {
            case FIELD_EMPTY:
                listError.push(empty);
                break;
            case REQUIRE_EMAIL:
                listError.push(email);
                break;
            case REQUIRE_PHONE:
                listError.push(phone);
                break;
            case PASSWORD:
                listError.push(pass);
                break;
            default:
                throw new Error('Name error invalid');
        }
    });
    return listError;
};

export { getListError };
