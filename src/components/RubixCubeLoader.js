// RubixCubeLoader.js
import React from 'react';


const RubixCubeLoader = () => {
  return (
    <div className="rubix-cube-container">
      <div className="rubix-cube">
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face left"></div>
        <div className="face right"></div>
      </div>
    </div>
  );
};

export default RubixCubeLoader;
