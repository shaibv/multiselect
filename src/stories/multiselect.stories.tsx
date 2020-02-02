/* eslint-disable import/no-extraneous-dependencies */
import { h } from "preact";
import { storiesOf } from "@storybook/preact";
import MultiSelect from "../components/MultiSelect";


const data = [
  {
    id: "ef4c058e-bab1-481b-9131-b56a92fc0401",
    label: "Answers",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "381596df-8376-4e3e-8bef-0fbc2e91aa46",
    label: "Office365",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "72af0602-1321-4897-8299-f507480b2bb8",
    label: "Domain",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "8b1b47e6-9f58-4e59-b147-cac894bec8da",
    label: "Premium",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "c8a5ca23-5a0f-46dd-ae57-69643fa08743",
    label: "G-Suite",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "73988963-5f5f-4f61-b6a1-fd004df31b00",
    label: "Ascend",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "cc05402e-8593-4284-86f2-8314b7651991",
    label: "DeviantArt",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "4ea2fc67-6495-4001-bcbe-438d67f7efa4",
    label: "Logo",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "fbc52050-2ca2-4737-9af9-79dfca465f7d",
    label: "Test",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "71a2c5fa-96a0-461e-9ff7-8cd043d393f9",
    label: "Shutterstock",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
  {
    id: "e24de30e-d484-426b-b9b2-eda6c8b42d70",
    label: "External Apps",
    productSettingsId: "20a780b4-04d8-42ff-bfbc-e9541863afea",
  },
];

storiesOf("Dropdown", module).add("MultiSelect", () => (<MultiSelect data={JSON.stringify(data)} />));
