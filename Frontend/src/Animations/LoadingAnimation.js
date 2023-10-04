import React from "react";
import { InfinitySpin, Oval, Triangle, Vortex } from "react-loader-spinner";
import { Spinner } from "flowbite-react";

function LoadingSpinner({ height, width, color }) {
  return (
    <Vortex
      visible={true}
      height={height}
      width={width}
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={["red", "green", "blue", "yellow", "orange", "purple"]}
    />
  );
}


function LoadingOval({ height, width, color }) {
  return (
    <div style={{ width: "100%", height: "300px", display: 'flex', alignItems:'center' ,justifyContent:'center'}}>
      <Spinner aria-label="Default status example" />
    </div>
  );
}

function LoadingOval2({ height, width, color }) {
  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent:'center'
      }}
    >
      <Spinner aria-label="Default status example" />
    </div>
  );
}

export default { LoadingSpinner, LoadingOval, LoadingOval2 };
