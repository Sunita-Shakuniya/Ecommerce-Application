import React from 'react';

const StarRating = ({ rating }) => {
    // Convert rating to integer (assuming rating is between 0 and 5)
    const starCount = Math.round(rating); 

    // Generate an array of stars based on the rating
    const stars = Array.from({ length: 5 }, (_, index) => index < starCount);

    return (
        <div className="flex items-center">
            {stars.map((filled, index) => (
                <svg
                    key={index}
                    className={`w-5 h-5 ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 15l-3.09 1.623L8.03 11.9l-4.255-3.893 5.436-.785L10 3.174l1.789 4.048 5.438.785-4.255 3.893 1.12 4.723L10 15z"
                    />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;
