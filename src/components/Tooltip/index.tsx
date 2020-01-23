import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import App from '../../App';


const Tooltip: FunctionComponent<{target: string}> = ({ target }) => {
  const [coords, setCoords] = useState<{x: number, y: number}>({ x: 0, y: 0 });

  const compRef = useRef<HTMLDivElement>();

  const showTooltip = (ev) => {
    const targetCoords = ev.target.getBoundingClientRect();
    const compCoords = compRef.current.getBoundingClientRect();

    const deltaCenter = (targetCoords.width - compCoords.width) / 2;
    const deltaX = targetCoords.left - compCoords.left + deltaCenter;
    const deltaY = targetCoords.top - compCoords.top - compCoords.height - 6;

    setCoords({ x: deltaX, y: deltaY });
  }

  const hideTooltip = () => {
    setCoords({ x: 0, y: 0 });
  }

  useEffect(() => {
    if (target && compRef && compRef.current) {
      const ParsedEvent = JSON.parse(target);
      const targetEl = document.getElementById(ParsedEvent.syntheticEvent.id);

      targetEl.addEventListener('mouseenter', showTooltip);
      targetEl.addEventListener('mouseleave', hideTooltip);
    }
    return () => {
      document.removeEventListener('mouseenter', showTooltip);
      document.removeEventListener('mouseleave', hideTooltip);
    }
  }, [target]);


  return (
    <App>
      <Tip ref={compRef} x={coords.x} y={coords.y}>Im a tooltip!</Tip>
    </App>
  )
};

const Tip: any = styled<{ x: number, y: number }>('div')`
position: absolute;
background: ${(props) => props.theme.colors.$D10};
color: ${(props) => props.theme.colors.$D80};
padding: 18px;
font-size: 14px;
border-radius: 6px;
left: ${(props) => props.x}px;
top: ${(props) => props.y}px;
`;


register(Tooltip, 'x-tooltip', ['target']);
