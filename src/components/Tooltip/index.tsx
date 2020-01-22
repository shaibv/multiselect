import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import App from '../../App';
import useCustomEvent from '../../utils/useCustomEvent';


const Tooltip = ({ position }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const parsedPosstion = JSON.parse(position);
    setX(parsedPosstion.clientX)
    setY(parsedPosstion.clientY)
  }, [position])

  useEffect(() => {

  }, [x, y])

  return (
    <App>
      <Tip x={x} y={y}>Im tooltip!</Tip>
    </App>
    )
};

const Tip = styled<{x: any, y: any}>('div')`
position: absolute;
left: ${(props) => props.x}px;
top: ${(props) => props.y}px;
`;


register(Tooltip, 'x-tooltip', ['position']);
