 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:4000';

const PremiumButton = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`${API_BASE_URL}/api/premium/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsPremium(response.data.isPremium);
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  const handleBuyPremium = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to continue');
        setIsLoading(false);
        return;
      }

      // ✅ Validate phone number
      if (!phoneNumber || phoneNumber.length !== 10 || !/^[0-9]+$/.test(phoneNumber)) {
        toast.error('Please enter a valid 10-digit phone number');
        setIsLoading(false);
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/premium/create-order`,
        {
          returnUrl: window.location.origin + '/premium-callback',
          phoneNumber: phoneNumber
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success && response.data.cashfreeOrderData) {
        const { payment_session_id } = response.data.cashfreeOrderData;

        localStorage.setItem('pendingOrderId', response.data.orderId);

        const script = document.createElement('script');
        script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js";
        script.onload = () => {
          const cashfree = new window.Cashfree(payment_session_id);
          cashfree.redirect();
        };
        document.body.appendChild(script);
      } else {
        toast.error('Failed to create payment. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="premium-button-container">
      {isPremium ? (
        <div className="premium-badge">
          <span>Premium Member</span>
        </div>
      ) : (
        <>
          <input
            type="tel"
            placeholder="Enter your 10-digit phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="phone-input"
            required
          />
          <button
            className="buy-premium-btn"
            onClick={handleBuyPremium}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Buy Premium Membership'}
          </button>
        </>
      )}
    </div>
  );
};

export default PremiumButton;



