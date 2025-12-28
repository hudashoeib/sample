const getDesignTokens = (mode) => ({
  palette: {
    // @ts-ignore
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode

          // @ts-ignore
          bg: {
            main: "#F4E1E0",
            dark: "#E5C5C1",
            light: "#e6d4d2e0",
            textContrast: "#7F6269",
          },

          btn: {
            main: "#886763ff",
            dark: "#58423fff",
            textContrast: "#F4E1E0",
          },
          txt: {
            main: "#7F6269",
            dark: "#0E1627",
          },
          background: {
            paper: "#E5C5C1",
            defualt: "#F4E1E0",
          },
          text: {
            primary: "#5c4947ff",
            secondary: "#7F6269",
          },
          button: {
            hover: "#58423fff",
            pressed: "#5c4947ff",
            textTransform: "capitalize",
            textColor: "#F4E1E0",
          },
          primary: {
            main: "#886763ff",
            contrastText: "#F4E1E0",
            dark: "#58423fff",
          },
          secondary: {
            main: "#58423fff",
            contrastText: "#0E1627",
            dark: "#cac2c0ff",
          },
        }
      : {
          // palette values for dark mode
          bg: {
            main: "#0E1627",
            dark: "#533f44ff",
            light: "#363e5188",
            textContrast: "#F4E1E0",
          },

          btn: {
            main: "#0E1627",
            dark: "#000000ff",
            textContrast: "#F4E1E0",
          },
          txt: {
            main: "#7F6269",
            dark: "#F4E1E0",
          },
          background: {
            paper: "#533f44ff",
            defualt: "#533f44ff",
          },
          text: {
            primary: "#F4E1E0",
            secondary: "#F4E1E0",
          },
          primary: {
            main: "#886763ff",
            contrastText: "#F4E1E0",
            dark: "#58423fff",
          },
          secondary: {
            main: "#F4E1E0",
            contrastText: "#0E1627",
            dark: "#cac2c0ff",
          },
          button: {
            hover: "#58423fff",
            pressed: "#5c4947ff",
            textTransform: "capitalize",
            textColor: "#F4E1E0",
          },
        }),
  },
});

export default getDesignTokens;
