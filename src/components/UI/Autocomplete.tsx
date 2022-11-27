import styled from "styled-components";
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Input } from "./Input";
import {useForwardedRef} from '../../hooks/useForwardedRef';

const AutocompleteContainer = styled.div`
  position: relative;
  width: 150px;
`;

const ItemsContainer = styled.div`
  border-radius: 4px;
  border: 1px solid #ddd;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
`;

const Item = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#fff" : "#333")};
  background: ${(props) => (props.isActive ? "#333" : "#fff")};
  padding: 2px 4px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
    
`;

type AutocompletePropsType = {
  items: string[];
  onAutocomplete: (str: string) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref" | "autoComplete"
>;

const Autocomplete = forwardRef(
  (
    { items, onBlur, onFocus, onAutocomplete, ...props }: AutocompletePropsType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isShow, setIsShow] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const withForwardRef = useForwardedRef(ref);

    const onKeyPressHandler = useCallback(
      (e: KeyboardEvent) => {
        let { length } = items;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (activeIndex !== null) {
            if (activeIndex === length - 1) {
              setActiveIndex(0);
            } else {
              setActiveIndex(activeIndex + 1);
            }
          } else {
            setActiveIndex(0);
          }
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          if (activeIndex !== null) {
            if (activeIndex === 0) {
              setActiveIndex(length - 1);
            } else {
              setActiveIndex(activeIndex - 1);
            }
          } else {
            setActiveIndex(length - 1);
          }
        }

        if (e.key === "Enter") {
          e.preventDefault();
          if (activeIndex !== null && items[activeIndex]) {
            onAutocomplete(items[activeIndex]);
            withForwardRef?.current?.blur();
          }
        }
      },
      [activeIndex, withForwardRef, items, onAutocomplete]
    );

    useEffect(() => {
      const {current} = withForwardRef;
      current?.addEventListener("keydown", onKeyPressHandler);
      return () => {
        current?.removeEventListener("keydown", onKeyPressHandler);
      };
    }, [onKeyPressHandler, withForwardRef]);

    return (
      <AutocompleteContainer>
        <Input
          ref={withForwardRef}
          onFocus={(...props) => {
            setIsShow(true);
            onFocus && onFocus(...props);
          }}
          autoComplete={"off"}
          onBlur={(...props) => {
            setIsShow(false);
            setActiveIndex(null);
            onBlur && onBlur(...props);
          }}
          {...props}
        />
        {isShow && (
          <ItemsContainer>
            {items.map((item, idx) => (
              <Item key={idx} isActive={idx === activeIndex}>
                {item}
              </Item>
            ))}
          </ItemsContainer>
        )}
      </AutocompleteContainer>
    );
  }
);

export default Autocomplete;