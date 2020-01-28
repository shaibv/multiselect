import { h, FunctionComponent, Fragment } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import App from '../../App';
import useCustomEvent from '../../utils/useCustomEvent';
import Skeleton from '../Skeleton';


type Item = {
  key: string
  value: any
};


const SkeletonData = () => (
  <StyledList>
    <Keys>
      <li><Skeleton height={16} /></li>
      <li><Skeleton height={16} /></li>
      <li><Skeleton height={16} /></li>
    </Keys>
    <Values>
      <li><Skeleton height={16} /></li>
      <li><Skeleton height={16} /></li>
      <li><Skeleton height={16} /></li>


    </Values>
  </StyledList>
  );

const ListedData = ({ data }) => (
  <StyledList>
    <Keys>
      {data.map((item) => (
        <li key={item.key}>{item.key}</li>
      ))}
    </Keys>
    <Values>
      {data.map((item) => (
        // @ts-ignore
        <li innerHTML={item.value} key={item.value} />
    ))}
    </Values>
  </StyledList>
  );

const List = ({ data }) => {
  const [parsedData, setData] = useState<Item[] | null>(null);


  useEffect(() => {
   if (data) {
     setData(JSON.parse(data))
   }
  }, [data]);

  useEffect(() => {
    console.log(parsedData);
  }, [parsedData]);

  return (
    <App>
      {parsedData
        ? <ListedData data={parsedData} />
        : <SkeletonData /> }
    </App>
  )
};


const StyledList = styled('div')`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  list-style: none;
  font-size: 14px;

  div li {
  height: 30px;
  }

`;

const Keys = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0 30px 0 0;

  
`;

const Values = styled('div')`
  display: flex;
  flex-direction: column;

`;


register(List, 'x-list', ['data']);
