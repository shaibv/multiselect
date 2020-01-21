
import { h } from "preact";
import { createGlobalStyle, ThemeProvider } from "styled-components"

const GlobalStyles = createGlobalStyle`
  *, html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
}
`;

const colors = {
  $D10: "#162D3D", // Main input text, titles
  $D20: "#32536A", // Titles, texts
  $D30: "#577083", // Texts
  $D40: "#7A92A5", // Dividers, texts, Placeholder
  $D50: "#B6C1CD", // Dividers, texts
  $D55: "#CBD3DC", // Disabled button - new version - naming not final
  $D60: "#DFE5EB", // Dividers
  $D70: "#F0F4F7", // Page background, dividers
  $D80: "#FFFFFF", // Content box background

  $B00: "#2B81CB", // Buttons
  $B05: "#308DDD", // CTA
  $B10: "#3899EC", // Main action color, active, buttons
  $B20: "#4EB7F5", // Hover for elements with B10, buttons
  $B25: "#A1D7FB",
  $B27: "#B3E0FB",
  $B30: "#C1E4FE", // Notifications
  $B40: "#DAEFFE", // Dividers, table selected, table headers
  $B50: "#EAF7FF", // Dividers
  $B60: "#F4FAFE", // Table hover
};


const sidebar = {
  colors: {
    $bg: "#23263e",
    $divider: "#434567",
    $bgHover: "#2e3249",
    $bgActive: "#393f59",
  },
}
const theme = {
  colors,
  sidebar,
};


const Base = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
  )


export default Base;
