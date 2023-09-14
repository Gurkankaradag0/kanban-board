import { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { deleteTask, editTask } from '@/store/actions/board'
import { invertColor } from '@/utils/helpers'
import { Trash } from 'lucide-react'
import Textarea from './Textarea'
import { useCookies } from 'react-cookie'
import { deleteUserTask, editUserTask } from '@/services/api'

const Task = ({ task, index, board }) => {
    const [taskTitle, setTaskTitle] = useState(task.task)
    const [disabled, setDisabled] = useState(true)
    const [cookies] = useCookies(['access_token'])

    const editTaskTitle = async () => {
        const response = await editUserTask(board._id, task._id, { task: task.task }, cookies.access_token)
        if (response?.error) return editTask(board._id, task._id, taskTitle)
        setTaskTitle(task.task)
    }

    const delTask = async (index) => {
        const response = await deleteUserTask(board._id, task._id, cookies.access_token)
        if (!response?.error) deleteTask(board._id, index)
    }

    useEffect(() => {
        disabled && editTaskTitle()
    }, [disabled])

    return (
        <Draggable
            draggableId={task._id}
            index={index}
        >
            {(provided) => (
                <section
                    className='rounded-md relative group shadow-small'
                    onDoubleClick={() => setDisabled(false)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Textarea
                        value={task.task}
                        disabled={disabled}
                        className='disabled:pointer-events-none disabled:border-none p-4 border border-white w-full text-sm outline-none resize-none rounded-md '
                        onChange={(e) => editTask(board._id, task._id, e.target.value)}
                        style={{
                            backgroundColor: board.color,
                            color: invertColor(board.color, true),
                            borderColor: invertColor(board.color)
                        }}
                        onBlur={() => setDisabled(true)}
                        onKeyDown={({ key }) => key === 'Escape' && setDisabled(true)}
                    />

                    <div className='absolute opacity-0 group-hover:opacity-100 top-2 right-2 z-10'>
                        <button
                            onClick={() => delTask(index)}
                            className='w-8 h-8 flex items-center justify-center text-red-600 shadow opacity-0 transition-all group-hover:opacity-100 border border-light rounded-md z-[1] bg-white'
                        >
                            <Trash size={20} />
                        </button>
                    </div>
                </section>
            )}
        </Draggable>
    )
}

export default Task
