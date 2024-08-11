import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("Password");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }

    if (character) {
      str += "!@#$%^&*_+{}[]~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
  },[length, number, character, passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-full bg-slate-900 max-w-lg mx-auto shadow-md rounded-lg px-5 pt-6 pb-4 mt-32">
        <h1 className="text-center text-slate-100 text-3xl mb-4">
          Password Generator
        </h1>
        <div className="flex shadow-md rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full p-2 text-orange-600 font-semibold"
            placeholder="password"
            ref = {passwordRef}
            readOnly
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-600 text-white px-3 py-2 shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm justify-around mt-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-orange-600 font-semibold">
              Length: {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label
              htmlFor="numberInput"
              className="text-orange-600 font-semibold"
            >
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label
              htmlFor="characterInput"
              className="text-orange-600 font-semibold"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
