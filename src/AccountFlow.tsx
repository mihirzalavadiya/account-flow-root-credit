import React, { useState } from 'react';
import signupIllustration from './assets/signuo-illustration.svg';
import artBoard11 from './assets/artboard11.svg';
import AccountType from './steps/AccountType';
import MobileStep from './steps/MobileStep';
import OtpStep from './steps/OtpStep';
import NameStep from './steps/NameStep';
import PasswordStep from './steps/PasswordStep';
import SuccessModal from './components/SuccessModal';

interface FormData {
  accountType: string;
  mobileNumber: string;
  otpCode: string;
  fullName: string;
  email: string;
  password?: string;
}

const AccountFlow = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    accountType: 'personal',
    mobileNumber: '',
    otpCode: '',
    fullName: '',
    email: '',
    password: '',
  });

  const updateFormData = (nextStepData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...nextStepData }));
  };

  const handleNext = (stepData: Partial<FormData>) => {
    updateFormData(stepData);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleFinalSubmit = (finalStepData: Partial<FormData>) => {
    const completeData = { ...formData, ...finalStepData };
    setFormData(completeData);
    setShowModal(true);
  };

  const splitFullName = () => {
    if (!formData.fullName) return { first: '', last: '' };
    const parts = formData.fullName.split(' ');
    return {
      first: parts[0] || '',
      last: parts.slice(1).join(' ') || '',
    };
  };

  const handleReset = () => {
    setFormData({
      accountType: 'personal',
      mobileNumber: '',
      otpCode: '',
      fullName: '',
      email: '',
      password: '',
    });
    setCurrentStep(1);
    setShowModal(false);
  };

  const { first: firstNameVal, last: lastNameVal } = splitFullName();

  return (
    <div className="global-flow-wrapper">
      <div className="global-bg-container">
        <img src={signupIllustration} alt="topo-bg" className="bg-topo" />
      </div>

      <div className="global-content-layer">
        <div className="global-left-section">
          <div className="illustration-text-content">
            <p className="title-sub">Let’s get started</p>
            <h1 className="title-main">Create your account</h1>
            <p className="title-desc">
              Follow the steps to create your account
            </p>
          </div>

          <img src={artBoard11} alt="character" className="char-art" />
        </div>

        <div className="global-right-section">
          {currentStep === 1 && (
            <AccountType
              selectedType={formData.accountType}
              setSelectedType={(type) => updateFormData({ accountType: type })}
              onNext={(type) => handleNext({ accountType: type })}
            />
          )}

          {currentStep === 2 && (
            <MobileStep
              value={formData.mobileNumber}
              onBack={handleBack}
              onNext={(mobile) => handleNext({ mobileNumber: mobile })}
            />
          )}

          {currentStep === 3 && (
            <OtpStep
              onBack={handleBack}
              onNext={(otp) => handleNext({ otpCode: otp })}
            />
          )}

          {currentStep === 4 && (
            <NameStep
              firstNameValue={firstNameVal}
              lastNameValue={lastNameVal}
              emailValue={formData.email}
              onBack={handleBack}
              onNext={(first, last, emailVal) =>
                handleNext({ fullName: `${first} ${last}`, email: emailVal })
              }
            />
          )}

          {currentStep === 5 && (
            <PasswordStep
              onBack={handleBack}
              onNext={(pass) => handleFinalSubmit({ password: pass })}
            />
          )}
        </div>
      </div>

      {showModal && (
        <SuccessModal
          accountType={formData.accountType}
          email={formData.email}
          fullName={formData.fullName}
          mobileNumber={formData.mobileNumber}
          onClose={handleReset}
        />
      )}
    </div>
  );
};

export default AccountFlow;
