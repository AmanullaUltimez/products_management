import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import ProductTable from "./ProductTable";
import NextAndPrev from "./NextAndPrev";

const ProductsDisplay = ({ refresh }) => {
    const [products, setProducts] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filterType, setFilterType] = useState("name");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data.message);
            } catch (error) {
                console.log("error", error);
            }
        };
        getProducts();
    }, [refresh]);

    useEffect(() => {
        setCurrentPage(1);
        setSearchTerm("");
    }, [filterType]);

    const handleFilterChange = (type) => {
        setFilterType(type);
        setIsDropdownVisible(false);
        setSearchTerm("");
    };

    const filteredProducts = products.filter((product) => {
        const lowerSearchTerm = searchTerm.toLowerCase();

        const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

        switch (filterType) {
            case "id":
                return safeToLower(product._id).includes(lowerSearchTerm);
            case "name":
                return safeToLower(product.product_name).includes(lowerSearchTerm);
            case "Oprice":
                return safeToLower(product.original_price).includes(lowerSearchTerm);
            case "price":
                return safeToLower(product.sale_price).includes(lowerSearchTerm);
            case "type":
                return safeToLower(product.product_type).includes(lowerSearchTerm);
            case "description":
                return safeToLower(product.description).includes(lowerSearchTerm);
            case "date":
                return new Date(product.date_n_time).toLocaleDateString("en-GB").includes(lowerSearchTerm.trim());
            default:
                return true;
        }
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="text-white">
            <div className="flex justify-around items-center">
                <h4 className="text-3xl font-bold">All Products</h4>

                <div className="space-x-2 flex">
                    <button
                        className="text-white bg-gray-600 p-1 px-2 rounded-md flex justify-around items-center gap-10"
                        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                        <IoMdArrowDropdown />
                    </button>
                    {isDropdownVisible && (
                        <div className="absolute mt-16 bg-gray-600 py-4 rounded-md w-54 px-8">
                            {["id", "name", "Oprice", "price", "type", "date"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`text-white flex gap-1 ${filterType === filter ? "bg-blue-500 rounded-md px-2" : ""}`}
                                    onClick={() => handleFilterChange(filter)}
                                >
                                    <span>
                                        {filter === "id" && "Product ID"}
                                        {filter === "name" && "Name"}
                                        {filter === "Oprice" && "Original Price"}
                                        {filter === "price" && "Sale Price"}
                                        {filter === "type" && "Product Type"}
                                        {filter === "date" && "Date"}
                                    </span>
                                    {filterType === filter && <span className="bg-blue-500">✔</span>}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="text-white bg-gray-600 p-1 px-2 rounded-md flex justify-around items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="text-white bg-gray-600 p-1 rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch />
                    </div>
                </div>
            </div>
            <ProductTable products={paginatedProducts} />
            <NextAndPrev
                totalPages={totalPages}
                currentPage={currentPage}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        </div>
    );
};

export default ProductsDisplay;
