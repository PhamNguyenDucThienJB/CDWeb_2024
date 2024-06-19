import React from 'react';
import './filter.css'
interface FilterProps {
    func: (event: React.ChangeEvent<HTMLSelectElement> | any, filterType: number) => void;
    sort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    displayItem: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter = ({ func, sort, displayItem }: FilterProps) => {
    return (
        <div className="d-flex justify-content-start align-items-center bg-white shop-filter">
            <div className="me-4" style={{ width: '200px' }}>
                <label className="form-label">Thương hiệu :</label>
                <select onChange={(event) => func(event, 0)} className="form-select" id="validationCustom04">
                    <option selected value="">
                        -- Tất cả --
                    </option>
                    <option value={'1'}>Bánh Mỹ</option>
                    <option value={'2'}>Bánh Nhật</option>
                    <option value={'3'}>Bánh Thụy Điển</option>
                    <option value={'4'}>Bánh truyền thống</option>
                   
                </select>
            </div>
           
           
            {/* <div className="me-4" style={{ width: '200px' }}>
                <label className="form-label">Loại bánh :</label>
                <select onChange={(event) => func(event, 3)} className="form-select">
                    <option selected value="">
                        -- Tất cả --
                    </option>
                    
                    <option value={'CHILDREN'}>Trẻ em</option>
                    <option value={'ADULT'}>Người lớn</option>
                </select>
            </div> */}
            <div className="me-4" style={{ width: '200px' }}>
                <label className="form-label">Giá sản phẩm :</label>
                <select onChange={(event) => sort(event)} className="form-select">
                    <option selected value="DES">
                        -- Mặc định --
                    </option>
                    <option value={'DES'}>Giảm dần</option>
                    <option value={'ASE'}>Tăng dần</option>
                </select>
            </div>
            <div className="me-4" style={{ width: '150px' }}>
                <label className="form-label">Hiển thị :</label>
                <select onChange={(event) => displayItem(event)} className="form-select">
                    <option selected value="12">
                        -- Mặc định --
                    </option>
                    <option value={'4'}>4</option>
                    <option value={'8'}>8</option>
                    <option value={'12'}>12</option>
                    <option value={'16'}>16</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
