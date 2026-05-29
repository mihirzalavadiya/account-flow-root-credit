import React from 'react';
import tickIcon from '../assets/tick-icon.svg';

interface SuccessModalProps {
  accountType: string;
  email: string;
  fullName: string;
  mobileNumber: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  accountType,
  email,
  fullName,
  mobileNumber,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon-wrapper">
          <img src={tickIcon} alt="Success" className="modal-tick-img" />
        </div>

        <h3 className="modal-main-heading">You’re all set!</h3>
        <p className="modal-sub-text">
          Here’s a quick summary of your account details
        </p>

        <div className="modal-summary-card">
          <div className="summary-row">
            <span className="summary-label">Account Type</span>
            <span className="summary-value">{accountType}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Email</span>
            <span className="summary-value">
              {email || 'jo••••@example.com'}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Name</span>
            <span className="summary-value">{fullName}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Mobile Number</span>
            <span className="summary-value">{mobileNumber}</span>
          </div>
        </div>

        <div className="modal-security-badge">
          <span className="shield-icon">🛡️</span>
          <span className="security-text">
            Your account is secured with bank-grade security
          </span>
        </div>

        <button className="modal-dashboard-btn" onClick={onClose}>
          Go To Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
