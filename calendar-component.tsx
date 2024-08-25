import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ColorPicker } from './ColorPicker';
import { TodoItem } from './TodoItem';
import axios from 'axios';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState({});

  useEffect(() => {
    fetchTodos();
  }, [currentDate]);

  const fetchTodos = async () => {
    const startDate = startOfWeek(currentDate);
    const endDate = addDays(startDate, 6);
    const response = await axios.get(`/api/todos?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
    setTodos(response.data);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const sourceDate = source.droppableId;
    const destDate = destination.droppableId;

    const updatedTodos = { ...todos };
    const [removed] = updatedTodos[sourceDate].splice(source.index, 1);
    updatedTodos[destDate].splice(destination.index, 0, removed);

    setTodos(updatedTodos);

    await axios.put(`/api/todos/${draggableId}`, { date: destDate });
  };

  const renderWeek = () => {
    const startDate = startOfWeek(currentDate);
    const week = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      const dateString = format(date, 'yyyy-MM-dd');
      week.push(
        <div key={dateString} className="day-column">
          <h3>{format(date, 'dd.MM')}</h3>
          <h4>{format(date, 'EEE')}</h4>
          <Droppable droppableId={dateString}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todos[dateString]?.map((todo, index) => (
                  <Draggable key={todo._id} draggableId={todo._id} index={index}>
                    {(provided) => (
                      <TodoItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        todo={todo}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      );
    }

    return week;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="calendar">
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <div className="week-container">{renderWeek()}</div>
      </div>
    </DragDropContext>
  );
};

export default Calendar;
