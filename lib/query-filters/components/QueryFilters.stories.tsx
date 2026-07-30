import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AdaptiveInputProps } from "form-demaker";
import { NuqsAdapter } from "nuqs/adapters/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { expect, screen, userEvent } from "storybook/test";

import QueryFilters from "./QueryFilters";

const singleInput: AdaptiveInputProps[] = [
  {
    inputType: "text",
    name: "Name",
    label: "Name",
    inputProps: {
      placeholder: "Enter a name",
    },
  },
];

const multipleInputs: AdaptiveInputProps[] = [
  {
    inputType: "text",
    name: "Name",
    label: "Name",
    inputProps: {
      placeholder: "Enter a name",
    },
  },
  {
    inputType: "number",
    name: "DPI",
    label: "DPI",
    inputProps: {
      placeholder: "Enter a DPI",
    },
  },
  {
    inputType: "text",
    name: "Email",
    label: "Email",
    inputProps: {
      placeholder: "Enter an email",
    },
  },
];

// Writes to the real browser URL.
const withBrowserUrl: Decorator = (Story) => (
  <NuqsAdapter>
    <Story />
  </NuqsAdapter>
);

// In-memory URL, preset from the story's `searchParams` parameter. Keeps query
// params out of the Storybook iframe URL.
const withInMemoryUrl: Decorator = (Story, { parameters }) => (
  <NuqsTestingAdapter
    searchParams={(parameters.searchParams as string) ?? ""}
    hasMemory
  >
    <Story />
  </NuqsTestingAdapter>
);

const meta = {
  title: "Components/QueryFilters",
  component: QueryFilters,
} satisfies Meta<typeof QueryFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Single filterable field. Applying a value writes it to the URL. */
export const Basic: Story = {
  args: {
    title: "Users",
    dataCount: 12,
    inputs: singleInput,
  },
  decorators: [withBrowserUrl],
};

/** `inputs` drives the form. Each field maps to one query param named after its `name`. */
export const MultipleInputs: Story = {
  args: {
    title: "Citizens",
    dataCount: 340,
    inputs: multipleInputs,
  },
  decorators: [withBrowserUrl],
};

/** Filters hydrate from the URL on mount, so a shared link restores the view. */
export const WithAppliedFilters: Story = {
  args: {
    title: "Citizens",
    dataCount: 2,
    inputs: multipleInputs,
  },
  decorators: [withInMemoryUrl],
  parameters: { searchParams: "?Name=Ada&DPI=123" },
};

/** Adds and removes a filter end to end, driven automatically. */
export const AddAndRemoveFilter: Story = {
  args: {
    title: "Users",
    dataCount: 12,
    inputs: singleInput,
  },
  decorators: [withInMemoryUrl],
  play: async () => {
    // The menu renders in a portal, outside canvasElement.
    await userEvent.click(screen.getByRole("button", { name: /Filter By/i }));
    await userEvent.type(
      await screen.findByPlaceholderText("Enter a name"),
      "Ada",
    );
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));

    await expect(await screen.findByText(/Name: Ada/)).toBeInTheDocument();

    // Apply keeps the menu open — its dismissable layer eats the next outside click.
    await userEvent.keyboard("{Escape}");

    await userEvent.click(screen.getByRole("button", { name: "Close" }));

    await expect(screen.queryByText(/Name: Ada/)).not.toBeInTheDocument();
  },
};
