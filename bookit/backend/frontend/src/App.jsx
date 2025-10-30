import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend when app starts
  useEffect(() => {
    axios
      .get("https://delite-assignment.onrender.com/experiences")
      .then((res) => {
        setExperiences(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        🌍 Adventure Experiences
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading experiences...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {exp.title}
              </h2>
              <p className="text-gray-600 mb-2">{exp.location}</p>
              <p className="text-green-700 font-bold mb-2">${exp.price}</p>
              <p className="text-sm text-gray-500 mb-3">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.availableSlots.map((slot, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
