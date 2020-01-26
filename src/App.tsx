import {
 h, createContext, ComponentChildren, FunctionComponent,
} from "preact";
import { forwardRef, useContext } from "preact/compat";
import { styled, setup } from "@nksaraf/goober";
import theme from "./utils/globalStyles";

const ThemeContext = createContext(theme);
const useTheme = () => useContext(ThemeContext);
setup(h, forwardRef, useTheme);


const App: FunctionComponent = ({ children }) => <StyledBase>{children}</StyledBase>;


const StyledBase = styled<{ children: ComponentChildren}>("div")`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
`;

export default App;
