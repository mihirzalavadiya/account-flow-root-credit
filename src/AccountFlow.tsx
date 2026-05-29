import React, { useState } from 'react';
import signupIllustration from './assets/signuo-illustration.svg';
import artBoard11 from './assets/artboard11.svg';
import AccountType from './steps/AccountType';

const AccountFlow = () => {
  const [accountType, setAccountType] = useState<string>('personal');

  const handleNext = (selectedType: string) => {
    setAccountType(selectedType);
  };

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
          <AccountType
            selectedType={accountType}
            setSelectedType={setAccountType}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountFlow;
