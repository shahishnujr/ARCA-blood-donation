import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Droplets, Heart, User, Phone, Mail, AlertCircle,Droplet } from 'lucide-react';

function App() {
  const [step, setStep] = useState(1);
  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
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
            <Droplet className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-4 hover:text-red-500 transition-colors">
              Schedule Your Donation
            </h1>
            <p className="text-gray-300 text-lg hover:text-white transition-colors">
              Your donation can save up to three lives. Schedule an appointment today.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num ? 'bg-red-600' : 'bg-gray-700'
                  } text-white transition-colors`}>
                    {num}
                  </div>
                  {num < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > num ? 'bg-red-600' : 'bg-gray-700'
                    } transition-colors`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Eligibility Check */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-6 hover:text-red-500 transition-colors">
                Eligibility Check
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    min="16"
                    max="65"
                    placeholder="Your age"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    min="50"
                    placeholder="Your weight"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Donation Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Blood Type</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors">
                    <option value="" className="bg-gray-900">Select Blood Type</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-900">{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-6 hover:text-red-500 transition-colors">
                Select Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Available Time Slots</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors">
                    <option value="" className="bg-gray-900">Select Time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time} className="bg-gray-900">{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Information */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-6 hover:text-red-500 transition-colors">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Address</label>
                  <input
                    type="text"
                    placeholder="Your address"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="flex items-center space-x-2 text-gray-300 cursor-pointer group">
                  <input type="checkbox" className="form-checkbox text-red-600" />
                  <span className="group-hover:text-white transition-colors">
                    I confirm that all provided information is accurate
                  </span>
                </label>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
          onClick={() => navigate('/final')} // Navigate to the Final Page
          className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
                  Schedule Appointment
                </button>
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="mt-12 p-4 bg-white/5 rounded-lg border border-red-500/50">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-2">Important Notice</h3>
                <p className="text-gray-300 text-sm">
                  Please ensure you haven't consumed alcohol in the last 24 hours and have had a proper meal before donation. 
                  Bring a valid ID and wear comfortable clothing. If you feel unwell on the day of donation, 
                  please reschedule your appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;