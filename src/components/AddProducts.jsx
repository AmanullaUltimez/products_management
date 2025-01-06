import React, { useState } from "react";
import { addProduct } from "../utils/api";

const AddProducts = ({ setRefresh }) => {
    const [formData, setFormData] = useState({
        product_name: "",
        original_price: "",
        sale_price: "",
        product_type: "",
        description: ""
    })

    const [error, setError] = useState({
        product_name: "",
        original_price: "",
        sale_price: "",
        product_type: "",
        description: ""
    })

    const [statusMessage, setStatusMessage] = useState("");

    function validateForm() {
        const newErrors = {};
        let isValid = true;

        if (!formData.product_name.trim()) {
            newErrors.product_name = "Product name is required!";
            isValid = false;
        }

        if (isNaN(formData.original_price) || formData.original_price <= 0) {
            newErrors.original_price = "Original Price is required and must be a positive number!";
            isValid = false;
        }

        if (isNaN(formData.sale_price) || formData.sale_price <= 0) {
            newErrors.sale_price = "Sale Price is required and must be a positive number!";
            isValid = false;
        }

        if (!formData.product_type.trim()) {
            newErrors.product_type = "Product Type is required!"
            isValid = false
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description of Product is required!"
            isValid = false
        }

        setError(newErrors);
        return isValid;
    }

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        // console.log(formData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        try {
            await addProduct(formData)
            setFormData({
                product_name: "",
                original_price: "",
                sale_price: "",
                product_type: "",
                description: ""
            });

            setError({
                product_name: "",
                original_price: "",
                sale_price: "",
                product_type: "",
                description: ""
            });
            setRefresh((prevState) => !prevState);

            setStatusMessage("Product added successfully!");
        } catch (error) {
            console.log("error", error);
            setStatusMessage("Failed to add product. Please try again.");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mb-10">
            <h3 className="text-2xl font-semibold text-white text-center my-4">
                Create New Product
            </h3>
            <form className="flex flex-col justify-center items-center gap-4 bg-gray-800 p-5 rounded-md w-[320px] md:w-[400px]">
                <input
                    name="product_name"
                    type="text"
                    placeholder="Product Name"
                    value={formData.product_name}
                    onChange={handleOnchange}
                    className="form_input"
                    required
                />
                {error.product_name && <span className="text-red-500">{error.product_name}</span>}
                <input
                    name="original_price"
                    type="number"
                    placeholder="Original Price"
                    value={formData.original_price}
                    onChange={handleOnchange}
                    className="form_input"
                />
                {error.original_price && <span className="text-red-500">{error.original_price}</span>}
                <input
                    name="sale_price"
                    type="number"
                    placeholder="Sale Price"
                    value={formData.sale_price}
                    onChange={handleOnchange}
                    className="form_input"

                />
                {error.sale_price && <span className="text-red-500">{error.sale_price}</span>}
                <input
                    name="product_type"
                    type="text"
                    placeholder="Product Type"
                    value={formData.product_type}
                    onChange={handleOnchange}
                    className="form_input"

                />
                {error.product_type && <span className="text-red-500">{error.product_type}</span>}
                <textarea
                    name="description"
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleOnchange}
                    rows={6}
                    className="form_input bg-opacity-80"
                    style={{ height: "100px", resize: "none" }}

                />
                {error.description && <span className="text-red-500">{error.description}</span>}
                <button className="bg-blue-600 hover:bg-blue-400 text-white w-full p-2 rounded-md font-semibold text-xl" onClick={handleSubmit}>
                    Create
                </button>


            </form>
            {statusMessage && (
                <div
                    className={`mt-4 p-2 text-center rounded-md ${statusMessage.includes("successfully")
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                >
                    {statusMessage}
                </div>
            )}

        </div>
    )
}

export default AddProducts;