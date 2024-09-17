import { useState } from 'react';

function FilterPrice({ handlePriceChange }) {
    const [minPrice, setMinPrice] = useState(0); // Track the minimum price
    const [maxPrice, setMaxPrice] = useState(1000); // Track the maximum price

    const handleMinPriceChange = (e) => {
        const value = parseInt(e.target.value);
        if (value <= maxPrice) {
            setMinPrice(value);
            handlePriceChange(value, maxPrice); // Pass both values back to the parent component
        }
    };

    const handleMaxPriceChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= minPrice) {
            setMaxPrice(value);
            handlePriceChange(minPrice, value); // Pass both values back to the parent component
        }
    };

    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value);
        setMaxPrice(value);
        handlePriceChange(minPrice, value); // Sync the slider with the max price input
    };

    return (
        <div>
            <h1 className="text-xl font-bold">Price Range</h1>

            {/* Slider for the maximum price */}
            <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={handleSliderChange}
                className="w-full my-2"
            />

            <div className="flex items-center">
                {/* Minimum price input */}
                <input
                    type="number"
                    placeholder="Min"
                    min="0"
                    max="1000"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="rounded-md px-3 py-3 text-center"
                />

                {/* Maximum price input */}
                <input
                    type="number"
                    placeholder="Max"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="rounded-md px-3 py-3 mx-4 text-center"
                />
            </div>

            <button
                className="bg-green-600 text-white rounded-lg my-3 w-40 py-3"
                onClick={() => handlePriceChange(minPrice, maxPrice)}
            >
                Set Price
            </button>
        </div>
    );
}

export default FilterPrice;
