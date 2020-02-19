// @ts-nocheck

import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from "styled-components"
import register from 'preact-custom-element';
import { FC } from 'preact/compat/src';
import useClickOutside from '../../utils/useClickOutside';
import useCustomEvent from '../../utils/useCustomEvent';
import App from '../../App';


const DURATION = 120;


const ActionList: FC<{data: any}> = ({ data, clickHabdler }) => (
  <StyledList>
    {data.map((item) => (
      <button onClick={() => clickHabdler(item)} disabled={item.disabled} type="button" key={item.label}>
        {item.icon && <img alt="" src={item.icon} />}
        {item.label}
      </button>
      ))}
  </StyledList>
  )

const Popover: FC<{ showtooltip: string }> = ({ init }) => {
  const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [propData, setData] = useState<string | null>(null)
  const [targetState, setTargetState] = useState(null)

  const [compRef, isClickOutside]: (PropRef<HTMLElement> | boolean)[] = useClickOutside();


  const showTooltip = (ev) => {
    if (compRef && compRef.current) {
      const targetCoords = ev.getBoundingClientRect();
      const compCoords = compRef.current.getBoundingClientRect();

      const deltaCenter = (targetCoords.width - compCoords.width) / 2;
      const deltaX = targetCoords.left - compCoords.left + deltaCenter;
      const deltaY = targetCoords.top - compCoords.top + targetCoords.height + 18;

      setCoords({ x: deltaX, y: deltaY });
      setIsVisible(true);
    }
  }

  const hideTooltip = () => {
    setIsVisible(false);
      setCoords({ x: 0, y: 0 });
      setTargetState(null)
  }


  const dispatchEvent = useCustomEvent({
    ref: compRef,
    eventName: 'itemClicked',
  });

  const clickHabdler = (item) => {
    dispatchEvent(item)
  }

  useEffect(() => {
    if (init) {
      const parsedData = JSON.parse(init);
      const { data, target }: { data: any, target: any } = parsedData;
      setData(data)
      setTargetState(target)
    }
  }, [init]);

  if (isClickOutside && isVisible) hideTooltip();

  useEffect(() => {
    if (targetState) {
      const targetEl = document.getElementById(targetState.syntheticEvent.id);
      showTooltip(targetEl)
    }
  }, [targetState, propData]);


  return (
    <App>
      {!targetState || !coords ? null
        : (
          <Tip
            isVisible={isVisible}
            duration={DURATION}
            ref={compRef}
            x={coords.x}
            y={coords.y}
          >
            <ActionList clickHabdler={clickHabdler} data={propData} />
          </Tip>
        )}
    </App>
  )
};
const Tip: any = styled.div<{x: number;y: number;isVisible: boolean;duration: number;}>`
  box-sizing: border-box;
  position: absolute;
  background: ${(props) => props.theme.colors.$D80};
  box-shadow: rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.0784314) 0px 4px 8px, rgba(0, 0, 0, 0.0784314) 0px 2px 4px;
  color: ${(props) => props.theme.colors.$D10};
  padding: 6px 0;
  font-size: 14px;
  z-index: 991;
  border-radius: 6px;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  display: block;
  max-width: 360px;
  min-width: 144px;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transform: ${(props) => (props.isVisible ? "translateY(0px)" : "translateY(10px)")};
  transition: opacity,
    transform ${(props) => props.duration}ms cubic-bezier(0.23, 1, 0.32, 1);

  &:after {
    top: -12px;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(194, 225, 245, 0);
    border-bottom-color: ${(props) => props.theme.colors.$D80};
    border-width: 6px;
    margin-left: -6px;
  }
  &:before {
    top: -14px;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: rgba(0, 0, 0, 0.0470588);
    border-width: 7px;
    margin-left: -7px;
  }
`;

const StyledList: any = styled.ul`
  display: flex;
  flex-direction: column;
  button {
    height: 36px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.$D10};
    font-size: 14px;
    border: none;

    &:disabled {
      color: ${(props) => props.theme.colors.$D40};

      & img {
        opacity: 0.3;
      }
    }

    & img {
      width: 24px;
      height: 24px;
      margin: 0 6px 0 0;
    }
    &:hover:not(:disabled) {
      cursor: pointer;
      background: ${(props) => props.theme.colors.$B40};
    }
  }
`;

export default { title: 'Popover' }


register(Popover, 'x-popover', ['init']);
