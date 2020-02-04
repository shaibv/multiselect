import {  addDecorator } from "@storybook/preact";
import {h} from "preact";
import {useEffect, useState} from "preact/compat"
import styled from 'styled-components';
import { useTable } from "react-table";



const Table = ({ data }) => {

  const columns = [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Type",
      accessor: "type"
    },
    {
      Header: "Default Value",
      accessor: "defaultValue"
    },
    {
      Header: "Required",
      accessor: "required"
    }
  ];

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <StyledTable>
      <h3>Component Props</h3>
      <div  {...getTableProps()} className="table">
        <div>
          {headerGroups.map(headerGroup => (
            <div
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
              className="tr header"
            >
              {headerGroup.headers.map(column => (
                <div
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="th"
                >
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <div key={row.id} {...row.getRowProps()} className="tr">
                {row.cells.map(cell => (
                  <div key={cell.value} {...cell.getCellProps()} className="td">
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </StyledTable>
  );
}

const StoryWrap = ({ story }) => {
  const name = story.type.__docgenInfo ? story.type.__docgenInfo.displayName : story.type.name;
  const props = story.type.__docgenInfo && story.type.__docgenInfo.props;
  const [parsedProps, setProps] = useState(null)
  

  useEffect(async () => {
    console.log(props);
    const propsArr = Object.values(props);
    const mappedProps = propsArr.map(prop => ({...prop, type: prop.type.name}))
    setProps(mappedProps);
    console.log(mappedProps);
  }, [story]);

  return (
    <StyledStory>
      <div className="content">
        <h1>{name}</h1>
        <div className="story">{story}</div>
        {parsedProps && <Table data={Object.values(parsedProps)} />}
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




const StyledTable = styled.div`
margin: 30px 0 0 0;
  .table {
    font-size: 14px;
    width: 100%;
    overflow: hidden;

    .tr.header {
      height: 42px;
      font-size: 10px;
      color: #999;
      font-weight: 600;
      text-transform: uppercase;
      &:hover {
        cursor: default;
      }
    }

    .tr {
      height: 42px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:hover {
        transition: all 120ms ease;
      }

      .th,
      .td {
        display: block;
        flex: 1;
        text-align: left;
        overflow-x: hidden;
        text-overflow: ellipsis;
        align-items: center;
      }

      .th:first-child,
      .td:first-child {
      }
    }
  }
`;
  
addDecorator(storyFn => (
  <StoryWrap story={storyFn()} />
));

