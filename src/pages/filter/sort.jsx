function Sort({ handleSort, currentSort }) {
    return (
        <div className="flex items-center mt-8">
            <h1>Sort</h1>
            <button
                onClick={() => handleSort('relevance')}
                className={`px-6 py-2 mx-4 border border-gray-400 rounded-xl ${
                    currentSort === 'relevance' ? 'bg-green-600 text-white' : ''
                }`}
            >
                Relevance
            </button>
            <button
                onClick={() => handleSort('popular')}
                className={`px-6 py-2 mx-4 border border-gray-400 rounded-xl ${
                    currentSort === 'popular' ? 'bg-green-600 text-white'  : ''
                }`}
            >
                Popular
            </button>
            <button
                onClick={() => handleSort('most-new')}
                className={`px-6 py-2 mx-4 border border-gray-400 rounded-xl ${
                    currentSort === 'most-new' ? 'bg-green-600 text-white'  : ''
                }`}
            >
                Most new
            </button>
            <button
                onClick={() => handleSort('price')}
                className={`px-6 py-2 mx-4 border border-gray-400 rounded-xl ${
                    currentSort === 'price' ? 'bg-green-600 text-white'  : ''
                }`}
            >
                Price
            </button>
        </div>
    );
}

export default Sort;
