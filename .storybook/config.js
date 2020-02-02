import { configure } from "@storybook/preact";
configure(require.context("../src/components", true, /\.stories\.tsx?$/), module);
