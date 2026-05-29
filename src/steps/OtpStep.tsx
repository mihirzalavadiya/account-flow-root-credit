import React, { useState, useRef } from 'react';
import Button from '../components/Button';

interface OtpStepProps {
  onNext: (otp: string) => void;
  onBack: () => void;
}

const OtpStep: React.FC<OtpStepProps> = ({ onNext, onBack }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [hasError, setHasError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (hasError) setHasError(false);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');

    if (otpCode.length < 4) {
      setHasError(true);

      const firstEmptyIndex = otp.findIndex((digit) => digit === '');
      if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
        inputRefs.current[firstEmptyIndex]?.focus();
      } else if (inputRefs.current[0]) {
        inputRefs.current[0]?.focus();
      }
      return;
    }

    onNext(otpCode);
  };

  return (
    <div className="form-card relative-card">
      <div className="progress-bar-container">
        <div className="progress-line step-3"></div>
      </div>

      <h2 className="card-heading text-bold">OTP Verification</h2>

      <div className="options-group">
        <label className="input-label">
          An OTP has been sent to your mobile number
        </label>

        <div className="otp-inputs-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`otp-box-input ${
                hasError && digit === '' ? 'input-error-border' : ''
              }`}
              placeholder="-"
            />
          ))}
        </div>

        <p className="resend-text">
          Did not receive OTP? <span className="resend-link">Resend OTP</span>
        </p>
      </div>

      <div className="action-footer">
        <Button type="back" text="Back" onClick={onBack} />
        <Button type="continue" text="Continue" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default OtpStep;
