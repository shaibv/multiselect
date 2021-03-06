/* eslint-disable import/no-extraneous-dependencies */
import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import List from "../components/List";


export const MockList = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
      fetch("https://www.mocky.io/v2/5e30af2c3200008000858c10").then((x) => x.json().then((d) => {
        const objectToKeyValuePair = Object.entries(d)
        .map(([key, value]) => ({ key, value }));
        setData(objectToKeyValuePair);
      }))
    }, []);

    return (
      <List data={JSON.stringify(data)} />
    )
}

export default {
  title: 'List',
  component: List,
};
