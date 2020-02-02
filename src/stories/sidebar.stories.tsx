/* eslint-disable import/no-extraneous-dependencies */
import { h } from 'preact';
import { storiesOf } from "@storybook/preact"
import Sidebar from "../components/Sidebar";


const data = [
    {
        label: "Product Catalog",
        items: [{ label: "Features" }, { label: "Products" }],
    },
    {
        label: "Coupons",
        items: [{ label: "Static Coupons" }, { label: "Dynamic Coupons" }],
    },
    {
        label: "Offering",
        items: [{ label: "Dealer" }],
    },
    {
        label: "",
        items: [{ label: "System Settings" }],
    },
];

storiesOf('Sidebar', module)
    .add('Default', () => <Sidebar activemenuitem="Features" data={JSON.stringify(data)} />);
