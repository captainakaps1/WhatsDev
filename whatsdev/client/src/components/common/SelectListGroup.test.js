import SelectListGroup from "./SelectListGroup";
import { render } from "@testing-library/react";

describe("Component Test - InputGroup", () => {
  const data = {
    name: "",
    value: "",
    error: "",
    onChange: () => {},
    options: [],
  };
  it("matches snapshot", () => {
    const { asFragment } = render(<SelectListGroup {...data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without crashing", async () => {
    const { findByTestId } = render(<SelectListGroup {...data} />);
    expect(await findByTestId("Select-List_Group-div")).toBeDefined();
  });
});
