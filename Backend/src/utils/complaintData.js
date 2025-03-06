const sampleComplaints = [
  {
    description: "Street lights are not functioning in the main market area.",
    category: "Electricity",
    city: "Indore",
    image: "https://example.com/images/street-lights.jpg",
    month: new Date("2025-02-01T00:00:00Z"), // ISO 8601 format
    urgency: "High"
  },
  {
    description: "Potholes on the main highway causing accidents.",
    category: "Road",
    city: "Bhopal",
    image: "https://example.com/images/potholes.jpg",
    month: new Date("2025-01-15T00:00:00Z"),
    urgency: "High"
  },
  {
    description: "Uncollected garbage in residential area for over a week.",
    category: "Sanitation",
    city: "Mumbai",
    image: "https://example.com/images/garbage.jpg",
    month: new Date("2025-02-10T00:00:00Z"),
    urgency: "Medium"
  },
  {
    description: "Traffic signals at major junctions not working.",
    category: "Roadways",
    city: "Delhi",
    image: "https://example.com/images/traffic-signal.jpg",
    month: new Date("2025-03-05T00:00:00Z"),
    urgency: "High"
  },
  {
    description: "Water leakage near the main electric pole, risk of short circuit.",
    category: "Electricity",
    city: "Pune",
    image: "https://example.com/images/water-leakage.jpg",
    month: new Date("2025-01-20T00:00:00Z"),
    urgency: "High"
  },
  {
    description: "Broken drainage system leading to waterlogging during rains.",
    category: "Sanitation",
    city: "Kolkata",
    image: "https://example.com/images/drainage-issue.jpg",
    month: new Date("2025-02-28T00:00:00Z"),
    urgency: "Medium"
  },
  {
    description: "Speed breakers missing on school road, making it dangerous for kids.",
    category: "Road",
    city: "Chennai",
    image: "https://example.com/images/speed-breakers.jpg",
    month: new Date("2025-03-01T00:00:00Z"),
    urgency: "Low"
  },
  {
    description: "Heavy traffic congestion due to improper lane management.",
    category: "Roadways",
    city: "Bangalore",
    image: "https://example.com/images/traffic-jam.jpg",
    month: new Date("2025-02-22T00:00:00Z"),
    urgency: "Medium"
  }
];

export default sampleComplaints;
