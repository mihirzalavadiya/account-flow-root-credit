import React, { useState } from 'react';
import Button from '../components/Button';

interface NameStepProps {
  firstNameValue: string;
  lastNameValue: string;
  emailValue: string;
  onNext: (firstName: string, lastName: string, email: string) => void;
  onBack: () => void;
}

const NameStep: React.FC<NameStepProps> = ({
  firstNameValue,
  lastNameValue,
  emailValue,
  onNext,
  onBack,
}) => {
  const [firstName, setFirstName] = useState<string>(firstNameValue);
  const [lastName, setLastName] = useState<string>(lastNameValue);
  const [email, setEmail] = useState<string>(emailValue);
  const [emailError, setEmailError] = useState<string>('');

  const handleNameChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.includes('  ')) return;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setter(value);
    }
  };

  const validateEmail = (value: string) => {
    if (value.trim() === '') {
      return true; // Khali hai toh chalega kyunki optional hai
    }
    // Sahi email format ka regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = () => {
    if (firstName.trim() === '' || lastName.trim() === '') {
      return; // First aur Last name zaroori hain
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    onNext(firstName.trim(), lastName.trim(), email.trim());
  };

  return (
    <div className="form-card relative-card">
      <div className="progress-bar-container">
        <div className="progress-line step-4"></div>
      </div>

      <h2 className="card-heading text-bold">What is your name?</h2>

      <div className="options-group fields-layout-gap">
        <div className="input-field-block">
          <label className="input-label">First Name</label>
          <input
            type="text"
            className="input-text-element"
            placeholder="Oliver"
            value={firstName}
            onChange={(e) => handleNameChange(e.target.value, setFirstName)}
          />
        </div>

        <div className="input-field-block">
          <label className="input-label">Last Name</label>
          <input
            type="text"
            className="input-text-element"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleNameChange(e.target.value, setLastName)}
          />
        </div>

        <div className="input-field-block">
          <label className="input-label">
            Email <span className="optional-text">(Optional)</span>
          </label>
          <input
            type="email"
            className={`input-text-element ${
              emailError ? 'input-error-border' : ''
            }`}
            placeholder="oliver@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(''); // Type karte hi error hata do
            }}
          />
          {emailError && <p className="email-error-msg">{emailError}</p>}
        </div>
      </div>

      <div className="action-footer">
        <Button type="back" text="Back" onClick={onBack} />
        <Button type="continue" text="Continue" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default NameStep;
