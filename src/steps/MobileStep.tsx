import React, { useState } from 'react';
import Button from '../components/Button';

interface MobileStepProps {
  value: string;
  onNext: (mobile: string) => void;
  onBack: () => void;
}

interface CountryOption {
  code: string;
  flag: string;
  name: string;
}

const MobileStep: React.FC<MobileStepProps> = ({ value, onNext, onBack }) => {
  const [mobileNumber, setMobileNumber] = useState<string>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>({
    code: '+1',
    flag: '🇺🇸',
    name: 'USA',
  });

  const countries: CountryOption[] = [
    { code: '+1', flag: '🇺🇸', name: 'USA' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^[0-9]*$/.test(inputValue)) {
      setMobileNumber(inputValue);
    }
  };

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (mobileNumber.trim() !== '') {
      onNext(`${selectedCountry.code} ${mobileNumber}`);
    }
  };

  return (
    <div className="form-card relative-card">
      <div className="progress-bar-container">
        <div className="progress-line step-2"></div>
      </div>

      <h2 className="card-heading text-bold">OTP Verification</h2>

      <div className="options-group">
        <label className="input-label">
          Mobile Number<span className="required-star">*</span>
        </label>

        <div className="phone-input-wrapper">
          <div className="dropdown-container">
            <div
              className="country-selector"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="flag-icon">{selectedCountry.flag}</span>
              <span className="country-code">{selectedCountry.code}</span>
              <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
                ⌃
              </span>
            </div>

            {isOpen && (
              <div className="country-dropdown-list">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    className="country-dropdown-item"
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span>{country.flag}</span>
                    <span>
                      {country.name} ({country.code})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            inputMode="numeric"
            className="mobile-text-input"
            placeholder="8343989239"
            value={mobileNumber}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="action-footer">
        <Button type="back" text="Back" onClick={onBack} />
        <Button type="continue" text="Continue" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default MobileStep;
