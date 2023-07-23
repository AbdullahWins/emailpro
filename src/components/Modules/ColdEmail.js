import React, { useContext, useEffect, useState } from "react";
import { AiContext } from "../../contexts/AiContext";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

const ColdEmail = () => {
  const { output, processRequest, isLoading, setIsLoading } =
    useContext(AiContext);
  const [textCount, setTextCount] = useState(0);

  //scroll on top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    const input = document.getElementById("input")?.value;
    const prompt = "Write an engaging cold email about";
    setIsLoading(true);
    processRequest(prompt, input);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const input = document.getElementById("input")?.value;
    setTextCount(input?.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <section className="grid grid-cols-12 bg-whiteHigh dark:bg-blackMid text-blackHigh dark:text-whiteMid">
      <div className="h-screen col-span-3 gap-2 p-4 shadow-lg shadow-blackLow relative">
        <h1 className="text-xl text-center font-bold text-blackHigh dark:text-whiteHigh py-2">
          Cold Email
        </h1>
        <label htmlFor="emailInput">Topic:</label>
        <textarea
          onChange={(e) => {
            handleChange(e);
          }}
          className={`p-2 w-full rounded-xl border-solid bg-bgTextareaColor dark:bg-blackHigh placeholder-blackLow dark:placeholder-whiteLow placeholder-opacity-25 focus:outline-none`}
          placeholder="briefly describe the topic.."
          name="emailInput"
          id="input"
          cols="5"
          rows="5"
        ></textarea>
        {/* <p className="text-right">{textCount}/200</p> */}
        {/* start generating button  */}
        <button
          disabled={isLoading || textCount < 1}
          className={`absolute bottom-0 right-0 m-2 btn text-whiteHigh bg-btnColor disabled:text-btnDisabledTextColor disabled:bg-btnColorDisabled hover:bg-btnColor border-none btn-md w-24 rounded-xl normal-case my-2 ${
            isLoading ? "bg-btnColor" : "text-whiteLow"
          }`}
          onClick={handleClick}
        >
          {isLoading ? (
            <p>
              <span>
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              </span>
              &nbsp;&nbsp;
              <span className="text-btnDisabledTextColor">Generating...</span>
            </p>
          ) : (
            <p>Start</p>
          )}
        </button>
        {/* dark mode toggle*/}
        {/* <button
          disabled={isLoading || textCount < 1}
          className={`absolute bottom-0 left-0 m-2 btn text-whiteHigh bg-btnColor disabled:text-btnDisabledTextColor disabled:bg-btnColorDisabled hover:bg-btnColor border-none btn-md w-24 rounded-xl normal-case my-2 ${
            isLoading ? "bg-btnColor" : "text-whiteLow"
          }`}
          onClick={handleClick}
        >
          {isLoading ? (
            <p>
              <span>
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              </span>
              &nbsp;&nbsp;
              <span className="text-btnDisabledTextColor">Light</span>
            </p>
          ) : (
            <p>Dark</p>
          )}
        </button> */}

        <div className="absolute bottom-0 left-0 m-2">
          <ThemeToggler></ThemeToggler>
        </div>
      </div>
      <div className="h-screen col-span-9 gap-2 p-4 shadow-sm shadow-blackLow relative">
        <h1 className="text-xl font-bold text-blackHigh py-2">Result</h1>
        <textarea
          className={`p-2 w-full rounded-xl border-none focus:outline-none bg-bgTextareaColor dark:bg-blackHigh`}
          placeholder=""
          defaultValue={output}
          cols="10"
          rows="10"
        ></textarea>
        <button
          disabled={isLoading || output?.length < 1}
          className={`absolute bottom-0 right-0 m-2 btn text-whiteHigh bg-btnColor border-transparent disabled:text-btnDisabledTextColor disabled:bg-btnColorDisabled hover:bg-btnColor border-2 focus:border-blackLow focus:bg-btnColorDisabled focus:text-blackLow btn-md w-24 rounded-xl normal-case my-3`}
          onClick={handleCopy}
        >
          <p className="flex items-center justify-center gap-1">
            <i className="fa-regular fa-copy"></i>Copy
          </p>
        </button>
      </div>
    </section>
  );
};

export default ColdEmail;
