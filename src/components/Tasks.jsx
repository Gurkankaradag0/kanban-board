import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import AddTask from './AddTask'

const Tasks = ({ board }) => {
    return (
        <Droppable droppableId={board._id}>
            {(provided) => (
                <div
                    className='max-h-full flex-1 flex flex-col gap-y-2 overflow-auto scroller'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {board.tasks.map((task, index) => (
                        <Task
                            key={task._id}
                            task={task}
                            index={index}
                            board={board}
                        />
                    ))}
                    {provided.placeholder}
                    <AddTask board={board} />
                </div>
            )}
        </Droppable>
    )
}

export default Tasks
