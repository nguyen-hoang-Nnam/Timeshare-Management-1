import { Table, Empty, ConfigProvider } from "antd"
import { TableCustomStyled } from "./styled"
import modeStyle from "./modeStyle"
import { Resizable } from "react-resizable"
import ReactDragListView from "react-drag-listview"
import { useState } from "react"

const ResizableTitle = props => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

function TableCustom(props) {
  const {
    mode = "isPrimary",
    styleMode = {},
    columns,
    isResizeColumn = false,
    ...rest
  } = props
  const [columnsCustom, setColumnsCustom] = useState(
    columns.map(i => ({
      ...i,
      title: <span className="dragHandler">{i.title}</span>,
    })),
  )
  const dragProps = isResizeColumn
    ? {
        onDragEnd(fromIndex, toIndex) {
          const newColumns = [...columnsCustom]
          const item = newColumns.splice(fromIndex, 1)[0]
          newColumns.splice(toIndex, 0, item)
          setColumnsCustom(newColumns)
        },
        nodeSelector: "th",
        handleSelector: ".dragHandler",
        ignoreSelector: "react-resizable-handle",
      }
    : {}

  const components = isResizeColumn
    ? {
        header: {
          cell: ResizableTitle,
        },
      }
    : {}

  const handleResize =
    index =>
    (e, { size }) => {
      const newColumns = [...columnsCustom]
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      }
      setColumnsCustom(newColumns)
    }

  const resizedColumns = columnsCustom.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }))

  return (
    <TableCustomStyled className={`${isResizeColumn ? "resize-able" : ""}`}>
      <ConfigProvider
        theme={{
          token: {},
          components: {
            Table: {
              ...modeStyle[mode],
              ...styleMode,
            },
          },
        }}
      >
        <ReactDragListView.DragColumn {...dragProps}>
          <Table
            bordered
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={props?.textEmpty}
                />
              ),
            }}
            scroll={props?.dataSource ? { x: "100%" } : {}}
            {...rest}
            components={components}
            columns={isResizeColumn ? resizedColumns : columns}
          />
        </ReactDragListView.DragColumn>
      </ConfigProvider>
    </TableCustomStyled>
  )
}

export default TableCustom

export const SELECTION_COLUMN = Table.SELECTION_COLUMN
