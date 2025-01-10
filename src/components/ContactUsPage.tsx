import React from 'react';
import { Phone, Mail, MapPin, Heart, Facebook, Twitter, Instagram } from 'lucide-react';

function ContactUsPage() {
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
            <Heart className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-4 hover:text-red-500 transition-colors">
              Contact Us
            </h1>
            <p className="text-gray-300 text-lg hover:text-white transition-colors">
              Your donation can save lives. Reach out to us today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white mb-6 hover:text-red-500 transition-colors">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <Phone className="w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors" />
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    +1 (555) 123-4567
                  </p>
                </div>

                <div className="flex items-center space-x-4 group">
                  <Mail className="w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors" />
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    donate@bloodlife.org
                  </p>
                </div>

                <div className="flex items-center space-x-4 group">
                  <MapPin className="w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors" />
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    123 Life Street, Health City, 12345
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold text-white mb-4 hover:text-red-500 transition-colors">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <Facebook className="w-6 h-6 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
                  <Twitter className="w-6 h-6 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
                  <Instagram className="w-6 h-6 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg focus:border-red-500 text-white placeholder-gray-400 hover:border-red-400 transition-colors"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
