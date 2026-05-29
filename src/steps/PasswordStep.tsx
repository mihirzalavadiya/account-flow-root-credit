import React, { useState, useRef } from 'react';
import Button from '../components/Button';
import closeEyeIcon from '../assets/closeeye.svg';
import openEyeIcon from '../assets/openeye.svg';

interface PasswordStepProps {
  onNext: (password: string) => void;
  onBack: () => void;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ onNext, onBack }) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const getPasswordStrength = () => {
    if (!password) return { score: 0, text: '', colorClass: '' };
    if (password.length < 6)
      return { score: 1, text: 'Weak', colorClass: 'weak' };

    let passedChecks = 0;
    if (/[A-Z]/.test(password)) passedChecks++;
    if (/[0-9]/.test(password)) passedChecks++;
    if (/[@$!%*?&]/.test(password)) passedChecks++;

    if (passedChecks < 3) {
      return { score: 2, text: 'Medium', colorClass: 'medium' };
    }
    return { score: 3, text: 'Strong', colorClass: 'strong' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = () => {
    if (strength.score < 3) {
      setError('Please fulfill all criteria to make a Strong password');
      setPasswordError(true);
      setConfirmPasswordError(false);
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }

    if (password !== confirmPassword) {
      setError('Both passwords must match');
      setConfirmPasswordError(true);
      setPasswordError(false);
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.focus();
      }
      return;
    }

    setError('');
    setPasswordError(false);
    setConfirmPasswordError(false);
    onNext(password);
  };

  return (
    <div className="form-card relative-card">
      <div className="progress-bar-container">
        <div className="progress-line step-5"></div>
      </div>

      <h2 className="card-heading text-bold">
        Create Password for your account
      </h2>

      <div className="options-group fields-layout-gap">
        <div className="input-field-block relative-field">
          <label className="input-label">Enter new password</label>
          <div className="password-input-wrapper">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              className={`input-text-element padding-right-input ${
                passwordError ? 'input-error-border' : ''
              }`}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(false);
                if (error) setError('');
              }}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src={openEyeIcon} alt="openeye" />
              ) : (
                <img src={closeEyeIcon} alt="closeeye" />
              )}
            </span>
          </div>

          {password && (
            <div className="strength-meter-wrapper">
              <div className="strength-bars">
                <div
                  className={`strength-bar ${
                    strength.score >= 1 ? strength.colorClass : ''
                  }`}
                ></div>
                <div
                  className={`strength-bar ${
                    strength.score >= 2 ? strength.colorClass : ''
                  }`}
                ></div>
                <div
                  className={`strength-bar ${
                    strength.score >= 3 ? strength.colorClass : ''
                  }`}
                ></div>
              </div>
              <span className={`strength-text ${strength.colorClass}`}>
                {strength.text}
              </span>
            </div>
          )}

          <div className="password-checklist">
            <p className={password.length >= 6 ? 'checked' : ''}>
              ✓ At least 6 characters
            </p>
            <p className={/[A-Z]/.test(password) ? 'checked' : ''}>
              ✓ One capital letter
            </p>
            <p className={/[0-9]/.test(password) ? 'checked' : ''}>
              ✓ One number
            </p>
            <p className={/[@$!%*?&]/.test(password) ? 'checked' : ''}>
              ✓ One special symbol
            </p>
          </div>
        </div>

        <div className="input-field-block relative-field">
          <label className="input-label">Confirm password</label>
          <div className="password-input-wrapper">
            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? 'text' : 'password'}
              className={`input-text-element padding-right-input ${
                confirmPasswordError ? 'input-error-border' : ''
              }`}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError(false);
                if (error) setError('');
              }}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <img src={openEyeIcon} alt="openeye" />
              ) : (
                <img src={closeEyeIcon} alt="closeeye" />
              )}
            </span>
          </div>
        </div>

        {error && <p className="password-error-msg">{error}</p>}
      </div>

      <div className="action-footer">
        <Button type="back" text="Back" onClick={onBack} />
        <Button type="continue" text="Continue" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default PasswordStep;
