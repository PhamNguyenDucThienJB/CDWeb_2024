import { createContext, PropsWithChildren, useState } from 'react';
import { localStorageApp } from '@/services';

export interface AppContextProps {
    user: string | undefined;
    logged: (object: string) => void;
    cart: any[];
    addItem: (item: any) => void;
    addItemDetail: (item: any) => void;
    removeItem: (item: any) => void;
    subItem: (item: any) => void;
    setCartEmpty: () => void;
    setUserEmpty: () => void;
}

export const ApplicationContext = createContext<AppContextProps>({
    user: undefined,
    logged: () => {
        console.log('logged');
    },
    cart: [],
    addItem: () => {
        console.log('addItem');
    },
    addItemDetail: () => {
        console.log('addItemDetail');
    },
    removeItem: () => {
        console.log('removeItem');
    },
    subItem: () => {
        console.log('subItem');
    },
    setCartEmpty: () => {
        console.log('setCartEmpty');
    },
    setUserEmpty: () => {
        console.log('setUserEmpty');
    },
});

interface ProviderAppProps extends PropsWithChildren<unknown> {
    children?: React.ReactNode;
}

function ApplicationProvider({ children }: ProviderAppProps) {
    // State
    const [user, setUser] = useState<string | undefined>(() => localStorageApp?.getItemStorage('user'));
    const [cart, setCart] = useState<any[]>(() => {
        const shopCart = localStorageApp?.getItemStorage('cart');
        return shopCart === undefined ? [] : JSON.parse(shopCart);
    });

    const logged = (object: string) => {
        setUser(object);
    };

    const setCartEmpty = () => {
        setCart([]);
    };

    const setUserEmpty = () => {
        setUser(undefined);
    };

    const addItem = (item: any) => {
        const arrayCopy = [...cart];
        const pos = arrayCopy.findIndex((p) => p.idProduct === item.idProduct);
        if (pos !== -1) {
            const object = { ...arrayCopy[pos], quantity: arrayCopy[pos].quantity + 1 };
            arrayCopy.splice(pos, 1, object);
            setCart(arrayCopy);
            localStorageApp.setItemStorage('cart', JSON.stringify(arrayCopy));
        } else {
            const object = { ...item, quantity: 1 };
            const arrayProduct = [...cart, object];
            setCart(arrayProduct);
            localStorageApp.setItemStorage('cart', JSON.stringify(arrayProduct));
        }
    };

    const addItemDetail = (item: any) => {
        const arrayCopy = [...cart];
        const pos = arrayCopy.findIndex((p) => p.idProduct === item.idProduct);
        if (pos !== -1) {
            const object = { ...arrayCopy[pos], quantity: arrayCopy[pos].quantity + item.quantity };
            arrayCopy.splice(pos, 1, object);
            setCart(arrayCopy);
            localStorageApp.setItemStorage('cart', JSON.stringify(arrayCopy));
        } else {
            const array = [...cart, item];
            setCart(array);
            localStorageApp.setItemStorage('cart', JSON.stringify(array));
        }
    };

    const removeItem = (item: any) => {
        const arrayCopy = [...cart];
        const arrayFilter = arrayCopy.filter((p) => p.idProduct !== item.idProduct);
        setCart(arrayFilter);
        localStorageApp.setItemStorage('cart', JSON.stringify(arrayFilter));
    };

    const subItem = (item: any) => {
        const arrayCopy = [...cart];
        const pos = arrayCopy.findIndex((p) => p.idProduct === item.idProduct);
        if (pos !== -1 && arrayCopy[pos].quantity > 1) {
            const object = { ...arrayCopy[pos], quantity: arrayCopy[pos].quantity - 1 };
            arrayCopy.splice(pos, 1, object);
            setCart(arrayCopy);
            localStorageApp.setItemStorage('cart', JSON.stringify(arrayCopy));
        }
    };

    const value = {
        user,
        cart,
        logged,
        addItem,
        removeItem,
        subItem,
        addItemDetail,
        setCartEmpty,
        setUserEmpty,
    };

    return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}

export default ApplicationProvider;
