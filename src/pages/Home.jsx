import { useState, useEffect } from 'react';
import axios from 'axios';
import Products from './Products';
import Filter from './filter/filter';
import Search from './filter/Search';
import useDebounce from '../../hooks/useDebounce';
import Sort from './filter/sort';

function Home() {
    const [productList, setProductList] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]); // Track selected categories
    const [input, setInput] = useState("");
    const debouncedInput = useDebounce(input, 1000);
    const [minPrice, setMinPrice] = useState(0); // Track min price
    const [maxPrice, setMaxPrice] = useState(1000); // Track max price
    const [sortDirection, setSortDirection] = useState('asc'); // Track sort direction (asc or desc)

    const fetchProducts = () => {
        axios.get('https://api.npoint.io/a8c1644990f9af983fc6')
            .then(response => {
                setProductList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChecked = (e) => {
        const category = e.target.value;
        if (e.target.checked) {
            setCheckedCategories([...checkedCategories, category]); // Add category to filter
        } else {
            setCheckedCategories(checkedCategories.filter(c => c !== category)); // Remove category
        }
    };

    // Handle price change
    const handlePriceChange = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    // Filter products based on search, price, and category
    const FilterProducts = productList.filter(product => {
        const filterPrice = product.price >= minPrice && product.price <= maxPrice; // Filter by min and max price
        const searchName = input ? product.name.toLowerCase().includes(debouncedInput.toLowerCase()) : true; // Filter by name
        const filterCategory = checkedCategories.length > 0
            ? checkedCategories.includes(product.category) // Filter by selected categories
            : true;
        return filterPrice && searchName && filterCategory;
    });

    // Sort products by price
    const sortedProducts = FilterProducts.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.price - b.price; // Ascending order
        } else {
            return b.price - a.price; // Descending order
        }
    });

    // Handle the sort direction change
    const handleSort = (direction) => {
        setSortDirection(direction); // Set the sort direction (asc or desc)
    };

    return (
        <div className='flex'>
            <Filter
                handleChecked={handleChecked}
                checkedCategories={checkedCategories}
                handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
                minPrice={minPrice}
                maxPrice={maxPrice}
            />
            <section>
                <Search
                    input={input}
                    handleChange={handleChange}
                />
                <Sort
                    handleSort={handleSort} // Pass the sorting function
                    currentSort={sortDirection} // Pass the current sort direction
                />
                <Products
                    products={sortedProducts} // Display sorted products
                />
            </section>
        </div>
    );
}

export default Home;
