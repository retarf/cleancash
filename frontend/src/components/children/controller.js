import React, { useState, useEffect } from 'react';
import useModel from './model';
import List from '../list';



function ChildList () {

    const listTitle = "Children";
    const model = useModel();

    const [ elementList, setElementList ] = useState([])

    useEffect(() =>{
        setElementList(model.request.list);
    }, []);

    const addChild = () => { console.log(elementList)};

    console.log(elementList);

    // ARGS: { title: string, createElement: func, deleteElement: func, columns: array(string), elements: array(object) }
    return <List title={ listTitle } columns={ model.columns } elements={ elementList } addElement={addChild} />;
}

export { ChildList };
