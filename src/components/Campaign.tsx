import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Heart, Activity } from "lucide-react";
import { donateEther } from "../utils/contract"; // Import the donateEther function

interface Campaign {
  id: number;
  date: string;
  time: string;
  venue: string;
  votes: number;
}

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      date: "March 25, 2024",
      time: "9:00 AM - 5:00 PM",
      venue: "City Community Center",
      votes: 0,
    },
    {
      id: 2,
      date: "April 2, 2024",
      time: "10:00 AM - 6:00 PM",
      venue: "Central Hospital",
      votes: 0,
    },
    {
      id: 3,
      date: "April 15, 2024",
      time: "8:00 AM - 4:00 PM",
      venue: "University Campus",
      votes: 0,
    },
  ]);

  const [votedFor, setVotedFor] = useState<number | null>(null);
  const [newCampaign, setNewCampaign] = useState({
    date: "",
    time: "",
    venue: "",
  });
  const [amount, setAmount] = useState(""); // State for donation amount
  const [status, setStatus] = useState(""); // Status for feedback messages
  const [bubbles, setBubbles] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 7,
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();
    window.addEventListener("load", generateBubbles);
    return () => window.removeEventListener("load", generateBubbles);
  }, []);

  const handleVote = (campaignId: number) => {
    setStatus(`Processing your vote for Campaign #${campaignId}...`);
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === campaignId ? { ...campaign, votes: campaign.votes + 1 } : campaign
    );
    setCampaigns(updatedCampaigns);
    setVotedFor(campaignId); // Mark the campaign as voted
    localStorage.setItem("votedCampaign", campaignId.toString());
    localStorage.setItem("campaignVotes", JSON.stringify(updatedCampaigns));
    setStatus(`Successfully voted for Campaign #${campaignId}!`);
  };

  const handleDonate = async () => {
    try {
      if (!amount || parseFloat(amount) <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }
      setStatus(`Processing your donation of ${amount} ETH...`);
      await donateEther(amount); // Call the donateEther function to process the donation
      setStatus(`Successfully donated ${amount} ETH!`);
      setAmount(""); // Clear the donation amount
    } catch (err) {
      console.error(err);
      setStatus(`Error: `);
    }
  };

  const handleCreateCampaign = () => {
    const { date, time, venue } = newCampaign;
    if (!date || !time || !venue) {
      alert("Please fill out all fields to create a campaign.");
      return;
    }

    const newId = campaigns.length + 1;
    const updatedCampaigns = [
      ...campaigns,
      {
        id: newId,
        date,
        time,
        venue,
        votes: 0,
      },
    ];
    setCampaigns(updatedCampaigns);
    localStorage.setItem("campaignVotes", JSON.stringify(updatedCampaigns));
    setNewCampaign({ date: "", time: "", venue: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute w-8 h-8 bg-red-600 rounded-full opacity-50 animate-float"
            style={{
              left: `${bubble.left}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              transform: "translateZ(0)",
            }}
          />
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center text-red-600 mb-8">Give Blood, Save Lives</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-red-600 transform transition-all duration-300 hover:scale-105"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-red-600">Campaign #{campaign.id}</h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Date</h3>
                      <p className="text-gray-300">{campaign.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Time</h3>
                      <p className="text-gray-300">{campaign.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Venue</h3>
                      <p className="text-gray-300">{campaign.venue}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <Activity className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">{campaign.votes} votes</p>
                  </div>

                  <button
                    onClick={() => handleVote(campaign.id)}
                    disabled={votedFor !== null}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold transition-all ${
                      votedFor !== null
                        ? votedFor === campaign.id
                          ? "bg-red-600 cursor-not-allowed"
                          : "bg-gray-700 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    <span>
                      {votedFor !== null
                        ? votedFor === campaign.id
                          ? "Voted!"
                          : "Already Voted"
                        : "Vote"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donation Section */}
        <div className="max-w-lg mx-auto bg-gray-900 rounded-lg p-6 shadow-2xl border border-red-600 mt-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Donate Ether</h2>
          <p className="text-gray-300 mb-4">
            Your donation helps us organize better campaigns, reach more donors, and provide better facilities at our
            venues. Every contribution makes a difference in saving lives!
          </p>
          <form>
            <input
              type="number"
              placeholder="Amount to Donate (ETH)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mb-4 bg-black border border-gray-700 text-white rounded"
            />
            <button
              type="button"
              onClick={handleDonate}
              className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Donate Ether
            </button>
          </form>
        </div>

        {/* Successfully Donated Message */}
        {status && status.startsWith("Successfully donated") && (
          <div className="max-w-lg mx-auto text-center bg-green-800 p-4 rounded-lg mt-8">
            <p className="text-white font-bold">{status}</p>
          </div>
        )}

        {/* Create Campaign Section */}
        <div className="max-w-lg mx-auto bg-gray-900 rounded-lg p-6 shadow-2xl border border-red-600 mt-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Create a New Campaign</h2>
          <form>
            <input
              type="date"
              value={newCampaign.date}
              onChange={(e) => setNewCampaign({ ...newCampaign, date: e.target.value })}
              className="w-full p-2 mb-4 bg-black border border-gray-700 text-white rounded"
            />
            <input
              type="text"
              placeholder="Time (e.g., 9:00 AM - 5:00 PM)"
              value={newCampaign.time}
              onChange={(e) => setNewCampaign({ ...newCampaign, time: e.target.value })}
              className="w-full p-2 mb-4 bg-black border border-gray-700 text-white rounded"
            />
            <input
              type="text"
              placeholder="Venue"
              value={newCampaign.venue}
              onChange={(e) => setNewCampaign({ ...newCampaign, venue: e.target.value })}
              className="w-full p-2 mb-4 bg-black border border-gray-700 text-white rounded"
            />
            <button
              type="button"
              onClick={handleCreateCampaign}
              className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Create Campaign
            </button>
          </form>
        </div>

        {/* Status Section */}
        {status && !status.startsWith("Successfully donated") && (
          <div className="mt-8 text-center">
            <p className="text-blue-400">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;