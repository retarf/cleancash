


function ChildList () {

    const listTitle = "Children";

    // ARGS: { title: string, createElement: func, deleteElement: func, columns: array(string), elements: array(object) }
    return <List title={ listTitle } columns={columns} elements={elements} addElement={addChild} />;
}