import { CiSearch } from "react-icons/ci";

function Search({input, handleChange}) {
    return (
        <div className="relative flex items-center w-full max-w-lg mx-auto my-4">
          
            <input 
                type="text" 
                onChange={handleChange}
                value={input}
                placeholder="Search products..." 
                className="w-full px-4 py-3 pl-12 text-gray-700 bg-slate-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
            
           
            <CiSearch 
                size="24px" 
                className="absolute left-4 text-gray-500" 
            />
        </div>
    );
}

export default Search;
