/* eslint-disable import/no-extraneous-dependencies */
/** @jsx h */
import { h } from "preact";
import { FC } from "preact/compat";
import Tabs from "../components/Tabs";


const data = [
  { id: "PUBLISHED", label: "Published", active: false },
  { id: "DRAFT", label: "Draft", active: true },
  { id: "ARCHIVED", label: "Archived", active: false },
  { id: "ALL", label: "All", active: false },
];

export const Default: FC = () => <Tabs activetab={data[0].label} data={JSON.stringify(data)} />


export default {
  title: 'Tabs',
  component: Tabs,
};
