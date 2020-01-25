/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { h, FunctionComponent } from 'preact';
import {
 useEffect, useState, useRef,
} from 'preact/hooks';
import { styled } from "@nksaraf/goober"
import register from 'preact-custom-element';
import { useTable, Column } from 'react-table'
import App from '../../App';
import useCustomEvent from '../../utils/useCustomEvent';
import Skeleton from "../Skeleton";


const LoadingTable = () => {
    const columns = new Array(4).fill({}).map((item, i) => ({ accessor: `${i}` }));
    const data = new Array(4).fill({});

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    return (
      <App>
        <Styles>
          <div {...getTableProps()} className="table">
            <div>
              {headerGroups.map((headerGroup) => (
                <div key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} className="tr header">
                  {headerGroup.headers.map((column) => (
                    <div key={column.id} {...column.getHeaderProps()} className="th">
                      <Skeleton height={16} />

                    </div>
                                ))}
                </div>
                        ))}
            </div>

            <div {...getTableBodyProps()}>
              {rows.map(
                            (row) => {
                                prepareRow(row);
                                return (
                                  <div key={row.id} {...row.getRowProps()} className="tr">
                                    {row.cells.map((cell) => (
                                      <div key={cell.value} {...cell.getCellProps()} className="td">
                                        <Skeleton height={16} />

                                      </div>
                                        ))}
                                  </div>
                                )
                            },
                        )}
            </div>
          </div>
        </Styles>
      </App>
    )
}

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


    if (!dataState || !columnsState) return <LoadingTable />

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
          <div ref={componentRef} {...getTableProps()} className="table">
            <div>
              {headerGroups.map((headerGroup) => (
                <div key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} className="tr header">
                  {headerGroup.headers.map((column) => (
                    <div key={column.id} {...column.getHeaderProps()} className="th">
                      {column.render('Header')}

                    </div>
                                ))}
                </div>
                        ))}
            </div>

            <div {...getTableBodyProps()}>
              {rows.map(
                            (row, i) => {
                                prepareRow(row);
                                return (
                                  <div onClick={() => dispatchEvent(row.values)} key={row.id} {...row.getRowProps()} className="tr">
                                    {row.cells.map((cell) => (
                                      <div key={cell.value} {...cell.getCellProps()} className="td">
                                        {cell.render('Cell')}

                                      </div>
                                            ))}
                                  </div>
                                )
                            },
                        )}
            </div>
          </div>
        </Styles>
      </App>
    )
    }


const Styles = styled("div")`
  .table {
    font-size: 14px;
    background: ${(props) => props.theme.colors.$D80};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    overflow: hidden;

    .tr.header {
      background: ${(props) => props.theme.colors.$B40};
      height: 42px;
      &:hover {
        background: ${(props) => props.theme.colors.$B40};
        cursor: default;
      }
    }

    .tr {
      height: 54px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.$D60};

      &:hover {
        background: ${(props) => props.theme.colors.$B50};
        cursor: pointer;
        transition: all 120ms ease;
      }

      .th,
      .td {
        display: block;
        flex: 1;
        text-align: left;
        overflow-x: hidden;
        text-overflow: ellipsis;
        padding: 0 30px 0 0;
        align-items: center;
      }

      .th:first-child,
      .td:first-child {
        padding: 0 0 0 30px;
      }
    }
  }
`;

register(Table, 'x-table', ['columns', 'data']);

export default Table;
