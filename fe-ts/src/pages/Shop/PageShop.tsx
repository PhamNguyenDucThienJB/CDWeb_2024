import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filter from './Filter';
import Loading from '@/components/Loading/Loading';
import Shop from './Shop';
import Pagination from './Pagination';
import axios from 'axios';

interface FilterObject {
    key: string;
    operation: string;
    value: string;
}

interface ShopProduct {
    itemProduct: number;
    page: number;
    sort: string;
    list: FilterObject[];
}

interface PaginationObject {
    offset: number;
    pageActive: number;
    sizePage: number;
    totalPage: number;
}

function PageShop({ list }: { list: any[] }): JSX.Element {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string | null>(searchParams.get('search'));
    const initObject: ShopProduct = {
        itemProduct: 8,
        page: 1,
        sort: 'DES',
        list: [
            { key: 'branch', operation: 'EQUALID', value: '' },
            { key: 'color', operation: 'EQUAL', value: '' },
            { key: 'size', operation: 'EQUAL', value: '' },
            { key: 'typeShoe', operation: 'EQUAL', value: '' },
            { key: 'name', operation: 'CONTAIN', value: '' },
        ],
    };
    const pagination: PaginationObject = {
        offset: 1,
        pageActive: 1,
        sizePage: 5,
        totalPage: 0,
    };
    const [objectPagination, setPagination] = useState<PaginationObject>(pagination);
    const [listItem, setListItem] = useState<any[]>([]);
    const [shopProduct, setShopProduct] = useState<ShopProduct>(initObject);

    const clickPage = (pageactive: number): void => {
        setShopProduct({ ...shopProduct, page: pageactive });
    };

    const computeOffset = (itemPerPage: number, itemFiltered: number, pageActive: number): void => {
        let totalPage = 0;
        // eslint-disable-next-line prefer-const
        let mod = itemFiltered % itemPerPage;
        if (mod === 0) totalPage = itemFiltered / itemPerPage;
        else totalPage = Math.floor(itemFiltered / itemPerPage) + 1;
        if (totalPage > objectPagination.sizePage) {
            if (pageActive === objectPagination.sizePage + objectPagination.offset - 1) {
                if (pageActive + objectPagination.sizePage > totalPage) {
                    return setPagination({
                        ...objectPagination,
                        pageActive: pageActive,
                        totalPage: totalPage,
                        offset: totalPage - (objectPagination.sizePage - 1),
                    });
                } else
                    return setPagination({
                        ...objectPagination,
                        pageActive: pageActive,
                        totalPage: totalPage,
                        offset: pageActive,
                    });
            }
            if (pageActive === objectPagination.offset) {
                if (pageActive - objectPagination.sizePage < 0)
                    return setPagination({
                        ...objectPagination,
                        offset: 1,
                        pageActive: pageActive,
                        totalPage: totalPage,
                    });
                else
                    return setPagination({
                        ...objectPagination,
                        offset: pageActive - objectPagination.sizePage - 1,
                        pageActive: pageActive,
                        totalPage: totalPage,
                    });
            }
            return setPagination({ ...objectPagination, pageActive: pageActive, totalPage: totalPage });
        } else setPagination({ ...objectPagination, pageActive: pageActive, totalPage: totalPage });
    };

    useEffect(() => {
        if (search) {
            // eslint-disable-next-line prefer-const
            let array = [...shopProduct.list];
            array[4] = { key: 'name', operation: 'CONTAIN', value: search };
            // eslint-disable-next-line prefer-const
            let object = { ...shopProduct, list: array };
            setShopProduct(object);
        }
    }, [search]);

    useEffect(() => {
        setLoading(true);
        
        const fetchData = async () => {
          try {
            // Tìm kiếm Lọc sản phẩm 
            const response = await axios.post(
              `${import.meta.env.VITE_APP_ENV}/findProductByfilter`,
              JSON.stringify(shopProduct),
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            
            const data = response.data;
            setLoading(false);
            setListItem(data.data.list);
            computeOffset(data.data.itemPerPage, data.data.itemFiltered, data.data.pageActive);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        
        fetchData();
      }, [shopProduct]);

    const changeFilter = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        // eslint-disable-next-line prefer-const
        let object = { ...shopProduct.list[index], value: event.target.value };
        // eslint-disable-next-line prefer-const
        let arrayCoppy = [...shopProduct.list];
        arrayCoppy[index] = object;
        setShopProduct({ ...shopProduct, list: arrayCoppy, page: 1 });
    };
    const sort = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setShopProduct({ ...shopProduct, sort: event.target.value });
    };

    const displayItem = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setShopProduct({ ...shopProduct, itemProduct: parseInt(event.target.value), page: 1 });
    };
    return (
        <div style={{ background: '#f6f9fc', minHeight: '100vh' }} className="pt-5 pb-5">
            <div className="mb-5" style={{ width: '80%', margin: 'auto' }}>
                {search && <h1 className="display-6">Kết quả tìm kiếm cho : {search}</h1>}
            </div>
            <Filter displayItem={displayItem} sort={sort} func={changeFilter}></Filter>
            {loading ? <Loading /> : <Shop list={listItem}></Shop>}

            <Pagination click={clickPage} pagination={objectPagination}></Pagination>
        </div>
    );
}

export default PageShop;
