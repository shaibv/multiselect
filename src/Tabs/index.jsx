/* eslint-disable no-console */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import register from 'preact-custom-element';
import classNames from 'classnames';
import './styles.scss';


const Tab = ({ item, isActive, clickHandler }) => {
  const classes = classNames({
    active: isActive,
  });

  return <li className={classes}><button onClick={() => clickHandler(item)} type="button">{item.label}</button></li>;
};

const Tabs = ({ data, activetab }) => {
  const [dataState, setData] = useState([]);
  const [active, setActive] = useState('');


  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      setData(parsedData.map((tab) => ({ label: tab, id: tab.toLowerCase() })));
    }
  }, [data, activetab]);

  useEffect(() => {
    if (activetab) {
      setActive(dataState.filter((tab) => tab.id === activetab.toLowerCase())
        .reduce((acc, item) => {
          const flatten = acc.concat(item);
          return flatten;
        }));
    }
  }, [dataState]);

  const clickHandler = (item) => {
    setActive(item);
  };

  // if (!active) return null;
  return (
    <ul className="tabs">
      {dataState.map((tab) => <Tab item={tab} clickHandler={clickHandler} isActive={active.id === tab.id} />)}
    </ul>
  );
};


register(Tabs, 'x-tabs', ['data', 'activeTab']);

export default Tabs;
