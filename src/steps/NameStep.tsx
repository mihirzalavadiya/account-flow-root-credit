import React, { useState, useRef } from 'react';
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

  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (value.includes('  ')) return;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setter(value);
      errorSetter(false);
    }
  };

  const validateEmail = (value: string) => {
    if (value.trim() === '') {
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = () => {
    let isValid = true;

    if (firstName.trim() === '') {
      setFirstNameError(true);
      if (isValid && firstNameRef.current) {
        firstNameRef.current.focus();
      }
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError(true);
      if (isValid && lastNameRef.current) {
        lastNameRef.current.focus();
      }
      isValid = false;
    }

    if (!isValid) return;

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
            ref={firstNameRef}
            type="text"
            className={`input-text-element ${
              firstNameError ? 'input-error-border' : ''
            }`}
            placeholder="Oliver"
            value={firstName}
            onChange={(e) =>
              handleNameChange(e.target.value, setFirstName, setFirstNameError)
            }
          />
        </div>

        <div className="input-field-block">
          <label className="input-label">Last Name</label>
          <input
            ref={lastNameRef}
            type="text"
            className={`input-text-element ${
              lastNameError ? 'input-error-border' : ''
            }`}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) =>
              handleNameChange(e.target.value, setLastName, setLastNameError)
            }
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
              if (emailError) setEmailError('');
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
