import { h } from "preact"
import { styled } from "@nksaraf/goober";
import { useEffect, useState } from "preact/hooks";

 const Skeleton = ({ width, height }: {width?: number, height: number}) => {
  const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const maxWidth = width || 150;
  const [currentWidth, setWidth] = useState(0);

  useEffect(() => {
    setWidth(randomInteger(60, maxWidth));
    return () => width;
  }, []);


  return (
    <Rectangle height={height} width={currentWidth} />
  );
};


const Rectangle: any = styled<{ width: number, height: number}>('span')`

@keyframes pulsate {
  from {
   background-position:200% 50%;
  }

  to {
    background-position:-200% 50%;
  }
}

  width: 100px;
  background: linear-gradient(
    270deg,
    rgb(250, 250, 250),
    rgb(234, 234, 234),
    rgb(234, 234, 234),
    rgb(250, 250, 250)
  );
  background-size: 400% 400%;
  position: relative;
  box-sizing: border-box;
  display: block;
  animation-timing-function: linear;
  animation-direction: normal;
  animation-duration: 3s;
  animation-fill-mode: none;
  border-radius: 0px;
  animation-play-state: running;
  animation-delay: initial;
  animation-iteration-count: infinite;
  animation-direction: initial;
  animation-fill-mode: initial;
  animation-play-state: initial;
  height: ${(props) => (props.height ? props.height : 16)}px;
  animation-name: pulsate;
  &:last-child {
    margin-bottom: 0;
  }
`;
export default Skeleton;
