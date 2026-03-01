import React from 'react';

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-hero-bg bg-cover bg-center p-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Transform Your Workflow</h1>
            <h2 className="text-xl md:text-3xl mt-4 text-gray-200">Streamline processes and boost productivity</h2>
            <div className="mt-6 flex space-x-4">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">Get Started</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Learn More</button>
            </div>
        </div>
    );
};

export default Hero;

// TailwindCSS styles at the top in global CSS file
// .bg-hero-bg { background-image: url('/path/to/your/background-image.jpg'); }
