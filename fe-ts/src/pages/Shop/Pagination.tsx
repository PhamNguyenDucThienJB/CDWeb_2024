import React from 'react';

interface PaginationProps {
    pagination: {
        totalPage: number;
        offset: number;
        sizePage: number;
    };
    click: (pageActive: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, click }) => {
    const array = (): number[] => {
        // eslint-disable-next-line prefer-const
        let a: number[] = [];
        for (let i = pagination.offset; i <= pagination.offset + pagination.sizePage - 1; i++) {
            a.push(i);
        }
        return a;
    };

    const render = (): number[] => {
        // eslint-disable-next-line prefer-const
        let array: number[] = [];
        for (let i = 1; i <= pagination.totalPage; i++) {
            array.push(i);
        }
        return array;
    };

    const clickPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, pageActive: number): void => {
        event.preventDefault();
        click(pageActive);
    };

    if (pagination.totalPage <= pagination.sizePage) {
        return (
            <div style={{ width: '80%', margin: 'auto' }}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item">
                            <a
                                onClick={(event) => {
                                    clickPage(event, render()[0]);
                                }}
                                className="page-link"
                                href="#"
                                tabIndex={-1}
                                aria-disabled="true"
                            >
                                Trang đầu
                            </a>
                        </li>
                        {render().map((item) => (
                            <li
                                key={item}
                                onClick={(event: React.MouseEvent<any, MouseEvent>) => clickPage(event, item)}
                                className="page-item"
                            >
                                <a className="page-link" href="#">
                                    {item}
                                </a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a
                                onClick={(event) => {
                                    clickPage(event, render()[render().length - 1]);
                                }}
                                className="page-link"
                                href="#"
                            >
                                Trang cuối
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className="page-item ">
                        <a
                            onClick={(event) => clickPage(event, array()[0])}
                            className="page-link"
                            href="#"
                            tabIndex={-1}
                            aria-disabled="true"
                        >
                            Trang đầu
                        </a>
                    </li>
                    {array().map((item) => (
                        <li key={item} className="page-item">
                            <a onClick={(event) => clickPage(event, item)} className="page-link" href="#">
                                {item}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a
                            onClick={(event) => clickPage(event, array()[array().length - 1])}
                            className="page-link"
                            href="#"
                        >
                            Trang cuối
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
