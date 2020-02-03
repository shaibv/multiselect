import { h } from "preact";
import styled, { ThemeProvider } from 'styled-components';
import theme from "./utils/globalStyles";


const App = ({ children }) => (

  <StyledBase>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>

  </StyledBase>

  )


const StyledBase: any = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
`;

export default App;
