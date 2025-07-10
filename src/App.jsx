import { use, useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  const PasswordRef = useRef(null)
  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*_"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(Password)
    PasswordRef.current.select()
  }

  useEffect(() => { generatePassword() }, [length, numberAllowed, charAllowed])
  return (
    <div className='w-full max-x-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>

      <h1 className='text-white text-center my-3 '>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          value={Password}
          className='outline-none bg-white w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={PasswordRef}
        />
        <button
          onClick={copyPasswordToClipboard()}
          className='bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex text-sm gap-x-2'>
          <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name=''
            id=''
          />
          <label htmlFor="length">length: {length}</label>
        </div>
        <div className='flex text-sm gap-x-2'>
          <input type="checkbox"
            defaultChecked={numberAllowed}
            onchange={(e) => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex text-sm gap-x-2'>
          <input type="checkbox"
            defaultChecked={charAllowed}
            onchange={(e) => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
