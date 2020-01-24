/* eslint-disable react/jsx-props-no-spreading */
import { h, FunctionComponent } from 'preact';
import {
 useEffect, useState, useRef, useMemo,
} from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import { useTable, Column } from 'react-table'
import App from '../../App';
import useCustomEvent from '../../utils/useCustomEvent';


const Table: FunctionComponent<{ data: string, columns: string}> = ({ data, columns }) => {
    const [dataState, setData] = useState(null);
    const [columnsState, setColumns] = useState(null);

    const componentRef = useRef<HTMLTableElement>();

    useEffect(() => {
        if (data && columns) {
            const parsedData: Array<any> = JSON.parse(data);
            const parsedColumns: Array<Column> = JSON.parse(columns);

            setData(parsedData);
            setColumns(parsedColumns);
       }
    }, [data, columns]);


    useEffect(() => {
        console.log(dataState, columnsState);
    }, [dataState, columnsState]);


    const dispatchEvent = useCustomEvent({
        ref: componentRef,
        eventName: 'tableRowClicked',
    });


    if (!dataState || !columnsState) return <div>Loading....</div>

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: columnsState,
        data: dataState,
    });

    return (
      <App>
        <Styles>
          <table ref={componentRef} {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (

                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id} {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr onClick={() => dispatchEvent(row.values)} key={row.id} {...row.getRowProps()}>
                            {row.cells.map((cell) => <td key={cell.value} {...cell.getCellProps()}>{cell.render("Cell")}</td>)}
                          </tr>
                        );
                    })}
            </tbody>
          </table>
        </Styles>
      </App>
    )
    }


const Styles = styled("div")`
  table {
    font-size: 14px;
    background: ${(props) => props.theme.colors.$D80};
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    tr {
      height: 54px;

      &:hover {
          background: ${(props) => props.theme.colors.$B50};
          cursor: pointer;
          transition: all 120ms ease;
      }
    }
    thead {
      background: ${(props) => props.theme.colors.$B40};
      
      th {
        font-weight: 400;
      }
      tr {
        height: 42px;
        &:hover {
             background: ${(props) => props.theme.colors.$B40};
             cursor: default;
        }
      }
    }
    th,
    td {
      margin: 0;
      border-bottom: 1px solid ${(props) => props.theme.colors.$D60};
      vertical-align: middle;
      text-align: left;
      padding: 0 30px;
    }
  }
`;

register(Table, 'x-table', ['columns', 'data']);

export default Table;
