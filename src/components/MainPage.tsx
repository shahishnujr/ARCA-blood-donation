import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Heart, Calendar, Phone, ArrowRight, Clock } from 'lucide-react';
import { BloodAnimation } from './BloodAnimation';
import { FooterAnimation } from './FooterAnimation';

function MainPage() {
  const navigate = useNavigate(); // Create a navigate function

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center bg-gradient-to-b from-gray-900 to-red-900">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <BloodAnimation />
          </Canvas>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Every Drop Counts. Be a Hero Today.</h1>
            <p className="text-xl mb-8">
              Your blood donation can save up to three lives. Join our mission to make a difference in someone's life.
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
              onClick={() => navigate('/donate')} // Navigate to the donate page
            >
              Donate Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Why Donate Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Donate Blood?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Lives</h3>
              <p className="text-gray-600">
                One donation can save up to three lives and help countless others.
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-600">The donation process takes less than an hour of your time.</p>
            </div>
            <div className="text-center">
              <Calendar className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Regular Need</h3>
              <p className="text-gray-600">
                Blood is needed every day for surgeries, treatments, and emergencies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Schedule your donation appointment today. It only takes a few minutes to register.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
              onClick={() => navigate('/donate')} // Navigate to the donate page
            >
              Schedule Appointment <Calendar className="w-5 h-5" />
            </button>
            <button
  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 justify-center"
  onClick={() => navigate('/contact')} // Navigate to the Contact Us page
>
  Contact Us <Phone className="w-5 h-5" />
</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 h-48">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <FooterAnimation />
          </Canvas>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-xl font-semibold mb-4">Blood Donation Center</p>
          <p className="text-gray-400">Together, we make a difference.</p>
          <p className="mt-6">© 2024 Blood Donation Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
