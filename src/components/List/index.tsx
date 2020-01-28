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


const isHtmlElement = (string) => /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(string)

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
        // isHtmlElement(item.value) ? <li innerHTML={item.value} key={item.value} />
        // : <li key={item.value}>{item.value}</li>
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
  height: 36px;
  display: flex;
  align-items: center;
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
