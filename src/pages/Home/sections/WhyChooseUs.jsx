function WhyChooseUs() {
  const items = [
    {
      title: "Support Local Vendors",
      desc: "Help small shopkeepers and farmers grow their business online."
    },
    {
      title: "Fresh Products",
      desc: "Buy fresh and daily-use products directly from nearby sellers."
    },
    {
      title: "Easy Ordering",
      desc: "Simple cart and checkout system with Cash on Delivery."
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose LocalMarket?</h2>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-700">{item.title}</h3>
              <p className="mt-3 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;