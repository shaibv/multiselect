/* eslint-disable no-console */
import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import register from 'preact-custom-element';
// import classNames from 'classnames/bind';
import { styled, setPragma } from 'goober';
// import s from './styles.scss';

// const cx = classNames.bind(s as any);
setPragma(h);


interface Tab {
  label: string,
  id?: string
}
interface Props {
  data: string,
  activetab: String
}


const Tab = ({ item, isActive, clickHandler }) => (
  <StyledTab isActive={isActive}>
    <button onClick={() => clickHandler(item)} type="button">{item.label}</button>
  </StyledTab>
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


  const clickEvent = new CustomEvent('tabItemClicked', {
    detail: active,
    bubbles: true,
  });

  const clickHandler = (item) => {
    setActive(item);
  };

  useEffect(() => {
    if (componentRef.current) componentRef.current.dispatchEvent(clickEvent);
  }, [active]);

  if (!dataState) return null;
  return (
    <div ref={componentRef}>
      <Sidebar>
        {dataState.map((tab) => (
          <Tab
            item={tab}
            clickHandler={clickHandler}
            isActive={active.id === tab.id}
          />
        ))}
      </Sidebar>
    </div>
  );
};

const Sidebar = styled('ul')`
list-style: none;
display: flex;
flex-direction: row;
padding: 0;
margin: 0;
height: 60px;
position: relative;
box-sizing: border-box;
`;


const StyledTab = styled<{ isActive: boolean }>('li')`
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

&:hover {
color: red;
cursor: pointer;
}

}

`;


register(Tabs, 'x-tabs', ['data', 'activetab']);

export default Tabs;
