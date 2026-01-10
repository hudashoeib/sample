export const getTextDirection = (text) =>
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text)
    ? { dir: "rtl", align: "right" }
    : { dir: "ltr", align: "left" };
