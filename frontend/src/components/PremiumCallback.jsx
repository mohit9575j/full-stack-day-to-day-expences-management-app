// PremiumCallback.jsx - Component to handle redirect after payment
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// Base URL for all API calls
const API_BASE_URL = 'http://13.203.206.230:4000';

const PremiumCallback = () => {
  const [status, setStatus] = useState('verifying');
  const navigate = useNavigate();

  useEffect(() => { 
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      // Get the order_id from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('order_id') || localStorage.getItem('pendingOrderId');
      
      if (!orderId) {
        setStatus('failed');
        toast.error('Payment verification failed: Order ID not found');
        setTimeout(() => navigate('/dashboard'), 3000);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setStatus('failed');
        toast.error('Authentication error. Please login again.');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      // Using your correct API endpoint for verifying payment
      const response = await axios.post(`${API_BASE_URL}/api/premium/verify-payment`, 
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setStatus('success');
        toast.success('Payment successful! You are now a premium member.');
        // Clear the pending order ID
        localStorage.removeItem('pendingOrderId');
        setTimeout(() => navigate('/leaderdashboard'), 3000);
      } else {
        setStatus('pending');
        toast.info('Payment is still processing. We will notify you once confirmed.');
        setTimeout(() => navigate('/dashboard'), 3000);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setStatus('failed');
      toast.error('Payment verification failed. Please contact support.');
      setTimeout(() => navigate('/dashboard'), 3000);
    }
  };

  return (
    <div className="premium-callback">
      <div className="payment-status-container">
        {status === 'verifying' && (
          <div className="status-message verifying">
            <h2>Verifying your payment...</h2>
            <div className="loader"></div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="status-message success">
            <h2>Payment Successful!</h2>
            <p>Congratulations! You are now a premium member.</p>
            <p>Redirecting to dashboard...</p>
          </div>
        )}
        
        {status === 'pending' && (
          <div className="status-message pending">
            <h2>Payment Processing</h2>
            <p>Your payment is being processed. We'll update you once it's confirmed.</p>
            <p>Redirecting to dashboard...</p>
          </div>
        )}
        
        {status === 'failed' && (
          <div className="status-message failed">
            <h2>TRANSACTION FAILED</h2>
            <p>We couldn't process your payment. Please try again later.</p>
            <p>Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumCallback;
