import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const resetCounter = () => {
    setCount(0);
  };

  const currentLanguage = i18n.language;

  const getClickText = () => {
    if (currentLanguage === 'ru') {
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;
      
      // 0 кликов
      if (count === 0) return t('counter.clicks_zero');
      
      // 1, 21, 31... клик (но не 11, 111...)
      if (lastDigit === 1 && lastTwoDigits !== 11) return t('counter.clicks_one', { count });
      
      // 2-4, 22-24, 32-34... клика (но не 12-14)
      if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
        return t('counter.clicks_few', { count });
      }
      
      // Все остальные случаи (5-20, 25-30...)
      return t('counter.clicks_many', { count });
    } else {
      // Английская версия
      if (count === 0) return t('counter.clicks_zero');
      if (count === 1) return t('counter.clicks_one', { count });
      return t('counter.clicks_other', { count });
    }
  };

  return (
    <div className="root">
      {/* Кнопки переключения языка */}
      <div className="btn-group" role="group">
        <button 
          type="button" 
          className={`btn ${currentLanguage === 'en' ? 'btn-primary' : 'btn-outline-primary'}`} 
          onClick={() => changeLanguage('en')}
        >
          {t('language.en')}
        </button>
        <button 
          type="button" 
          className={`btn ${currentLanguage === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`} 
          onClick={() => changeLanguage('ru')}
        >
          {t('language.ru')}
        </button>
      </div>

      {/* Кнопка счетчика */}
      <button 
        type="button" 
        className="counter-btn" 
        onClick={() => setCount(count + 1)}
      >
        {getClickText()}
      </button>

      {/* Кнопка сброса */}
      <button 
        type="button" 
        className="reset-btn" 
        onClick={resetCounter}
      >
        {t('reset')}
      </button>
    </div>
  );
}

export default App;