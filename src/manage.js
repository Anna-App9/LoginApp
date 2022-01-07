import React, {useState} from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import './App.css'
import {v4} from 'uuid';
import _ from 'lodash';


const item ={
    id: v4(),
    name: "Tasks"
}
const item1 ={
    id:v4(),
    name: "Tasks1"
}
console.log(item.id);

export default function Manage(){

    const [text, setText]= useState("");
    

    const [state, setState] = useState({
        "todo":{
            title : "ToDo",
            items :[item, item1],
            status: "todo"
        },
        "in-progress":{
            title : " In-Progress",
            items:[],
            status: "inprogress"
        },
        "completed":{
            title: "Completed",
            items:[],
            status: "completed"
        }

    });
    const addTask = () => {
        setState(prev => {
          return {
            ...prev,                                    
            todo: {
              title: "ToDo",
              items: [
                {
                  id: v4(),
                  name: text
                },
                ...prev.todo.items
              ],
              status :"todo"
            }

        //     prev(Objecy.key.items = [
        //         {
        //           id: v4(),
        //           name: text
        //         },
        //         ...prev.todo.items
        //       ],
          }
        })
    
        setText("")
      }



    const handleDragEnd = ({destination, source})=>{
        console.log("from", source)
        console.log("to", destination)
       if(!destination){
           return;
       }
       if (destination === source.index && destination.droppableId === source.droppableId){
           return;

       }
    //      if (destination === source.index && destination.droppableId === source.droppableId){
    //        return;

    //    }


    //    if(destination === source.index)
       //create copy of item before moving it to another state
       const itemCopy ={...state[source.droppableId].items[source.index]}
       console.log(itemCopy);
       setState(prev=>{
           prev = {...prev}
           prev[source.droppableId].items.splice(source.index, 1);
           prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);
           return prev;
       })

    }



    return(
        <div >
        <p className='lead' >Welcome to your Task management</p>
        <button type="button" className="btn btn-secondary">Create Task</button>
        <Link to={'/welcome'} className="nav-link">Back</Link>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={addTask}>Add</button>
        <div className="Manage">
          
        <DragDropContext onDragEnd={handleDragEnd}>
            { _.map(state, (data, key) => {
                return (
                    <div className={"column"}>
                        <h3>{data.title}</h3>
                    <Droppable droppableId={key}>
                        {(provided)=>{
                            return(
                               <div
                                 ref= {provided.innerRef}
                                 {...provided.droppableProps}
                                 className={"droppable-col"}>
                                     {data.items.map((el, index) =>{
                                         return(
                                             <Draggable key={el.id} index={index} draggableId={el.id}>
                                                 {(provided, snapshot)=>{
                                                     return(
                                                         <div

                                                         className={`item ${snapshot.isDragging && "dragging"} 
                                                         ${data.status=="todo" ? "toDo": 
                                                           data.status=="inprogress"? "inPro":
                                                           data.status=="completed"? "completed" : ""}`}

                                                         ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         >
                                                             {el.name}
                                                         </div>
                                                     )

                                                 }}
                                             </Draggable>
                                         )
                                     }
                                     )}


                                 </div>
                            )

                        }}
                    </Droppable>
                    </div>
                )

            })}

        </DragDropContext>
        </div>
        </div>


    )


    
}

