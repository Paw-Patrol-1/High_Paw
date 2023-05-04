import React from 'react';
import {ReactComponent as PawSteps } from '../assets/pawSteps.svg'

function Login() {
  return (

    <div className='parentContainer flex items-center w-auto h-auto'>
        {/* <div className='parentSvg' style={{border: "1px solid red", height: "100vh", width: "100vw"}}> 
        <PawSteps style={{height: "100%"}} > */}
        <form className= 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/5 flex flex-col mx-auto my-20 z-80'>
        <h1 className='login font-semibold mb-4' >Login</h1>
        <div className='childOne mb-4'>
            <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder='email'/>
        </div>
        <div className='childTwo mb-4'>
            <input className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder='Please enter password' />
        </div>
        <div>
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
            <p>No account? click here to <strong>register</strong></p>
        </div>
        
        </form>
        {/* </PawSteps>
        </div> */}
   


    </div>
  )
}

export default Login