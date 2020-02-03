import { addParameters, addDecorator } from "@storybook/preact";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { withInfo } from "@storybook/addon-info";
import {h} from "preact";
import {useEffect} from "preact/compat"
import styled from 'styled-components';


const TableComponent = ({ propDefinitions }) => {
  const props = propDefinitions.map(({ type, name, required, description, defaultValue }) => {
      return (
        <tr key={name}>
          <td>
            {`${name}, ${required ? '*' : '' }`}
          </td>
          <td>{type.name}</td>
          <td>{defaultValue ? defaultValue : "-"}</td>
          <td>{description}</td>
        </tr>
      );
    }
  );

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>type</th>
          <th>default</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>{props}</tbody>
    </table>
  );
};

const StoryWrap = ({ story }) => {
  const name = story.type.__docgenInfo ? story.type.__docgenInfo.displayName : story.type.name;
  const props = story.type.__docgenInfo && story.type.__docgenInfo.props;

  useEffect(() => {
    const keys = Object.values(props);
    console.log(keys);
  
  }, [props]);

  return (
    <StyledStory>
      <div className="content">
        <h1>{name}</h1>
        <div className="story">{story}</div>
        {props && <TableComponent propDefinitions={Object.values(props)} />}
      </div>
    </StyledStory>
  );
};





const StyledStory = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  .content {
    max-width: 834px;
    width: 834px;
    flex-direction: column;
    display: flex;
  }
  .content h1 {
    font-size: 36px;
  }
  .content .story {
    border-radius: 6px;
    display: flex;
    padding: 48px;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0,0,0,0.1);
  }
`;





  
addDecorator(storyFn => (
  <StoryWrap story={storyFn()} />
));

