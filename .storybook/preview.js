import { addDecorator } from "@storybook/preact";
import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import styled from "styled-components";
import { useTable } from "react-table";
import { Checkmark } from "../src/utils/Icons";
const Table = ({ data }) => {
  const columns = [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Required",
      accessor: "required"
    },
    {
      Header: "Type",
      accessor: "type",
      className: 'type',
    },
    {
      Header: "Default Value",
      accessor: "defaultValue"
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
      <div {...getTableProps()} className="table">
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
                {row.cells.map(cell => {
                  if (cell.column.id === "required") {
                    console.log(cell);
                    return (
                      <div
                        key={cell.value}
                        {...cell.getCellProps()}
                        className={"td" + " " + cell.column.id}
                      >
                        {cell.value ? <Checkmark size={18}/> : ""}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={cell.value}
                        {...cell.getCellProps()}
                        className={"td" + " " + cell.column.id}
                      >
                        {cell.render("Cell")}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </StyledTable>
  );
};

const StoryWrap = ({ story }) => {
  const name = story.type.__docgenInfo
    ? story.type.__docgenInfo.displayName
    : story.type.name;
  const props = story.type.__docgenInfo && story.type.__docgenInfo.props;
  const [parsedProps, setProps] = useState(null);

  useEffect(async () => {
    if (props) {
      console.log(story);
      const propsArr = Object.values(props);
      const mappedProps = propsArr.map(prop => ({
        ...prop,
        type: prop.type.name
      }));
      setProps(mappedProps);
    }
  }, [story]);

  return (
    <StyledStory>
      <div className="content">
        <h1>{name}</h1>
        <code>
          <pre>https://ds.wixps.com/{name}</pre>
          <pre>x-{name.toLowerCase()}</pre>
        </code>
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
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .content code {
    padding:6px 18px;
    background: #f3f3f3;
    border-radius: 6px;
    margin: 0 0 42px 0;
  }
`;

const StyledTable = styled.div`
  margin: 18px 0 0 0;
  .type {
    color: rgb(189, 16, 224);
    font-family: monospace;
  }
  .table {
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    border-radius: 6px;
    .tr.header {
      height: 42px;
      font-size: 11px;
      letter-spacing: 1px;
      color: #999;
      font-weight: 500;
      background: #fafafa;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      text-transform: uppercase;
      &:hover {
        cursor: default;
      }
    }

    .tr {
      height: 54px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      /* &:last-child {
        border-bottom: none;
      } */

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
        padding: 0 30px 0 0;
      }

      .th:first-child,
      .td:first-child {
        padding: 0 0 0 30px;
      }
    }
  }
`;

addDecorator(storyFn => <StoryWrap story={storyFn()} />);
