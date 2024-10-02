import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import ProductDetailsModal from "./ProductDetailsModal";
import { Product } from "./models/models";

const TABLE_HEAD = ["Thumbnail", "Name", "Price"];
const PRODUCTS_PER_PAGE = 4;

const ProductTable = () => {
  const [smartphones, setSmartphones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Search states
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]); // To hold search results
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Fetch all smartphones initially
  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then((response) => response.json())
      .then((data) => {
        setSmartphones(data.products);
        setLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching the smartphones:", error)
      );
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!query) return;
    setLoading(true);
    setHasSearched(true);

    const filteredProducts = smartphones.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredProducts);
    setLoading(false);
  };

  // Trigger search on Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleOpen = (product: Product) => {
    setSelectedProduct(product); // Set the selected product
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const currentProducts = hasSearched
    ? searchResults.slice(startIndex, endIndex)
    : smartphones.slice(startIndex, endIndex);

  if (loading) {
    return <p>Loading smartphones...</p>;
  }

  return (
    <>
      {/* Search Bar */}
      <div className="mt-5">
        <div className="flex flex-col sm:flex-row w-full border border-blue-gray-100 items-center justify-between">
          <input
            className="peer w-full bg-transparent px-3 py-2.5 font-sans text-s font-normal focus:outline-none focus:border-transparent"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update the query state
            onKeyDown={handleKeyPress} // Handle Enter key press
          />
          <div className="flex mt-2 sm:mt-0">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white"
            >
              Search
            </button>
            <button
              onClick={clearSearch}
              className="ml-2 px-4 py-2 bg-gray-300 text-black"
            >
              X
            </button>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <Card className="h-full w-full overflow-hidden rounded-none mt-4">
        {loading ? (
          <p className="mt-2 text-gray-500">Loading...</p>
        ) : hasSearched && searchResults.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="mt-2 text-gray-500">
              No products matched your search keyword.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="black"
                        className="font-bold leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => {
                  const { id, title, description, price, thumbnail } = product;
                  const isLast = index === currentProducts.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={id}
                      onClick={() => handleOpen(product)}
                      className="cursor-pointer"
                    >
                      {/* Thumbnail */}
                      <td className={classes}>
                        <img
                          src={thumbnail}
                          alt={title}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      {/* Name & Description */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {title}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-light"
                        >
                          {description}
                        </Typography>
                      </td>

                      {/* Price */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          ₱{price}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-2 bg-light-blue-800 text-white"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={
            hasSearched
              ? endIndex >= searchResults.length
              : endIndex >= smartphones.length
          }
          className="mr-2 bg-light-blue-800 text-white"
        >
          Next
        </Button>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        open={open}
        handleClose={handleClose}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductTable;
