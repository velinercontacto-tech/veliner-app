import React from 'react';
import './styles.css';

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center bg-cover bg-hero-pattern">
        <h1 className="text-4xl font-bold text-gray-900 mb-5">Welcome to Veliner<br />The Ultimate SaaS Platform</h1>
        <p className="text-lg text-gray-700 mb-8">Empower your business with our seamless solutions.</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5">
        <h2 className="text-3xl font-semibold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border p-5 rounded-lg shadow-md">Feature 1</div>
          <div className="border p-5 rounded-lg shadow-md">Feature 2</div>
          <div className="border p-5 rounded-lg shadow-md">Feature 3</div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-100 py-20 px-5">
        <h2 className="text-3xl font-semibold text-center mb-10">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border p-5 rounded-lg shadow-md">Basic Plan</div>
          <div className="border p-5 rounded-lg shadow-md">Standard Plan</div>
          <div className="border p-5 rounded-lg shadow-md">Premium Plan</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-5">
        <h2 className="text-3xl font-semibold text-center mb-10">Testimonials</h2>
        <div className="flex flex-col items-center">
          <p className="mb-5">"This platform changed our business for the better!" - Happy Customer</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold">Ready to get started?</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">Sign Up Now</button>
      </section>
    </div>
  );
};

export default LandingPage;