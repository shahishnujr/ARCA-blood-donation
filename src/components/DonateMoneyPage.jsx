import React, { useState, useEffect } from "react";
import { donateEther } from "../utils/contract";

const DonateMoneyPage = () => {
  const [senderAddress, setSenderAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setSenderAddress(accounts[0]);
        } catch (err) {
          console.error(err);
          alert("Failed to connect to MetaMask.");
        }
      } else {
        alert("Please install MetaMask to use this feature.");
      }
    }
    init();
  }, []);

  const handleDonate = async () => {
    try {
      if (!amount) {
        alert("Please enter a valid amount to donate.");
        return;
      }
      setStatus("Processing donation...");
      await donateEther(amount);
      setStatus("Donation successful!");
      setAmount("");
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1a1a1a, #333, #000)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#222",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Donate Ether
        </h2>

        <label style={{ display: "block", marginTop: "15px" }}>
          Sender Address
        </label>
        <input
          type="text"
          value={senderAddress}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #555",
            backgroundColor: "#333",
            color: "#aaa",
          }}
        />

        <label style={{ display: "block", marginTop: "15px" }}>
          Amount to Donate (ETH)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #555",
            backgroundColor: "#333",
            color: "white",
          }}
        />

        <button
          onClick={handleDonate}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#e63946",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Donate Ether
        </button>

        {status && (
          <p
            style={{
              marginTop: "15px",
              color: "#f4a261",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default DonateMoneyPage;
