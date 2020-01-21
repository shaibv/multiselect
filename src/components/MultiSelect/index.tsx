/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import register from 'preact-custom-element';
import {
  useState, useEffect, useRef,
} from 'preact/hooks';
import { h } from 'preact';
// import { styled, setPragma } from 'goober';
import styled from "styled-components"
import useClickOutside from '../../utils/useClickOutside';
import { ArrowDown } from '../../utils/Icons';
import useKeyPress from '../../utils/useKeyPress';
import Theme from '../../utils/globalStyles';
// setPragma(h);


const Dropdown = ({
  items, addClickHandler, isOpen, maxHeight,
}) => {
  const checkboxRef = useRef<HTMLInputElement[]>([]);

  if (!items.length) {
    return (
      <ul className="dropwdown">
        <li>
          <pre className="noItems">No items found...</pre>
        </li>
      </ul>
    );
  }
  return (
    <ul className="dropwdown">
      {items.map((x, i) => (
        <li
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
          <label htmlFor={x.id}>
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
        </li>
      ))}
    </ul>
  );
};

const Tags = ({ items, removeClickHandler }) => (
  <div className="tags">
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
  </div>
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

  const event = new CustomEvent('stateUpdated', {
    detail: checked,
    bubbles: true,
  });

  useEffect(() => {
    if (realInputRef.current) realInputRef.current.dispatchEvent(event);
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
    <div ref={wrappRef}>
      <Wrapp>
        <FakeInput>
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
          maxHeight="300"
          isOpen={isOpen}
          addClickHandler={addClickHandler}
          items={filteredData}
        />
      </Wrapp>
    </div>

  );
};


const RealInput: any = styled('input')`
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

const Wrapp = styled('div')`
  position: relative;
  box-sizing: border-box;
`;

const FakeInput = styled('div')`
display: flex;
min-height: 36px;
flex-wrap: wrap;
width: 100%;
background: ${() => Theme.Colors.$D80};
align-items: stretch;
border-radius: 4px;
padding: 0 6px;
border: 1px solid  ${() => Theme.Colors.$B30};
  position: relative;
  
&:hover {
      background:  ${() => Theme.Colors.$B40};
      cursor: text;
}
.focused {
  border: 1px solid  ${() => Theme.Colors.$B10};
}
.arrow {
  fill:${() => Theme.Colors.$B10};
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  z-index: 991;
}
`;

const Content: any = styled<{ onKeyPress: Function }>('div')`
 display: flex;
flex: 1;
justify-content: stretch;
flex-wrap: wrap;
`;


register(Multiselect, 'x-multiselect', ['data']);
