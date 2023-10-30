// bu yerga tegilmasin aks holda btn uzgarib ketadi

// import { useState } from "react";
// import "./style.scss";

// function LoginBtn() {

//     const [isClicked, setIsClicked] = useState(false);
//     const [isValidated, setIsValidated] = useState(false);

//     const handleClick = () => {
//         setIsClicked(true);
//         setTimeout(() => {
//             setIsClicked(false);
//             setIsValidated(true);
//             setTimeout(() => {
//                 setIsValidated(false);
//             }, 100000);
//         }, 200);
//     };

//     return (
//         <>
//             <button
//                 id="button"
//                 onClick={handleClick}
//                 className={`${isClicked ? 'onclic' : ''} ${isValidated ? 'validate' : ''}`}
//             >
//                 {isValidated ? 'Loading...' : 'Log In'}
//             </button>
//         </>
//     );
// }

// export default LoginBtn;