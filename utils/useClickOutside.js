import { useEffect, useState, useRef } from "preact/hooks";

const useClickOutside = () => {

    const [state, setState] = useState(false);
    const ref = useRef()

	const clickHandler = ev => {
		if (ref.current && !ref.current.contains(ev.target)) {
			setState(true)
        } else {
			setState(false);
        }
        
    };
   
    
	useEffect(() => {
		document.addEventListener("mousedown", clickHandler);
		return () => {
			document.removeEventListener("mousedown", clickHandler);
		};
    }, []);
    
	return [ref, state];
		
};

export default useClickOutside;
