import { useEffect } from "react";
import { useRef } from "react";

//same as useEffect but doesnt call on first render
export function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false);
  
    useEffect(() => {
      if (didMountRef.current)
        return fn();
      else
        didMountRef.current = true;
    }, inputs);
  }