import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../lib/**/*.mdx", "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs", // Auto-generated documentation
    "@storybook/addon-links", // Story cross-linking
    "@storybook/addon-a11y", // Accessibility testing
    "@chromatic-com/storybook", // Visual regression testing with Chromatic
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(tsconfigPaths());

    return config;
  },
  docs: {
    defaultName: "Documentation",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes("node_modules");
        }

        return true;
      },
    },
  },
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
    "@tanstack/react-table": {
      disable: true,
    },
  },
};
export default config;
