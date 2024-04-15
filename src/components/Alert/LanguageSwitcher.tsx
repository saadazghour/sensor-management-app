import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button className="px-2" onClick={() => changeLanguage("en")}>
        English
      </button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
    </div>
  );
};
