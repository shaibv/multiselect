/* eslint-disable import/no-extraneous-dependencies */
import { h } from "preact";
import Tabs from "./index";

const data = [
    { id: "PUBLISHED", label: "Published", active: false },
    { id: "DRAFT", label: "Draft", active: true },
    { id: "ARCHIVED", label: "Archived", active: false },
    { id: "ALL", label: "All", active: false },
];

  const Default = () => <Tabs activetab={data[0].label} data={JSON.stringify(data)} />

export default {
    title: 'Tabs',
    component: Default,
    parameters: {
        info: { inline: true },
    },
};
