/* eslint-disable no-console */
import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import register from 'preact-custom-element';
import classNames from 'classnames/bind';
import s from './styles.scss';


const cx = classNames.bind(s as any);


const Tab = ({ item, isActive, clickHandler }) => {
  const classes = cx({
    active: isActive,
  });

  return <li className={classes}><button onClick={() => clickHandler(item)} type="button">{item.label}</button></li>;
};

type Tab = {
  label: string,
  id?: string
};
interface Props {
  data: string,
  activetab: String
}

const Tabs: FunctionComponent<Props> = ({ data, activetab }) => {
  const [dataState, setData] = useState<Tab[]>(null);
  const [active, setActive] = useState<any>({});

  const componentRef = useRef<HTMLUListElement>();

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
    <ul className={s.tabs} ref={componentRef}>
      {dataState.map((tab) => (
        <Tab
          item={tab}
          clickHandler={clickHandler}
          isActive={active.id === tab.id}
        />
      ))}
    </ul>
  );
};


register(Tabs, 'x-tabs', ['data', 'activetab']);

export default Tabs;
