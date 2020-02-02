/** @jsx h */
import { h } from "preact";
import Tabs from "../components/Tabs";

const data = [
    { id: "PUBLISHED", label: "Published", active: false },
    { id: "DRAFT", label: "Draft", active: true },
    { id: "ARCHIVED", label: "Archived", active: false },
    { id: "ALL", label: "All", active: false },
];

  export const Default = () => <Tabs activetab={data[0].label} data={JSON.stringify(data)} />


export default {
    title: 'Tabs',
    component: Default,
};
