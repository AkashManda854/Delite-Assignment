function ExperienceCard({ experience, onBook }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
          <span className="text-blue-600 font-bold text-lg">${experience.price}</span>
        </div>
        {/* Category Badge */}
        {experience.category && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {experience.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition">
          {experience.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm">{experience.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>

        {/* Rating */}
        {experience.rating && (
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(experience.rating) ? "fill-current" : "fill-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600 text-sm">
              {experience.rating} ({experience.reviews || 0} reviews)
            </span>
          </div>
        )}

        {/* Available Slots */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Available Dates:</p>
          <div className="flex flex-wrap gap-2">
            {experience.availableSlots.slice(0, 3).map((slot, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {new Date(slot).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ))}
            {experience.availableSlots.length > 3 && (
              <span className="text-blue-600 text-xs font-medium px-3 py-1">
                +{experience.availableSlots.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={() => onBook(experience)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ExperienceCard;
