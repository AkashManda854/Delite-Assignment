import { useState } from "react";

function Hero({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, location, date });
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Book unique experiences around the world
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What
              </label>
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Location Input */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where
              </label>
              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Date Input */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Search Button */}
            <div className="md:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hero;
