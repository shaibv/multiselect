/* eslint-disable import/no-extraneous-dependencies */
import { h } from "preact";
import { storiesOf } from "@storybook/preact";
import BreadCrumbs from "./index";

const data = [
  { label: "Static Coupouns", url: "entities/static" },
  { label: "Details", url: "" },
  { label: "Test Coupons", url: "" },
];

storiesOf("Breadcrumbs", module).add("Default", () => (
  <BreadCrumbs data={JSON.stringify(data)} />
));
