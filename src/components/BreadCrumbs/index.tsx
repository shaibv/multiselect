import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import App from '../../App';
import useCustomEvent from '../../utils/useCustomEvent';


type Crumb = {
    label: string,
    id?: string
};
interface Props {
    data: string
}

const Crumb = ({ item }) => (
  <StyledCrumb>
    <p>{item.label}</p>
  </StyledCrumb>
);


const BreadCrumbs: FunctionComponent<Props> = ({ data }) => {
    const [dataState, setData] = useState<Crumb[] | null>(null);
    const componentRef = useRef();

    useEffect(() => {
    if (data) {
        const parsedData = JSON.parse(data);
        setData(parsedData);
    }
    }, [data]);


    const dispatchEvent = useCustomEvent({
        ref: componentRef,
        eventName: 'crumbClicked',
        data: '',
    })

    if (!dataState) return null;

    return (
      <App ref={componentRef}>
        <StyledCrumbs>
          {dataState.map((crumb) => <Crumb key={crumb.label} item={crumb} />)}
        </StyledCrumbs>
      </App>
    );
};

const StyledCrumbs = styled('ul')`

`;

const StyledCrumb = styled('li')`

`;


register(BreadCrumbs, 'x-breadcrumbs', ['data']);

export default BreadCrumbs;
