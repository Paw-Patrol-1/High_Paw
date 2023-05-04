import React from 'react'

function Signup() {
  return (
    <div className='parentContainer flex items-center w-auto h-auto'>
    {/* <div className='parentSvg' style={{border: "1px solid red", height: "100vh", width: "100vw"}}> 
    <PawSteps style={{height: "100%"}} > */}
    <form className= 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/5 flex flex-col mx-auto my-20 z-80'>
    <h1 className='login font-semibold mb-4' >Signup</h1>
    <div className='childOne mb-2'>
        <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder='Name' />
    </div>
    <div className='childTwo mb-2'>
        <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder='Breed' />
    </div>
    <div className='childThree mb-2'>
        <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder='Age' />
    </div>
    <div className='childFour mb-2'>
    <label htmlFor="img">Upload image</label>
        <input id='img' className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" />
    </div>
    <div className='childFive mb-2'>
        <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder='123 Address Street' />
    </div>
    <div className='childSix mb-2'>
        <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder='City' />
    </div>

    <div className='childSeven mb-2'>
    
        <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder='email'/>
    </div>
    <div className='childEight mb-2'>
        <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder='Please enter password' />
    </div>

    <div>
        <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</button>
        <p>Already have an account? click here to <strong>Login</strong></p>
    </div>
    
    </form>
    </div>
    )
}

export default Signup