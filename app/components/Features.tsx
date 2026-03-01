import React from 'react';

const features = [
  {
    icon: '🔥', // Placeholder for an icon
    title: 'Feature One',
    description: 'Description of feature one, showcasing its capabilities.',
  },
  {
    icon: '🚀', // Placeholder for an icon
    title: 'Feature Two',
    description: 'Description of feature two, highlighting its strengths.',
  },
  {
    icon: '🔒', // Placeholder for an icon
    title: 'Feature Three',
    description: 'Description of feature three, demonstrating its value.',
  },
  {
    icon: '📊', // Placeholder for an icon
    title: 'Feature Four',
    description: 'Description of feature four, explaining its benefits.',
  },
];

const Features = () => {
  return (
    <section className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Veliner Platform Capabilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="mt-2 text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;