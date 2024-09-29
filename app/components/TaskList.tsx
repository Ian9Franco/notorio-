import { VStack, Checkbox, Text, IconButton, Flex } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <VStack align="stretch" spacing={2}>
      {tasks.map((task) => (
        <Flex key={task.id} justify="space-between" align="center">
          <Checkbox 
            isChecked={task.completed} 
            onChange={() => toggleTask(task.id)}
          >
            <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
          </Checkbox>
          <IconButton
            aria-label="Eliminar tarea"
            icon={<DeleteIcon />}
            onClick={() => deleteTask(task.id)}
            size="sm"
          />
        </Flex>
      ))}
    </VStack>
  )
}

// Comentarios en español:
// Hemos añadido tipos para las props y la interfaz Task para resolver los errores de TypeScript.
// La interfaz TaskListProps define los tipos para las props tasks y setTasks.
// Ahora todas las funciones y parámetros están correctamente tipados.
// Este componente muestra la lista de tareas.
// Cada tarea tiene un checkbox para marcarla como completada y un botón para eliminarla.
// La función toggleTask cambia el estado de completado de una tarea.
// La función deleteTask elimina una tarea de la lista.
// Utilizamos Chakra UI para crear un diseño atractivo y consistente.