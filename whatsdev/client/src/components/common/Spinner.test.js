import Spinner from "./Spinner";
import { render } from "@testing-library/react";

describe("Component Test - InputGroup", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
