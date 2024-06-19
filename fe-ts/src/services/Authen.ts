const APIAuthen = {
    signIn: (success: (data: any) => void, failure: () => void, object: any): void => {
        // Đăng Nhập
        fetch(`${import.meta.env.VITE_APP_ENV}/login`, {
            method: 'POST',
            body: object,
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.status.toString());
                return res.json();
            })
            .then((data) => {
                console.log(data.data);
                if (data.message === 'oke') success(data);
            })
            .catch((err) => {
                console.log(err);
                failure();
            });
    },

    signOut: (success: () => void, failure: () => void): void => {
        console.log('Đăng Kí');
    },
};

export default APIAuthen;
