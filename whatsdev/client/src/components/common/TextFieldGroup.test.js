import TextFieldGroup from "./TextFieldGroup";
import { render } from "@testing-library/react";

describe("Component Test - InputGroup", () => {
  const data = {
    name: "",
    placeholder: "",
    value: "",
    error: "",
    onChange: () => {},
    info: "",
    type: "",
    disabled: "",
  };

  it("matches snapshot", () => {
    const { asFragment } = render(<TextFieldGroup {...data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without crashing", async () => {
    const { findByTestId } = render(<TextFieldGroup {...data} />);
    expect(await findByTestId("Text-Field-Group-div")).toBeDefined();
  });
});
