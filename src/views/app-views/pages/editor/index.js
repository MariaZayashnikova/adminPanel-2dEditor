import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Image, Button, message } from 'antd';
import imageRedChairs from 'assets/img/redChairs.png';
import imagefourChairs from 'assets/img/fourChairs.png';
import imagethreeChairs from 'assets/img/threeChairs.png';
import imagewhiteChairs from 'assets/img/whiteChairs.png';
import imagewhiteTableChairs from 'assets/img/whiteTableChairs.png';
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

    let fileInput = React.createRef();
    const downloadAsFile = (data) => {
        let a = document.createElement("a");
        let file = new Blob([data], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = "savedTable.txt";
        a.click();
        message.success({ content: "Data saved successfully", duration: 2 });
    }

    const saveEditor = () => {
        let mydata = JSON.stringify(editor);
        downloadAsFile(mydata);
    }

    const importEditor = () => {
        let file = fileInput.current.files[0];
        let messageError = 'Недопустимый формат файла. Пожалуйста, выберите файл, который вы сохранили в этом редакторе';

        if (file.type === 'text/plain') {
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                let res;
                try {
                    res = JSON.parse(reader.result);

                    if (!Array.isArray(res)) {
                        message.error({ content: messageError, duration: 2 });
                        return;
                    }

                    let data = ['title', 'id', 'dropp', 'img'];
                    let checkResult = res.every(resItem => data.every(dataItem => dataItem in resItem));
                    if (checkResult) setEditor(res);
                    else message.error({ content: messageError, duration: 2 });
                    // проверка на тип данных?
                }
                catch {
                    message.error({ content: messageError, duration: 2 });
                }
            };
            reader.onerror = function () {
                message.error({ content: reader.error, duration: 2 });
            };
        } else message.error({ content: messageError, duration: 2 });
    }

    const createGrid = () => {
        let resultGrid = [];
        for (let i = 2; i < 134; i++) {
            resultGrid.push(`droppable-${i}`)
        }
        setGrid(resultGrid);
    }

    if (grid.length === 0) createGrid();

    const handleDrag = res => {
        if (res.source.droppableId === 'droppable-1') {
            tables.forEach(elem => {
                if (elem.id === res.draggableId) {
                    let arr = editor;
                    let obj = Object.assign({}, elem)
                    obj.dropp = res.destination.droppableId;
                    obj.id = Math.round(Math.random() * 100).toString();
                    arr.push(obj);
                    setEditor(arr);
                }
            });
        } else if (res.destination.droppableId === 'droppable-1') {
            let newStateEditor = editor.filter(item => item.id !== res.draggableId);
            setEditor(newStateEditor);
        } else {
            editor.forEach(elem => {
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

    return (
        <DragDropContext onDragEnd={result => handleDrag(result)}>
            <div className='container-editor'>
                <div className="editor-start">
                    <Droppable droppableId="droppable-1" >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ display: 'flex', flexWrap: 'wrap', height: '100%', alignItems: 'flex-start', alignContent: 'flex-start' }}
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
                    <div className='container-editor margin-bottom' >
                        <Button type="primary" onClick={() => saveEditor()}>Save</Button>
                        <input type="file" ref={fileInput} onChange={importEditor} />
                    </div>
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
                                                                        className="container-table backgroundColor-black"
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