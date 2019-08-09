import React from 'react';
import {Input} from 'antd';
const { Search } = Input;

const SearchProduct = (props) => {
    const onSearch = (value) => {
        if(value.length>0) {
            props.history.push({pathname: '/search', search: value});
        }
    }

    return (
        <Search
            placeholder="Input search text"
            onSearch={(value) => onSearch(value)}
            allowClear
        />
    )
}

export default SearchProduct;