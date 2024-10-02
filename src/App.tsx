import "./assets/app.css";
import Header from "./Header";
import ProductTable from "./ProductTable";

function App() {
  return (
    <>
      <div className="m-3 border ">
        <Header />
        <div className=" flex flex-col gap-2 p-3">
          <ProductTable />
        </div>
      </div>
    </>
  );
}

export default App;
