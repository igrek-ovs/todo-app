import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledTab, StyledTabs } from './components';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const [lang, setLang] = useState(localStorage.getItem('lng'));

  const changeLang = async (lng: string) => {
    setLang(lng);
    await i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  return (
    <StyledTabs value={lang} centered>
      <StyledTab label="EN" value="en" onClick={() => changeLang('en')} />
      <StyledTab label="UA" value="ua" onClick={() => changeLang('ua')} />
    </StyledTabs>
  );
};

export default LanguageSelector;
