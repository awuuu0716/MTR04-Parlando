import color from './color';
const Themes = {
  customer: {
    background: color.primary,
    navbarHover: color.secondary,
    shadow: color.secondary,
    titleColor: color.primary,
    borderColor: color.primary,
    textColor: color.white,
    textHover: color.wheat,
    mediaIcon: color.dark,
    errorText: color.danger,
  },
  backstage: {
    background: color.secondary,
    navbarHover: color.primary,
    shadow: color.secondary,
    titleColor: color.primary,
    borderColor: color.primary,
    textColor: color.primary,
    textHover: color.wheat,
    mediaIcon: color.dark,
    errorText: color.danger,
  },
};

export default Themes;
