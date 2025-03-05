import React from 'react';

const GrievanceCard = ({ complaints }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <div key={complaint._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{complaint.title}</h3>
            <p className="text-gray-400">{complaint.description}</p>
            <span className="text-sm text-gray-500">Category: {complaint.category}</span>
          </div>
        ))
      ) : (
        <p className="text-white">No complaints found for your department.</p>
      )}
    </div>
  );
};

export default GrievanceCard;
