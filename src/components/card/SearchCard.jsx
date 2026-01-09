import useEcomStore from "@/store/ecom-store";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberformat } from "@/utils/number";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionSearchFilter = useEcomStore((state) => state.actionSearchFilter);

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [categorySelected, setcategorySelected] = useState([]);
  const [price, setPrice] = useState([1000, 30000]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  // step 1 Search Text
  const textDebounceRef = useRef();

  const onTextInputChange = (inputText) => {
    clearTimeout(textDebounceRef.current);

    textDebounceRef.current = setTimeout(() => {
      if (inputText) {
        actionSearchFilter({ query: inputText });
      } else {
        getProduct();
      }
    }, 300);
  };

  // step 2 Search by Category
  const handleCheck = (id) => {
    const inCheck = id;
    const inState = [...categorySelected]; // []
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอ return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }

    setcategorySelected(inState);
    if (inState.length > 0) {
      actionSearchFilter({ category: inState });
    } else {
      getProduct();
    }
  };

  // step 3 Search by Price
  const priceDebounceRef = useRef();

  const handlePrice = (value) => {
    setPrice(value);

    clearTimeout(priceDebounceRef.current);

    priceDebounceRef.current = setTimeout(() => {
      actionSearchFilter({ price: value });
    }, 300);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-3 pl-1">Search Product</h1>

      {/* Search by text */}
      <div className="relative w-full max-w-md mb-4">
        <Search className="h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search Product"
          className="w-60 md:w-full pl-10 border bg-white"
          // onChange={(e) => setText(e.target.value)}
          onChange={(e) => onTextInputChange(e.target.value)}
        />
      </div>

      <hr />

      {/* Search by category */}
      <div>
        <h1 className="text-xl font-bold mb-3">Search Category</h1>
        <div className="flex flex-col gap-3 mb-4">
          {categories.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <Checkbox
                className="bg-white shadow-xs shadow-gray-500"
                id={item.id}
                onCheckedChange={() => handleCheck(item.id)}
              />
              <Label htmlFor="terms">{item.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* Search by price */}
      <div>
        <h1 className="text-xl font-bold mb-3">Search Price</h1>
        <div>
          <div className="flex justify-between">
            <span>Min : {numberformat(price[0])}</span>
            <span>Max : {numberformat(price[1])}</span>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[1000, 30000]}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchCard;
