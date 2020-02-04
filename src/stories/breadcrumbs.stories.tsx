/* eslint-disable import/no-extraneous-dependencies */
import { h } from "preact";
import BreadCrumbs from "../components/BreadCrumbs";

const data = [
  { label: "Static Coupouns", url: "entities/static" },
  { label: "Details", url: "" },
  { label: "Test Coupons", url: "" },
];


export const Default = () => <BreadCrumbs data={JSON.stringify(data)} />


export default {
  title: 'BreadCrumbs',
  component: BreadCrumbs,
};
