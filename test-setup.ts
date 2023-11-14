import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock("next/navigation", async () => ({
  ...((await vi.importActual("next/navigation")) as object),
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: vi.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

expect.extend({
  tabToBeDisabled(received) {
    const isDisabled = received.classList.contains("pointer-events-none");
    return {
      pass: isDisabled,
      message: () => `Expected tab to be disabled`,
    };
  },
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

afterEach(() => {
  cleanup();
});
