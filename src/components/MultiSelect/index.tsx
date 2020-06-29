/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import register from 'preact-custom-element';
import { h } from 'preact';
import {
 useState, useEffect, useRef, PropRef,
} from 'preact/hooks';
import styled from "styled-components"
import { FC } from 'preact/compat';
import useClickOutside from '../../utils/useClickOutside';
import { ArrowDown } from '../../utils/Icons';
import useKeyPress from '../../utils/useKeyPress';
import useCustomEvent from '../../utils/useCustomEvent';
import App from "../../App"

const Dropdown = ({
  items, addClickHandler, isOpen,
}) => {
  const checkboxRef = useRef<HTMLInputElement[]>([]);

  if (!items.length) { return (
    <StyledDropdown isOpen={isOpen}>
      <Item>
        <label className="noItems">
          No Results
        </label>

      </Item>

    </StyledDropdown>

  ) }

  return (
    <StyledDropdown isOpen={isOpen}>
      {items.map((x) => (
        <Item
          key={x.id}
          id={x.id}
          ref={(el) => { checkboxRef.current[x.id] = el; }}
          checked={x.checked}
          onFocus={() => { checkboxRef.current[x.id].classList.add('focused') }}
          onBlur={() => { checkboxRef.current[x.id].classList.remove('focused') }}
          tabIndex={0}
          onKeyPress={(e) => e.keyCode === 13 && addClickHandler(e)}
        >
          <label>
            <input
              id={x.id}
              checked={x.checked}
              onChange={addClickHandler}
              type="checkbox"
            />
            {x.label}
          </label>
        </Item>
      ))}
    </StyledDropdown>
  );
};

const Tags = ({ items, removeClickHandler }) => (
  <StyledTags>
    {items.map((item) => (
      <span key={item.id}>
        {item.label}
        {' '}
        <i
          tabIndex={0}
          role="button"
          id={item.id}
          onKeyPress={removeClickHandler}
          onClick={() => removeClickHandler(item.id)}
        >
          ⨯
        </i>
      </span>
    ))}
  </StyledTags>
);


type DropdownItem = {
  id: string,
  label: string,
  checked?: boolean
}
interface Props {
data: string,
placeholder?:string
}


const Multiselect: FC<Props> = ({ data, placeholder }) => {
  const [parsedData, setParsedData] = useState<DropdownItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setOpen] = useState(false);

  const backSpaceDelete = useKeyPress('backspace');
  const modifierDelete = useKeyPress('meta');

  const inputPlaceHolder = placeholder || 'Select Value';
  const realInputRef = useRef<HTMLInputElement>();
  const filterByTerm = (item) => item.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  const checked = parsedData.filter((item) => item.checked);
  const unChecked = parsedData.filter((item) => !item.checked).filter(filterByTerm);
  const filteredData = unChecked;
  if (isOpen) realInputRef.current.focus();

  const dispatchEvent = useCustomEvent({
    ref: realInputRef,
    eventName: 'stateUpdated',
  });

  const dispatchAndLogEvent = (eventData) => {
    console.log('dispatching stateUpdated', eventData);
    dispatchEvent(eventData);
  }


  const addClickHandler = (e) => {
    const seleced = parsedData.find((item) => item.id === e.target.id);
    seleced.checked = true;
    setSearchTerm('');
    dispatchAndLogEvent([...checked, seleced]);
    setParsedData(parsedData.slice());
  };


  const removeClickHandler = (id) => {
    const seleced = parsedData.find((item) => item.id === id);
    seleced.checked = false;
    setParsedData([...parsedData]);
  };

  useEffect(() => {
    if (data) setParsedData(JSON.parse(data));
  }, [data, placeholder]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    if (modifierDelete && backSpaceDelete) {
      parsedData.forEach((listItem) => { listItem.checked = false });
      setParsedData(parsedData.slice());
    }
   if (backSpaceDelete && !searchTerm.length) {
      const { id } = checked[checked.length - 1];
      removeClickHandler(id);
    }
  }, [backSpaceDelete, modifierDelete]);


  const onInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const [wrappRef, isClickOutside]: (PropRef<HTMLElement> | boolean)[] = useClickOutside();

  if (isClickOutside) setOpen(false);

  return (
    <App>
      <Wrap ref={wrappRef}>
        <FakeInput focused={isOpen}>
          <Content
            role="menuitem"
            onClick={() => setOpen(true)}
          >
            <Tags removeClickHandler={removeClickHandler} items={checked} />
            <RealInput
              placeholder={inputPlaceHolder}
              type="text"
              value={searchTerm}
              onChange={onInputChange}
              onFocus={() => setOpen(true)}
              ref={realInputRef}
            />
          </Content>
          <ArrowDown onClick={() => setOpen(!isOpen)} className="arrow" />
        </FakeInput>
        <Dropdown
          isOpen={isOpen}
          addClickHandler={(e) => addClickHandler(e)}
          items={filteredData}
        />
      </Wrap>
    </App>

  );
};


const Wrap: any = styled.div`
  position: relative;
  box-sizing: border-box;
  display: block;
  /* height: 36px; */
  width: 100%;

`;


const StyledTags: any = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & span {
    display: flex;
    border-radius: 30em;
    font-size: 12px; 
    padding: 0 9px;
    margin: 6px 6px 0 0px;
    background: ${(props) => props.theme.colors.$B40};
    white-space: nowrap;
    align-items: center;
    max-height: 22px;
    min-height: 22px;
    &:last-child {
      margin: 6px 0px 0 0px;
    }

    & i {
      width: 100%;
      cursor: pointer;
      font-size: 15px;
      font-style: normal;
      margin: 0 0 0 6px;
      height: 100%;
    }
  }
`;

const Item: any = styled.li<{ checked: any, focused: boolean }>`
  &:hover {
    cursor: pointer;
    background:  ${(props) => props.theme.colors.$B40};
  }
  &:active {
    cursor: pointer;
    background:  ${(props) => props.theme.colors.$B50};
  }

  &.focused {
     background:  ${(props) => props.theme.colors.$B40};
  }


  label {
    display: flex;
    font-size: 14px;
    padding: 0 18px;
    height: 36px;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    & input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      height: 0; width: 0;
    }

    &.noItems {
      font-size: 12px;
      color: ${(props) => props.theme.colors.$D40};
    }
  }

`;

const StyledDropdown: any = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 991;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.0784314) 0px 4px 8px, rgba(0, 0, 0, 0.0784314) 0px 2px 4px;
  list-style: none;
  padding: 6px 0;
  margin: 6px 0 0 0;
  display: none;
    background: ${(props) => props.theme.colors.$D80};
  max-height: 192px;
  overflow-y: auto;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const RealInput: any = styled.input<{ isOpen: boolean }>`
  display: flex;
  flex: 1;
  align-self: center;
  border-radius: 4px;
  width: calc(100% - 24px);
  background: transparent;
  outline: none;
  font-size: 14px;
  padding: 0 6px;
  margin: 6px 0;
  border: none;
`;


const FakeInput: any = styled.div<{ focused: boolean }>`
  display: flex;
  min-height: 36px;
  /* max-height: 42px; */
  /* height: 36px; */
  flex-wrap: wrap;
  align-items: stretch;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.$D80};
  border: 1px solid ${(props) => (props.focused ? props.theme.colors.$B10 : props.theme.colors.$B30)};
  padding: 0 6px;
  position: relative;

  &:hover {
    cursor: text;
     background: ${(props) => props.theme.colors.$B50};
  }
 
  .arrow {
    top: 0;
    bottom: 0;
    margin: auto;
    fill: ${(props) => props.theme.colors.$B10};
    cursor: pointer;
    z-index: 991;
  }
`;

const Content: any = styled.div`
  display: flex;
  flex: 1;
  justify-content: stretch;
  flex-wrap: wrap;
`;
export default Multiselect;
register(Multiselect, 'x-multiselect', ['data']);
