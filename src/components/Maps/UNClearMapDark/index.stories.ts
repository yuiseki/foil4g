import type { Meta, StoryObj } from "@storybook/react";
import { UNClearMapDark } from "./index";

const meta = {
  title: "Maps/UNClearMapDark",
  component: UNClearMapDark,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UNClearMapDark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
