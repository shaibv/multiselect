/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import register from 'preact-custom-element';
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import useClickOutside from '../../utils/useClickOutside';
import { ArrowDown } from '../../utils/Icons';
import useKeyPress from '../../utils/useKeyPress';
import Base from '../../utils/globalStyles';
import useCustomEvent from '../../utils/useCustomEvent';
import App from "../../App"

const Dropdown = ({
  items, addClickHandler, isOpen,
}) => {
  const checkboxRef = useRef<HTMLInputElement[]>([]);


  return (
    <StyledDropdown isOpen={isOpen}>
      {items.map((x, i) => (
        <Item
          tabIndex={0}
          key={x.id}
          id={x.id}
          checked={x.checked}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              checkboxRef.current[i].checked = true; addClickHandler(e);
            }
          }}
        >
          <label>
            <input
              ref={(el) => { checkboxRef.current[i] = el; }}
              key={x.checked}
              id={x.id}
              checked={x.checked}
              onChange={addClickHandler}
              type="checkbox"
            />
            {x.name}
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
        {item.name}
        {' '}
        <i
          tabIndex={-1}
          role="button"
          id={item.id}
          onKeyPress={removeClickHandler}
          onClick={removeClickHandler}
        >
          ⨯
        </i>
      </span>
    ))}
  </StyledTags>
);

const Multiselect = (props) => {
  const [data, setData] = useState(null);
  const [checked, setChecked] = useState([]);
  const [unChecked, setUnChecked] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const backSpaceDelete = useKeyPress('backspace');

  const realInputRef = useRef<HTMLInputElement>();

  const { placeholder } = props;


  useEffect(() => {
    if (props && props.data) {
      setData(JSON.parse(props.data));
    }
  }, [props]);

  useEffect(() => {
    setFilteredData(unChecked);
  }, [unChecked]);

  useEffect(() => {
    if (data) {
      setChecked(data.filter((item) => item.checked));
      setUnChecked(data.filter((item) => !item.checked));
    }
  }, [data]);


  const dispatchEvent = useCustomEvent({
    ref: realInputRef,
    data: checked,
    eventName: 'stateUpdated',
  });

  useEffect(() => {
    dispatchEvent()
  }, [checked]);

  const addClickHandler = (e) => {
    const ctx = unChecked.filter((item) => item.id === e.target.id);
    const ctx2 = unChecked.filter((item) => item.id !== e.target.id);
    setChecked([...checked, ...ctx]);
    setUnChecked([...ctx2]);
    realInputRef.current.focus();
  };

  const removeClickHandler = (e) => {
    const ctx = checked.filter((item) => item.id !== e.target.id);
    const ctx2 = checked.filter((item) => item.id === e.target.id);
    setChecked([...ctx]);
    setUnChecked([...ctx2, ...unChecked]);
    realInputRef.current.focus();
  };

  useEffect(() => {
    if (backSpaceDelete && !searchTerm.length) {
      const e = { target: checked[checked.length - 1] };
      removeClickHandler(e);
    }
    return () => backSpaceDelete;
  }, [backSpaceDelete]);

  useEffect(() => {
    if (searchTerm.length) {
      const filter = unChecked.filter(
        (item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
      );
      setFilteredData(filter);
    } else {
      setFilteredData(unChecked);
    }
    return () => searchTerm;
  }, [searchTerm]);

  let timeout;
  const termSearchHandler = (e) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 25);
  };


  const [wrappRef, isClickOutside]: (any | boolean)[] = useClickOutside();

  if (isClickOutside) setOpen(false);


  useEffect(() => {
    if (isOpen) realInputRef.current.focus();
  }, [isOpen]);


  const inputPlaceHolder = placeholder || 'Select Value';

  if (!data) return null;
  return (
    <App>
      <Wrapp ref={wrappRef}>
        <FakeInput focused={isOpen}>
          <Content onKeyPress={() => setOpen(true)} role="menuitem" onClick={() => setOpen(true)}>
            <Tags removeClickHandler={removeClickHandler} items={checked} />
            <RealInput
              placeholder={inputPlaceHolder}
              onInput={termSearchHandler}
              type="text"
              ref={realInputRef}
            />
          </Content>
          <ArrowDown onClick={() => setOpen(!isOpen)} className="arrow" />
        </FakeInput>
        <Dropdown
          isOpen={isOpen}
          addClickHandler={addClickHandler}
          items={filteredData}
        />
      </Wrapp>
    </App>

  );
};


const StyledTags: any = styled('div')`
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

const Item: any = styled<{ checked: any }>('li')`
  &:focus {
    outline: none;
    background:  ${(props) => props.theme.colors.$B40};
    cursor: pointer;
  }
  &:hover {
    cursor: pointer;
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
      height: 0;
      position: absolute;
      opacity: 0;
      width: 0;
      visibility: hidden; 
    }
  }

`;

const StyledDropdown: any = styled<{ isOpen: Boolean }>('ul')`
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
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

const RealInput: any = styled<{ isOpen: Boolean }>('input')`
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

const Wrapp: any = styled('div')`
  position: relative;
  box-sizing: border-box;
`;

const FakeInput: any = styled<{ focused: Boolean }>('div')`
  display: flex;
  min-height: 36px;
  flex-wrap: wrap;
  width: 100%;
  align-items: stretch;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.$D80};
  border: 1px solid ${(props) => (props.focused ? props.theme.colors.$B10 : props.theme.colors.$B30)};
  padding: 0 6px;
  position: relative;

  &:hover {
    cursor: text;
     background: ${(props) => props.theme.colors.$B40};
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

const Content: any = styled("div")`
  display: flex;
  flex: 1;
  justify-content: stretch;
  flex-wrap: wrap;
`;

register(Multiselect, 'x-multiselect', ['data']);
