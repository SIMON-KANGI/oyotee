import FilterCategory from "./filterCategory";
import FilterPrice from "./filterPrice";

function Filter({handleChecked, checkedCategories, handlePriceChange, minPrice, maxPrice}){
    return(
        <div className="w-72 p-8">
        <h1 className="font-bold">Filter</h1>
        <FilterCategory handleChecked={handleChecked} checkedCategories={checkedCategories}/>
        <hr/>
        <FilterPrice
            handlePriceChange={handlePriceChange}
           
        />

        </div>
    )
}
export default Filter;