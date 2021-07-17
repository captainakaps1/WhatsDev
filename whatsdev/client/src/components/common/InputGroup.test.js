import InputGroup from "./InputGroup";
import { findByTestId, render } from "@testing-library/react";

describe("Component Test - InputGroup", () => {
  const data = {
    name: "",
    placeholder: "",
    value: "",
    error: "",
    onChange: () => {},
    icon: "",
    type: "",
  };
  it("matches snapshot", () => {
    const { asFragment } = render(<InputGroup {...data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without crashing", async () => {
    const { findByTestId } = render(<InputGroup {...data} />);
    expect(await findByTestId("input-group-div")).toBeDefined();
  });
});
