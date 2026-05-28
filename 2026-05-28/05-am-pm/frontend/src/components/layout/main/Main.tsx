import { Route, Routes } from "react-router-dom";
import List from "../../products/list/List";
import AddProduct from "../../products/add/AddProduct";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/add-product" element={<AddProduct />} />
        </Routes>
    )
}