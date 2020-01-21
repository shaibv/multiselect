import styled from "styled-components";

const StyledTags: any = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & span {
    display: flex;
    border-radius: 30em;
    font-size: 12px;
    padding: 0 9px;
    margin: 6px 6px 0 0px;
    background: ${(props) => props.theme.colors.$B40};
    white-space: nowrap;
    align-items: center;
    max-height: 22px;
    min-height: 22px;
    &:last-child {
      margin: 6px 0px 0 0px;
    }

    & i {
      width: 100%;
      cursor: pointer;
      font-size: 15px;
      font-style: normal;
      margin: 0 0 0 6px;
      height: 100%;
    }
  }
`;

const Item: any = styled.li<{ checked: any }>`
  &:focus {
    outline: none;
    cursor: pointer;
    background:  ${(props) => props.theme.colors.$B40};
  }
  &:hover {
    cursor: pointer;
    background:  ${(props) => props.theme.colors.$B40};
  }

  label {
    display: flex;
    font-size: 14px;
    padding: 0 18px;
    height: 36px;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    & input[type="checkbox"] {
      height: 0;
      position: absolute;
      opacity: 0;
      width: 0;
      visibility: hidden; 
    }
  }

  pre {
    display: flex;
    font-size: 12px;
    padding: 0 18px;
    height: 36px;
    margin: 0;
    flex-direction: row;
    align-items: center;
    color:  ${(props) => props.theme.colors.$D40};
  }
`;

const StyledDropdown: any = styled.ul<{ isOpen: Boolean }>`
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.0784314) 0px 4px 8px, rgba(0, 0, 0, 0.0784314) 0px 2px 4px;
  list-style: none;
  background: ${(props) => props.theme.colors.$D80};
  padding: 6px 0;
  margin: 6px 0 0 0;
  display: none;
  max-height: 192px;
  overflow-y: auto;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const RealInput: any = styled.input`
  display: flex;
  flex: 1;
  align-self: center;
  border-radius: 4px;
  width: calc(100% - 24px);
  background: transparent;
  outline: none;
  font-size: 14px;
  padding: 0 6px;
  margin: 6px 0;
  border: none;
`;

const Wrapp: any = styled.div`
  position: relative;
  box-sizing: border-box;
`;

const FakeInput: any = styled.div<{focused: Boolean}>`
  display: flex;
  min-height: 36px;
  flex-wrap: wrap;
  width: 100%;
  background: ${(props) => props.theme.colors.$D80};
  align-items: stretch;
  border-radius: 4px;
  padding: 0 6px;
  border: 1px solid ${(props) => (props.focused ? props.theme.colors.$B10 : props.theme.colors.$B30)};
  position: relative;

  &:hover {
    background: ${(props) => props.theme.colors.$B40};
    cursor: text;
  }
 
  .arrow {
    fill: ${(props) => props.theme.colors.$B10};
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    z-index: 991;
  }
`;

const Content: any = styled("div")`
  display: flex;
  flex: 1;
  justify-content: stretch;
  flex-wrap: wrap;
`;


export {
    StyledDropdown, Content, FakeInput, Wrapp, RealInput, Item, StyledTags,
}
