import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import App from '../../App';
import useCustomEvent from '../../utils/useCustomEvent';


type Tab = {
  label: string,
  id?: string
};
interface Props {
  data: string,
  activetab: String
}

const Tab = ({ item, isActive, clickHandler }) => (
  <StyledLi isActive={isActive}>
    <button
      onClick={() => clickHandler(item)}
      type="button"
    >
      {item.label}
    </button>
  </StyledLi>
);


const Tabs: FunctionComponent<Props> = ({ data, activetab }) => {
  const [dataState, setData] = useState<Tab[] | null>(null);
  const [active, setActive] = useState<any>({});

  const componentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      setData(parsedData.map((tab) => ({ label: tab, id: tab.toLowerCase() })));
    }
  }, [data]);

  useEffect(() => {
    if (activetab && dataState) {
      setActive(dataState.filter((tab) => tab.id === activetab.toLowerCase())
        .reduce((acc, item) => {
          // @ts-ignore
          const flatten = acc.concat(item);
          return flatten;
        }));
    }
  }, [dataState]);

  const dispatchEvent = useCustomEvent({
    ref: componentRef,
    eventName: 'tabItemClicked',
  });

  const clickHandler = (item) => {
    setActive(item);
  };

  useEffect(() => {
    dispatchEvent(active)
  }, [active]);

  if (!dataState) return null;
  return (
    <App>
      <div ref={componentRef}>
        <StyledUl>
          {dataState.map((tab) => (
            <Tab
              key={tab.label}
              item={tab}
              clickHandler={clickHandler}
              isActive={active.id === tab.id}
            />
        ))}
        </StyledUl>
      </div>
    </App>
  );
};

const StyledUl: any = styled('ul')`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  height: 60px;
  position: relative;
  font-family: $FontRoman;
  box-sizing: border-box;
`;

const StyledLi: any = styled<{ isActive: boolean }>('li')`
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 0 18px 0 0;

  &:last-child {
    margin: 0;
  }

  & button {
    border: none;
    background: none;
    font-size: 14px;
    padding: 0;
    color: $B10;
    color: ${(props) => (props.isActive ? props.theme.colors.$B10 : props.theme.colors.$D10)};
    box-shadow: ${(props) => (props.isActive
        ? `inset 0 -2px 0 0 ${props.theme.colors.$B10}`
        : "inset 0 0px 0 0 blue")};
    &:hover {
      color: ${(props) => props.theme.colors.$B10};
      cursor: pointer;
    }
  }
`;

register(Tabs, 'x-tabs', ['data', 'activetab']);

export default Tabs;
