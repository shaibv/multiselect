import { configure } from "@storybook/preact";
configure(require.context("../src/components/Sidebar", true, /\.stories\.tsx?$/), module);
