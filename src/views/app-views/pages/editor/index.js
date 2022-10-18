import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Image, Button, message } from 'antd';
import imageRedChairs from 'assets/img/redChairs.png';
import imagefourChairs from 'assets/img/fourChairs.png';
import imagethreeChairs from 'assets/img/threeChairs.png';
import imagewhiteChairs from 'assets/img/whiteChairs.png';
import imagewhiteTableChairs from 'assets/img/whiteTableChairs.png';
import fs from 'browserify-fs';
import './editor.css';


function Editor() {
    const [tables, setTables] = useState([
        { title: 'стол на 10 мест', id: '1', dropp: 'droppable-1', img: imageRedChairs },
        { title: 'стол на 4 места, коричневый', id: '2', dropp: 'droppable-1', img: imagefourChairs },
        { title: 'стол на 3 места', id: '3', dropp: 'droppable-1', img: imagethreeChairs },
        { title: 'стол на 6 мест', id: '4', dropp: 'droppable-1', img: imagewhiteChairs },
        { title: 'стол на 4 места, белый', id: '5', dropp: 'droppable-1', img: imagewhiteTableChairs }
    ]);

    const [grid, setGrid] = useState([]);
    const [editor, setEditor] = useState([]);


    const downloadAsFile = (data) => {
        let a = document.createElement("a");
        let file = new Blob([data], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = "savedTable.txt";
        a.click();
    }

    const saveEditor = async () => {
        let mydata = await JSON.stringify(editor);
        downloadAsFile(mydata);
        /* fs.writeFile("./editor.json", mydata, function () {
            message.success({ content: "Data saved successfully", duration: 2 });
        }); */
    }

    const importEditor = async () => {
        fs.readFile("./editor.json", 'utf-8', async function (error, data) {
            let res = await JSON.parse(data);
            setEditor(res);
        });
    }

    const createGrid = () => {
        let arrResult = [];
        for (let i = 2; i < 51; i++) {
            arrResult.push(`droppable-${i}`)
        }
        setGrid(arrResult);
    }

    if (grid.length === 0) createGrid();

    const handleDrag = res => {
        console.log(res)
        let newState;
        if (res.source.droppableId === 'droppable-1') {
            newState = tables;
            newState.forEach(elem => {
                if (elem.id === res.draggableId) {
                    let arr = editor;
                    let obj = Object.assign({}, elem)
                    obj.dropp = res.destination.droppableId;
                    obj.id = Math.round(Math.random() * 100).toString();
                    arr.push(obj);
                    setEditor(arr);
                }
            });
        } else {
            newState = editor;
            newState.forEach(elem => {
                if (elem.id === res.draggableId) {
                    let arr = editor.filter(item => item.id !== elem.id);
                    let obj = Object.assign({}, elem)
                    obj.dropp = res.destination.droppableId;
                    arr.push(obj);
                    setEditor(arr);
                }
            });
        }
    }

    console.log(tables);
    console.log(editor);

    return (
        <DragDropContext onDragEnd={result => handleDrag(result)}>
            <div className='container-editor'>
                <div className="editor-start">
                    <Droppable droppableId="droppable-1" >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ display: 'flex', flexWrap: 'wrap', height: '100%' }}
                            >
                                {provided.placeholder}
                                {tables.map((elem, index) => {
                                    return (
                                        <Draggable draggableId={elem.id} index={Number(elem.id)} key={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="container-table"
                                                >
                                                    <Image src={elem.img} alt="tables" width="60px" height="60px" preview={false} />
                                                    <div>{elem.title}</div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            </div>
                        )}
                    </Droppable>
                </div>
                < div className="editor-end">
                    <h4>Карта заведения</h4>
                    <Button type="primary" onClick={() => saveEditor()}>Save</Button>
                    <Button type="primary" onClick={() => importEditor()}>import</Button>
                    <input type="file"></input>
                    <div className='grid-container'>
                        {grid.map((elemGrid, indexGrid) => {
                            return (
                                <div className='grid-element' key={indexGrid}>
                                    <Droppable droppableId={elemGrid} >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {provided.placeholder}
                                                {editor.map((elem, index) => {
                                                    if (elem.dropp === elemGrid) {
                                                        return (
                                                            <Draggable draggableId={elem.id} index={index} key={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="container-table"
                                                                    >
                                                                        <Image src={elem.img} alt="tables" width="60px" height="60px" preview={false} />
                                                                        <div>{elem.title}</div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </DragDropContext >
    )
}

export default Editor