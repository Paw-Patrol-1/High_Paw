import { useState, useEffect} from "react"
import {FaMoon} from "react-icons/fa";
import {BsSunFill} from "react-icons/bs"

const ThemeSwitcher = () => {

const [theme, setTheme] = useState(null)

useEffect(() => { 
if(window.matchMedia("prefer-color-scheme: dark").matches){
     setTheme("dark")

}else{



setTheme("light")
}
}, []);



useEffect(() => {

if(theme === 'dark'){
     document.documentElement.classList.add("dark") 
}else{
     document.documentElement.classList.remove("dark")
}
}, [theme]);

const handleThemeSwitch = () => {

setTheme(theme === 'dark'? 'light': "dark")



}


return (

<button onClick={handleThemeSwitch} className=" p-3 rounded-lg text-yellow-500 dark:text-black ">
    {theme === "dark" ? <FaMoon /> : <BsSunFill />}
</button>



);
};

export default ThemeSwitcher