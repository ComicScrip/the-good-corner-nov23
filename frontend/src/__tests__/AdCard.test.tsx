import { describe, it, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import AdCard from "../components/AdCard";

describe("AdCard component", () => {
  it("renders correctly", () => {
    const view = render(
      <AdCard
        ad={{
          id: 1,
          title: "Mon annonce",
          price: 42,
          picture: "https://img.com/img.png",
        }}
        link="http://localhost:3000/ads/1"
      />
    );

    // expect(screen.getByText(/Mon annonce/)).toBeInTheDocument();
    // expect(screen.getByText(/42/)).toBeInTheDocument();

    expect(view.baseElement).toMatchSnapshot();
  });
});
