import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component
import { fetchProducts } from "../services/api"; // Import the API function
import "../styles/app.css";

const HomePage = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data.products);
      setCategories([
        ...new Set(data.products.map((product) => product.category)),
      ]);
      setLoading(false); // Set loading to false once data is fetched
    };
    getProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .filter((product) =>
      selectedCategory === "All Categories"
        ? true
        : product.category === selectedCategory
    );

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="container">
      <h1>Products</h1>

      {/* Dropdown for selecting categories */}
      <div className="dropdown-container">
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="dropdown-full-width"
        >
          <option value="All Categories">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display filtered products */}
      <div className="row">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
