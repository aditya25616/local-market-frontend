function Categories() {
  const categories = ["Vegetables", "Fruits", "Handicrafts", "Dairy", "Bakery", "Grocery"];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        <p className="mt-2 text-gray-600">Find products from trusted local sellers.</p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center font-semibold text-green-700 hover:shadow-md transition"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;