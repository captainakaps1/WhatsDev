import TextAreaFieldGroup from "./TextAreaFieldGroup";
import { render } from "@testing-library/react";

describe("Component Test - InputGroup", () => {
  const data = {
    name: "",
    placeholder: "",
    value: "",
    error: "",
    onChange: () => {},
    info: "",
  };

  it("matches snapshot", () => {
    const { asFragment } = render(<TextAreaFieldGroup {...data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without crashing", async () => {
    const { findByTestId } = render(<TextAreaFieldGroup {...data} />);
    expect(await findByTestId("Test-Area-Field-Group-div")).toBeDefined();
  });
});
