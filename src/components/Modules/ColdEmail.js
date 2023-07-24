import React, { useContext, useEffect, useState } from "react";
import { AiContext } from "../../contexts/AiContext";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

const ColdEmail = () => {
  //imports from context
  const { output, processRequest, isLoading, setIsLoading } =
    useContext(AiContext);

  //text counter state
  const [textCount, setTextCount] = useState(0);

  //scroll on top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //handles submit for generation
  const handleClick = () => {
    const input = document.getElementById("input")?.value;
    const prompt = "Write an engaging cold email about";
    setIsLoading(true);
    processRequest(prompt, input);
  };

  //handles inout changes to set text counter
  const handleChange = (event) => {
    event.preventDefault();
    const input = document.getElementById("input")?.value;
    setTextCount(input?.length);
  };

  //handles text copy
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <section className="min-h-screen grid grid-cols-12 bg-whiteHigh dark:bg-blackMid text-blackHigh dark:text-whiteMid">
      {/* input section */}
      <div className="h-screen col-span-3 gap-2 shadow-lg shadow-blackLow relative flex flex-col justify-between">
        {/* top section of input */}
        <section className="flex flex-col overflow-auto p-4">
          <h1 className="text-xl text-center font-bold text-blackHigh dark:text-whiteHigh py-2">
            Cold Email
          </h1>
          {/* 1 */}
          <div>
            <label htmlFor="emailInput">Topic:</label>
            <textarea
              onChange={(e) => {
                handleChange(e);
              }}
              className={`p-2 w-full rounded-xl border-solid bg-bgTextareaColor dark:bg-blackHigh placeholder-blackLow dark:placeholder-whiteLow placeholder-opacity-25 focus:outline-none`}
              placeholder="briefly describe the topic.."
              name="emailInput"
              id="input"
              cols="6"
              rows="6"
            ></textarea>
            {/* text counter */}
            <p className="text-right text-xs">{textCount}</p>
          </div>
          {/* 2 */}
          <div>
            <label htmlFor="nameInput">Name:</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={`p-2 w-full rounded-xl border-solid bg-bgTextareaColor dark:bg-blackHigh placeholder-blackLow dark:placeholder-whiteLow placeholder-opacity-25 focus:outline-none`}
              placeholder="client name"
              name="nameInput"
              id="input2"
            ></input>
          </div>
          {/* 3 */}
          <div>
            <label htmlFor="greetingInput">Greeting:</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={`p-2 w-full rounded-xl border-solid bg-bgTextareaColor dark:bg-blackHigh placeholder-blackLow dark:placeholder-whiteLow placeholder-opacity-25 focus:outline-none`}
              placeholder="custom greetings"
              name="greetingInput"
              id="input3"
            ></input>
          </div>
          {/* 4 */}
          <div>
            <label htmlFor="catchInput">Catch:</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className={`p-2 w-full rounded-xl border-solid bg-bgTextareaColor dark:bg-blackHigh placeholder-blackLow dark:placeholder-whiteLow placeholder-opacity-25 focus:outline-none`}
              placeholder="custom catch"
              name="catchInput"
              id="input4"
            ></input>
          </div>
        </section>
        {/* bottom section of input */}
        <section className="flex items-center justify-between">
          {/* dark mode toggle*/}
          <div className="m-4">
            <ThemeToggler></ThemeToggler>
          </div>
          {/* start generating button  */}
          <button
            disabled={isLoading || textCount < 1}
            className={`m-4 btn btn-sm text-whiteHigh bg-btnColor disabled:text-btnDisabledTextColor disabled:bg-btnColorDisabled hover:bg-btnColor border-none w-16 h-4 rounded-xl normal-case ${
              isLoading ? "bg-btnColor" : "text-whiteLow"
            }`}
            onClick={handleClick}
          >
            {isLoading ? (
              <p>
                <span>
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                </span>
              </p>
            ) : (
              <i class="fa-solid fa-arrow-right"></i>
            )}
          </button>
        </section>
      </div>
      {/* output section */}
      <div className="h-screen col-span-9 shadow-sm shadow-blackLow flex flex-col justify-between">
        {/* top section of output */}
        <section className="flex flex-col justify-between overflow-auto">
          <div className="p-4">
            <h1 className="text-xl text-center font-bold text-blackHigh dark:text-whiteHigh py-2">
              Output
            </h1>
            <label htmlFor="result">Result:</label>
            <textarea
              className={`p-2 w-full rounded-xl border-none focus:outline-none bg-bgTextareaColor dark:bg-blackHigh`}
              placeholder=""
              defaultValue={output}
              name="result"
              cols="25"
              rows="25"
            ></textarea>
          </div>
        </section>
        {/* bottom section of output */}
        <section className="m-4 flex justify-between">
          <p></p>
          <button
            disabled={isLoading || output?.length < 1}
            className={`btn text-whiteHigh bg-btnColor border-transparent disabled:text-btnDisabledTextColor disabled:bg-btnColorDisabled hover:bg-btnColor border-2 focus:border-blackLow focus:bg-btnColorDisabled focus:text-blackLow btn-sm w-16 rounded-xl normal-case text-md`}
            onClick={handleCopy}
          >
            <p className="flex items-center justify-center gap-1">
              <i className="fa-regular fa-copy"></i>
            </p>
          </button>
        </section>
      </div>
    </section>
  );
};

export default ColdEmail;
