/* eslint-disable no-console */
import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import register from 'preact-custom-element';
import classNames from 'classnames';
import './styles.scss';


const Tab = ({ item, isActive, clickHandler }) => {
  const classes = classNames({
    active: isActive,
  });

  return <li className={classes}><button onClick={() => clickHandler(item)} type="button">{item.label}</button></li>;
};


const Skeleton = () => new Array(3).fill().map((s, index) => ({ id: index, label: 'wow' }));


const Tabs = ({ data, activetab }) => {
  const [dataState, setData] = useState(null);
  const [active, setActive] = useState('');

  const componentRef = useRef();

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      setData(parsedData.map((tab) => ({ label: tab, id: tab.toLowerCase() })));
    }
  }, [data]);

  useEffect(() => {
    if (activetab && dataState) {
      console.log(dataState, activetab);
      setActive(dataState.filter((tab) => tab.id === activetab.toLowerCase())
        .reduce((acc, item) => {
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

  if (!data) return null;
  return (
    <ul className="tabs" ref={componentRef}>
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
