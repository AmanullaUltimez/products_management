import React from "react";

const ProductTable = ({ products }) => {
    return (
        <div className="flex justify-center items-center py-4">
            <table className="w-full md:w-9/12 bg-gray-800 text-white my-4 rounded-lg">
                <thead>
                    <tr className="text-white bg-gray-700">
                        <th className="p-2 text-center rounded-tl-xl">SrNo</th>
                        <th className="p-2 text-center">Date and Time</th>
                        <th className="p-2 text-center">Product ID</th>
                        <th className="p-2 text-center">Name</th>
                        <th className="p-2 text-center">Original Price</th>
                        <th className="p-2 text-center">Sale Price</th>
                        <th className="p-2 text-center">Product Type</th>
                        <th className="p-2 text-center max-w-40 truncate rounded-tr-xl">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr
                                key={product.product_id}
                                className="text-white bg-gray-900 transition-colors"
                            >
                                <td className="p-2 text-center">{index + 1}</td>
                                <td className="p-2 text-center">
                                    {new Date(product.date_n_time).toLocaleDateString("en-GB")}
                                </td>
                                <td className="p-2 text-center">{product._id}</td>
                                <td className="p-2 text-center">{product.product_name}</td>
                                <td className="p-2 text-center">{product.original_price}</td>
                                <td className="p-2 text-center">{product.sale_price}</td>
                                <td className="p-2 text-center">{product.product_type}</td>
                                <td className="p-2 text-center max-w-40 truncate">{product.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="p-4 text-center">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
