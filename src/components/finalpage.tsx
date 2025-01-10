import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Gift, Users, Calendar } from 'lucide-react';

function App() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Blood Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 30 + 20}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-12">
            <Heart className="w-20 h-20 text-red-600 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-6 hover:text-red-500 transition-colors">
              Thank You for Your Noble Gesture
            </h1>
            <p className="text-gray-300 text-xl mb-8 hover:text-white transition-colors">
              Your decision to donate blood will help save precious lives.
            </p>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-colors">
              <Gift className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-white text-xl font-semibold mb-2 text-center">One Donation</h3>
              <p className="text-gray-300 text-center">Can save up to three lives</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-colors">
              <Users className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-white text-xl font-semibold mb-2 text-center">Every 2 Seconds</h3>
              <p className="text-gray-300 text-center">Someone needs blood</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-colors">
              <Calendar className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-white text-xl font-semibold mb-2 text-center">Regular Donation</h3>
              <p className="text-gray-300 text-center">Helps maintain blood supply</p>
            </div>
          </div>

          {/* Inspirational Message */}
          <div className="text-center mb-12">
            <p className="text-2xl text-white mb-4 italic">
              "The gift of blood is the gift of life"
            </p>
            <p className="text-gray-300">
              Your commitment to helping others through blood donation is truly admirable.
              Together, we can make a difference in our community.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={() => navigate('/schedule')}
              className="bg-red-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>Schedule Another Donation</span>
            </button>
            <p className="text-gray-400 mt-4 text-sm">
              You can donate blood again after 56 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;