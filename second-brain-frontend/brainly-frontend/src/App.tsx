import { Button } from "./components/ui/Button";
import "./index.css";

function App() {
  return (
    <>
      <div className="bg-slate-500 !important">
        <Button
          onClick={() => {
            alert("hi");
          }}
          varient={"primary"}
          size={"sm"}
          text="Submit"
        />
      </div>
    </>
  );
}

export default App;
