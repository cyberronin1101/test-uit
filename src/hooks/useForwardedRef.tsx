import {ForwardedRef, useEffect, useRef} from 'react';

export const useForwardedRef = <T, >(ref: ForwardedRef<T>) => {
  const innerRef = useRef(null);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef as React.MutableRefObject<T>;
}