import MainComponent from "./MainComponent";
import "../Home/style.css";


const Rightside = () => {
  return (
    <div className="lg:mt-0 m-2    " >
      <div className="md:ml-[25%]">
        <MainComponent />
      </div>

      {/* <Followlist /> */}
    </div>
  );
};

export default Rightside;
