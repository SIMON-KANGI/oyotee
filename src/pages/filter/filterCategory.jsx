import { GiCheckedShield } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
function FilterCategory({ handleChecked, checkedCategories }) {
    return (
        <div className="border border-gray-200 shadow-sm p-4">
        <h1 className="font-bold text-xl my-4">Categories</h1>
            <div className="my-2">
                <input
                    type="checkbox"
                    onChange={handleChecked}
                    checked={checkedCategories.includes("Gardening")}
                    value="Gardening"
                />
                <label className="mx-3">Gardening</label>
            </div>
            <div className="my-2">
                <input
                    type="checkbox"
                    onChange={handleChecked}
                    checked={checkedCategories.includes("Plants")}
                    value="Plants"
                />
                <label className="mx-3">Plants</label>
            </div>
            <div className="my-2">
                <input
                    type="checkbox"
                    onChange={handleChecked}
                    checked={checkedCategories.includes("Seeds")}
                    value="Seeds"
                />
                <label className="mx-3">Seeds</label>
            </div>
            <div className="my-2">
                <input
                    type="checkbox"
                    onChange={handleChecked}
                    checked={checkedCategories.includes("Bulbs")}
                    value="Bulbs"
                />
                <label className="mx-3">Bulbs</label>
            </div>
            <div className="my-2">
                <input
                    type="checkbox"
                    onChange={handleChecked}
                    checked={checkedCategories.includes("Planters")}
                    value="Planters"
                />
                <label className="mx-3">Planters</label>
            </div>
            <div className="flex items-center">
                <h1 className="mx-2 text-md">Others</h1>
                <IoIosArrowDown/>
            </div>
        </div>
    );
}

export default FilterCategory;
