import React from 'react';

interface AccountTypeProps {
  selectedType: string;
  setSelectedType: (type: 'personal' | 'business') => void;
  onNext: (type: string) => void;
}

const AccountType: React.FC<AccountTypeProps> = ({
  selectedType,
  setSelectedType,
  onNext,
}) => {
  return (
    <div className="form-card">
      <h2 className="card-heading">
        To join us tell us{' '}
        <span className="text-bold">what type of account</span> you are opening
      </h2>

      <div className="options-group">
        <div
          className={`option-item ${
            selectedType === 'personal' ? 'selected' : ''
          }`}
          onClick={() => setSelectedType('personal')}
        >
          <div className="option-left">
            <span className="option-icon">👤</span>
            <span className="option-label">Personal</span>
          </div>
          <div className="badge-circle">
            {selectedType === 'personal' && (
              <span className="check-icon">✓</span>
            )}
          </div>
        </div>

        <div
          className={`option-item ${
            selectedType === 'business' ? 'selected' : ''
          }`}
          onClick={() => setSelectedType('business')}
        >
          <div className="option-left">
            <span className="option-icon">💼</span>
            <span className="option-label">Business</span>
          </div>
          <div className="badge-circle">
            {selectedType === 'business' && (
              <span className="check-icon">✓</span>
            )}
          </div>
        </div>
      </div>

      <div className="action-footer">
        <button className="btn-back">Back</button>
        <button className="btn-continue" onClick={() => onNext(selectedType)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default AccountType;
