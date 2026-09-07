import { useState } from "react";
import "./Marketplace.css";

type Product = {
  name: string;
  price: string;
  category: string;
  seller: string;
  description: string;
  icon: string;
};

function Marketplace() {
  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    {
      name: "Scientific Calculator",
      price: "₦8,000",
      category: "School Supplies",
      seller: "Student Seller",
      description: "Scientific calculator in good condition.",
      icon: "🧮",
    },
    {
      name: "HP Laptop",
      price: "₦350,000",
      category: "Electronics",
      seller: "Student Seller",
      description: "HP laptop suitable for school work.",
      icon: "💻",
    },
    {
      name: "Engineering Textbook",
      price: "₦12,000",
      category: "Books",
      seller: "Student Seller",
      description: "Engineering textbook in good condition.",
      icon: "📚",
    },
    {
      name: "Campus Hoodie",
      price: "₦15,000",
      category: "Fashion",
      seller: "Student Seller",
      description: "Campus hoodie.",
      icon: "👕",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Electronics",
    seller: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.price ||
      !form.seller ||
      !form.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newProduct: Product = {
      ...form,
      price: `₦${Number(form.price).toLocaleString()}`,
      icon: "🛍️",
    };

    setProducts([newProduct, ...products]);

    setForm({
      name: "",
      price: "",
      category: "Electronics",
      seller: "",
      description: "",
    });

    setShowForm(false);
  };

  return (
    <div className="marketplace-page">
      <div className="marketplace-container">

        <div className="marketplace-header">
          <p>CAMPUS MARKETPLACE</p>

          <h1>
            Buy. Sell.
            <br />
            <span>Connect.</span>
          </h1>

          <span>
            Buy and sell useful items within your campus
            community.
          </span>
        </div>

        <div className="marketplace-actions">
          <input
            type="text"
            placeholder="Search products..."
          />

          <button onClick={() => setShowForm(!showForm)}>
            + Sell an Item
          </button>
        </div>

        {showForm && (
          <form
            className="sell-form"
            onSubmit={handleSubmit}
          >
            <h2>Sell an Item</h2>

            <input
              type="text"
              placeholder="Product name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              <option>Electronics</option>
              <option>Books</option>
              <option>School Supplies</option>
              <option>Fashion</option>
              <option>Other</option>
            </select>

            <input
              type="text"
              placeholder="Your name"
              value={form.seller}
              onChange={(e) =>
                setForm({
                  ...form,
                  seller: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Describe your item..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <button type="submit">
              Post Item
            </button>
          </form>
        )}

        <div className="category-list">
          <button>All</button>
          <button>Electronics</button>
          <button>Books</button>
          <button>School Supplies</button>
          <button>Fashion</button>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <div
              className="product-card"
              key={`${product.name}-${index}`}
            >
              <div className="product-image">
                {product.icon}
              </div>

              <div className="product-info">
                <small>{product.category}</small>

                <h2>{product.name}</h2>

                <h3>{product.price}</h3>

                <p>
                  Seller: {product.seller}
                </p>

                <p>
                  {product.description}
                </p>

                <button>
                  View Item →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Marketplace;