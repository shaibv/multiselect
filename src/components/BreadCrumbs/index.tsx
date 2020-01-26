import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import App from '../../App';
import useCustomEvent from '../../utils/useCustomEvent';
import Skeleton from '../Skeleton';


type Crumb = {
    label: string,
    id?: string
};
interface Props {
    data: string
}


const Crumb = ({ item, clickHandler }) => (
  <StyledCrumb>
    <button onClick={() => clickHandler(item)} type="button">{item.label}</button>
  </StyledCrumb>
);


const BreadCrumbs: FunctionComponent<Props> = ({ data }) => {
    const [dataState, setData] = useState<Crumb[] | null>(null);
    const componentRef = useRef<HTMLUListElement>();

    useEffect(() => {
        if (data) setData(JSON.parse(data));
    }, [data]);

  const dispatchEvent = useCustomEvent({
    ref: componentRef,
    eventName: 'crumbClicked',
  })


    const clickHandler = (item) => {
      if (dataState[dataState.length - 1].label.indexOf(item.label) === 0) {
        return
      }
        dispatchEvent(item);
    }


    return (
      <App>
        <StyledCrumbs ref={componentRef}>

          {!dataState ? <Skeleton height={16} /> : dataState.map((crumb) => (
            <Crumb
              clickHandler={clickHandler}
              key={crumb.label}
              item={crumb}
            />
                ))}
        </StyledCrumbs>
      </App>
    );
};

const StyledCrumbs: any = styled("ul")`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
   max-height: 30px;
  min-height: 30px;
`;

const StyledCrumb = styled("li")`
  display: flex;
  align-items: center;
 

  button {
    border: none;
    background: transparent;
    font-size: 14px;
    color: ${(props) => props.theme.colors.$D10};
    padding: 0;
    display: flex;
    font-weight: 300;
    border-radius: 30em;
    padding: 3px 0;
  }
  &:last-child button {
    font-weight: 400;
  }

  &:not(:last-child) button:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.$B40};
    box-shadow: -10px 0 0 0 ${(props) => props.theme.colors.$B40},
      10px 0 0 0 ${(props) => props.theme.colors.$B40};
  }

  &:not(:last-child):after {
    content: "";
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z' fill='rgba(182,193,205,1)'/%3E%3C/svg%3E");
    background-size: 20px 20px;
    display: inline-block;
    margin: 0 12px 0 9px;
    height: 16px;
    width: 16px;
  }
`;


register(BreadCrumbs, 'x-breadcrumbs', ['data']);

export default BreadCrumbs;
