import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Heart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface Campaign {
  id: number;
  date: string;
  time: string;
  venue: string;
  address: string;
  votes: number;
}

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      date: "March 25, 2024",
      time: "9:00 AM - 5:00 PM",
      venue: "City Community Center",
      address: "123 Main Street",
      votes: 0
    },
    {
      id: 2,
      date: "April 2, 2024",
      time: "10:00 AM - 6:00 PM",
      venue: "Central Hospital",
      address: "456 Medical Drive",
      votes: 0
    },
    {
      id: 3,
      date: "April 15, 2024",
      time: "8:00 AM - 4:00 PM",
      venue: "University Campus",
      address: "789 College Road",
      votes: 0
    }
  ]);
  const [votedFor, setVotedFor] = useState<number | null>(null);
  const [bubbles, setBubbles] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const savedVote = localStorage.getItem('votedCampaign');
    if (savedVote) {
      setVotedFor(parseInt(savedVote));
    }
    const savedVotes = localStorage.getItem('campaignVotes');
    if (savedVotes) {
      setCampaigns(JSON.parse(savedVotes));
    }
  }, []);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 7
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();
    window.addEventListener('load', generateBubbles);
    return () => window.removeEventListener('load', generateBubbles);
  }, []);

  const handleVote = (campaignId: number) => {
    if (votedFor === null) {
      const updatedCampaigns = campaigns.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, votes: campaign.votes + 1 }
          : campaign
      );
      setCampaigns(updatedCampaigns);
      setVotedFor(campaignId);
      localStorage.setItem('votedCampaign', campaignId.toString());
      localStorage.setItem('campaignVotes', JSON.stringify(updatedCampaigns));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Blood Cells */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map(bubble => (
          <div
          key={bubble.id}
          className="absolute w-8 h-8 bg-red-600 rounded-full opacity-50 animate-float"
          style={{
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            transform: 'translateZ(0)'
          }}
        />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-red-600 neon-hover p-4 inline-block rounded-lg">
            Give Blood, Save Lives
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto neon-hover p-4 rounded-lg">
            Choose your preferred donation date and venue. Every vote helps us organize better campaigns!
          </p>
        </div>

        {/* Campaign Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {campaigns.map(campaign => (
            <div 
              key={campaign.id}
              className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-red-600 transform transition-all duration-300 hover:scale-105"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4 neon-hover p-2 rounded-lg inline-block">
                  Campaign #{campaign.id}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 neon-hover p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Date</h3>
                      <p className="text-gray-300">{campaign.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 neon-hover p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Time</h3>
                      <p className="text-gray-300">{campaign.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 neon-hover p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Venue</h3>
                      <p className="text-gray-300">{campaign.venue}<br />{campaign.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="text-center neon-hover p-2 rounded-lg">
                    <Activity className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">{campaign.votes} votes</p>
                  </div>

                  <button
                    onClick={() => handleVote(campaign.id)}
                    disabled={votedFor !== null}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold transition-all
                      ${votedFor !== null
                        ? votedFor === campaign.id
                          ? 'bg-red-600 cursor-not-allowed'
                          : 'bg-gray-700 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700'}`}
                  >
                    <Heart className="w-5 h-5" />
                    <span>
                      {votedFor !== null
                        ? votedFor === campaign.id
                          ? 'Voted!'
                          : 'Already Voted'
                        : 'Support this campaign'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;