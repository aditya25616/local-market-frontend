import {
  FaAppleAlt,
  FaCarrot,
  FaBreadSlice,
  FaCheese,
  FaShoppingBasket,
  FaStore,
} from "react-icons/fa";

const categories = [
  { name: "Fruits", icon: <FaAppleAlt size={40} /> },
  { name: "Vegetables", icon: <FaCarrot size={40} /> },
  { name: "Bakery", icon: <FaBreadSlice size={40} /> },
  { name: "Dairy", icon: <FaCheese size={40} /> },
  { name: "Groceries", icon: <FaShoppingBasket size={40} /> },
  { name: "Local Shops", icon: <FaStore size={40} /> },
];

function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Shop by Category
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Browse products from your favourite local vendors.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">

          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-green-50 rounded-2xl p-8 text-center cursor-pointer hover:bg-green-100 transition duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="flex justify-center text-green-600">
                {category.icon}
              </div>

              <h3 className="mt-4 font-semibold">
                {category.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Categories;