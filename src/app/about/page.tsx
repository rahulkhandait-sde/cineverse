import React from "react";
import { Header } from "../../components/Header";
const About: React.FC = () => {
  return (
    <>
    <Header/>
  
      {/* Hero Section */}
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* About Section */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mt-16 mb-8 text-center bg-gradient-to-r from-red-900 to-purple-600 dark:from-red-700 dark:to-purple-400 text-transparent bg-clip-text">
              About Cineverse
            </h1>
            
            <div className="space-y-8">
              {/* Introduction */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-2 hover:border-red-500">
                <p className="text-lg leading-relaxed">
                  Cineverse is your ultimate movie discovery platform, designed to help film 
                  enthusiasts explore, search, and track their favorite movies with ease. 
                  Our platform combines powerful search capabilities with a user-friendly 
                  interface to enhance your movie-watching experience.
                </p>
              </div>

              {/* Mission Section */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-2 hover:border-red-500">
                <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                 
                  Our Mission
                </h2>
                <p className="text-lg leading-relaxed">
                  We strive to create an inclusive and engaging platform where movie lovers 
                  can discover new films, share their passion, and connect with fellow 
                  cinema enthusiasts. Our goal is to make the world of cinema more 
                  accessible and enjoyable for everyone.
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-2 hover:border-red-500">
                  <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
                  <p>Advanced search features to help you find exactly what you're looking for.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-2 hover:border-red-500">
                  <h3 className="text-xl font-semibold mb-3">Rich Database</h3>
                  <p>Extensive collection of movies with detailed information and ratings.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-2 hover:border-red-500">
                  <h3 className="text-xl font-semibold mb-3">Modern UI</h3>
                  <p>Clean, responsive interface with dark mode support for comfortable browsing.</p>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
      </>
  );
};

export default About;
