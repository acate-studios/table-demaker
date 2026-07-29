import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { PropsWithChildren, ReactElement } from "react";

import QueryFilters from "./QueryFilters";

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
    renderWithProviders(<QueryFilters title="Users" dataCount={5} />);

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders applied filters from the URL", () => {
    renderWithProviders(<QueryFilters title="Users" />, {
      searchParams: "?DPI=123&Name=Ada",
    });

    expect(screen.getByText(/DPI: 123/)).toBeInTheDocument();
    expect(screen.getByText(/Name: Ada/)).toBeInTheDocument();
  });

  it("removes an applied filter when its close button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<QueryFilters title="Users" />, {
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
        textColor={{ title: "tomato", subtitle: "gray" }}
        iconColor={{ filter: "tomato", applied: "blue", remove: "red" }}
      />,
      { searchParams: "?DPI=123" },
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText(/DPI: 123/)).toBeInTheDocument();
  });
});
