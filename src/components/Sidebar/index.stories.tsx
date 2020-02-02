// @ts-nocheck
import { h, FunctionComponent } from 'preact';
import { useState } from "preact/hooks";
import { styled } from "@nksaraf/goober";
import { storiesOf } from "@storybook/preact"
import Sidebar from "./index";


const sidebarItems = [
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

// const SidebarStory = () => <Sidebar data={JSON.stringify(sidebarItems)} />;
// export default { title: 'Sidebar' }
storiesOf('Sidebar', module)
    .add('Default', () => <Sidebar data={JSON.stringify(sidebarItems)} />);
