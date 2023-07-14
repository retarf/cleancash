export const TableRowList = ({itemList, columns, query, editable = false, onClick = false}) => {
    return <>
        {console.log(columns)}
        {itemList.map((item) => (
            <TableRow key={`row-${item.id}`}>
                {console.log(item)}
                {columns.map(column =>
                    column &&
                    <>
                        {editable ?
                            <EditableTableCell
                                key={`cell-${item.id}-${column}`}
                                id={`cell-${item.id}-${column}`}
                                name={item[column.toLowerCase()]}
                                defaultValue={item[column.toLowerCase()]}
                                query={query}
                            />
                            :
                            <TableCell key={`cell-${item.id}-${column}`}
                                       onClick={() => onClick(item.id)}>{item[column.toLowerCase()]}</TableCell>
                        }
                    </>
                )}
                <TableCell key="separator"></TableCell>
                <DeleteCell id={item.id} query={query}/>
            </TableRow>
        ))
        }
    </>
}
