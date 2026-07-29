import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdaptiveInputProps } from "form-demaker";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { PropsWithChildren, ReactElement } from "react";

import QueryFilters from "./QueryFilters";

const TEST_INPUTS: AdaptiveInputProps[] = [
  {
    inputType: "number",
    name: "DPI",
    label: "DPI",
    inputProps: {
      placeholder: "Enter your DPI",
    },
  },
  {
    inputType: "text",
    name: "Name",
    label: "Name",
    inputProps: {
      placeholder: "Enter your Name",
    },
  },
  {
    inputType: "text",
    name: "Email",
    label: "Email",
    inputProps: {
      placeholder: "Enter your Email",
    },
  },
];

const renderWithProviders = (
  ui: ReactElement,
  { searchParams = "" }: { searchParams?: string } = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <ChakraProvider value={defaultSystem}>
      <NuqsTestingAdapter searchParams={searchParams} hasMemory>
        {children}
      </NuqsTestingAdapter>
    </ChakraProvider>
  );

  return render(ui, { wrapper: Wrapper });
};

describe("QueryFilters", () => {
  it("renders the title and data count", () => {
    renderWithProviders(
      <QueryFilters title="Users" dataCount={5} inputs={TEST_INPUTS} />,
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders applied filters from the URL", () => {
    renderWithProviders(<QueryFilters title="Users" inputs={TEST_INPUTS} />, {
      searchParams: "?DPI=123&Name=Ada",
    });

    expect(screen.getByText(/DPI: 123/)).toBeInTheDocument();
    expect(screen.getByText(/Name: Ada/)).toBeInTheDocument();
  });

  it("removes an applied filter when its close button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<QueryFilters title="Users" inputs={TEST_INPUTS} />, {
      searchParams: "?DPI=123",
    });

    expect(screen.getByText(/DPI: 123/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByText(/DPI: 123/)).not.toBeInTheDocument();
  });

  it("renders custom icons over the defaults", () => {
    renderWithProviders(
      <QueryFilters
        title="Users"
        inputs={TEST_INPUTS}
        icons={{
          filter: <span data-testid="custom-filter" />,
          applied: <span data-testid="custom-applied" />,
        }}
      />,
    );

    expect(screen.getByTestId("custom-filter")).toBeInTheDocument();
    expect(screen.getByTestId("custom-applied")).toBeInTheDocument();
  });

  it("accepts optional color overrides without crashing", () => {
    renderWithProviders(
      <QueryFilters
        title="Users"
        dataCount={5}
        inputs={TEST_INPUTS}
        textColor={{ title: "tomato", subtitle: "gray" }}
        iconColor={{ filter: "tomato", applied: "blue", remove: "red" }}
      />,
      { searchParams: "?DPI=123" },
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText(/DPI: 123/)).toBeInTheDocument();
  });

  it("renders form fields from the inputs prop when the filter menu opens", async () => {
    const user = userEvent.setup();
    renderWithProviders(<QueryFilters title="Users" inputs={TEST_INPUTS} />);

    await user.click(screen.getByRole("button", { name: /Filter By/i }));

    expect(await screen.findByText("Email")).toBeInTheDocument();
  });

  it("adds a filter when the form is submitted", async () => {
    const user = userEvent.setup();
    renderWithProviders(<QueryFilters title="Users" inputs={TEST_INPUTS} />);

    await user.click(screen.getByRole("button", { name: /Filter By/i }));
    await user.type(
      await screen.findByPlaceholderText("Enter your Email"),
      "ada@demaker.dev",
    );
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(
      await screen.findByText(/Email: ada@demaker.dev/),
    ).toBeInTheDocument();
  });
});
