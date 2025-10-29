import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ExperienceCard from "./components/ExperienceCard";
import BookingModal from "./components/BookingModal";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch data from backend when app starts
  useEffect(() => {
    axios
      .get("http://localhost:5000/experiences")
      .then((res) => {
        setExperiences(res.data);
        setFilteredExperiences(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(experiences.map((exp) => exp.category).filter(Boolean))];

  // Handle search
  const handleSearch = ({ searchTerm, location, date }) => {
    let filtered = experiences;

    if (searchTerm) {
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((exp) =>
        exp.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (date) {
      filtered = filtered.filter((exp) =>
        exp.availableSlots.some((slot) => slot === date)
      );
    }

    setFilteredExperiences(filtered);
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredExperiences(experiences);
    } else {
      setFilteredExperiences(
        experiences.filter((exp) => exp.category === category)
      );
    }
  };

  // Handle booking
  const handleBook = (experience) => {
    setSelectedExperience(experience);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedExperience(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onSearch={handleSearch} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Explore Experiences
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 text-lg mt-4">Loading experiences...</p>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No experiences found. Try adjusting your search.
            </p>
          </div>
        ) : (
          <div
            id="experiences"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} onBook={handleBook} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Unique Experiences</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Countries</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Booking Modal */}
      {selectedExperience && (
        <BookingModal experience={selectedExperience} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
