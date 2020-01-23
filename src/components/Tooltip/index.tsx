import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import App from '../../App';


const DURATION = 120;

const Tooltip: FunctionComponent<{ target: string }> = ({ showtooltip }) => {
  const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [messageState, setMessage] = useState<string | null>(null)

  const compRef = useRef<HTMLDivElement>();

  const showTooltip = (ev) => {
    if (compRef && compRef.current) {
      const targetCoords = ev.getBoundingClientRect();
      const compCoords = compRef.current.getBoundingClientRect();

      const deltaCenter = (targetCoords.width - compCoords.width) / 2;
      const deltaX = targetCoords.left - compCoords.left + deltaCenter;
      const deltaY = targetCoords.top - compCoords.top - compCoords.height - 9;

      setCoords({ x: deltaX, y: deltaY });
      setIsVisible(true);
    }
  }

  const hideTooltip = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCoords({ x: 0, y: 0 });
    }, DURATION);
  }


  useEffect(() => {
    if (showtooltip) {
      const parsedData = JSON.parse(showtooltip);
      const { message, target } = parsedData;

      const targetEl = document.getElementById(target.syntheticEvent.id);
      targetEl.addEventListener('mouseleave', hideTooltip);

      showTooltip(targetEl)
      setMessage(message)
    }
  }, [showtooltip]);

  if (!messageState) return null
  return (
    <App>
      <Tip
        isVisible={isVisible}
        duration={DURATION}
        ref={compRef}
        x={coords.x}
        y={coords.y}
      >
        <span>{messageState}</span>
      </Tip>
    </App>
  )
};

const Tip: any = styled<{ x: number; y: number, isVisible: boolean, duration: number }>("div")`
  position: absolute;
  background: ${(props) => props.theme.colors.$D10};
  color: ${(props) => props.theme.colors.$D80};
  padding: 12px;
  font-size: 14px;
  z-index: 0;
  border-radius: 6px;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  display: block;
  text-align: center;
  max-width: 144px;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  transform: ${(props) => (props.isVisible ? 'translateY(0px)' : 'translateY(10px)')};
  transition: all ${(props) => props.duration}ms cubic-bezier(0.23, 1, 0.32, 1);

  &:before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(194, 225, 245, 0);
    border-top-color: ${(props) => props.theme.colors.$D10};
    border-width: 6px;
    margin-left: -6px;
  }


`;


register(Tooltip, 'x-tooltip', ['showtooltip']);
