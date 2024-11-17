import React, { useState } from 'react';
import CircleWithPoints from './components/CircleWithPoints';
import CircleGsap from './components/CircleGsap';
import Counter from './components/Counter';
import Slider from './components/Slider';
import Switch from './components/Switch';
import dataArray from './data';
import Title from './components/Title';

function App() {
  const totalPage = dataArray.length;

  const [data, setData] = useState(dataArray[0]);
  const [currentPage, setCurrentPage] = useState(0);

  const changePageHandler = (page) => {
    setData(dataArray[page]);
    setCurrentPage(page);
  };
  return (
    <>
      {' '}
      <main className="container w-[1400px] m-auto flex flex-col items-center relative h-full ">
        <div className=" w-full mt-[115px] h-full ">
          <div className="flex justify-center items-center h-[530px] relative">
            <CircleGsap
              currentPage={currentPage}
              changePageHandler={changePageHandler}
              numberOfDots={totalPage}
            />
            <Counter data={data} />
            <Title />
            <div className="w-full h-[1px] bg-[#42567A] top-1/2 left-0 absolute opacity-10"></div>
          </div>

          <div className="relative flex justify-center items-center mx-[80px] ">
            {/* <CircleWithPoints /> */}
            <Switch
              totalPage={totalPage}
              changePageHandler={changePageHandler}
              currentPage={currentPage}
            />
          </div>
          <div>
            <div className=" mx-[80px] m-auto mt-[96px] qweqwe">
              {' '}
              <Slider data={data} />
            </div>
          </div>
          {/* lines */}
        </div>
        <div className="w-[1px] h-full bg-[#42567A] top-0 right-0 rotate-180 absolute opacity-10"></div>
        <div className="w-[1px] h-full bg-[#42567A] top-0 left-0 rotate-180 absolute opacity-10"></div>
        <div className="w-[1px] h-full bg-[#42567A] top-0 left-1/2 rotate-180 absolute opacity-10"></div>
      </main>
      {/* <section className="h-screen w-screen bg-green-400"></section> */}
    </>
  );
}

export default App;
