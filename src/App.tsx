import { h } from "preact";
import styled, { ThemeProvider } from 'styled-components';
import { FC } from "preact/compat";
import theme from "./utils/globalStyles";


const App:FC = ({ children }) => (

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
