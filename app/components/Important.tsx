'use client'

import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Checkbox,
} from '@chakra-ui/react'

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  category: 'myDay' | 'important' | 'planned' | 'tasks';
}

interface ImportantProps {
  tasks: Task[];
}

export default function Important({ tasks }: ImportantProps) {
  const bg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box>
      <Heading mb={4}>Importante</Heading>
      <VStack align="stretch" spacing={2}>
        {tasks.map((task) => (
          <Box key={task.id} p={2} bg={bg} borderRadius="md" borderWidth={1} borderColor={borderColor}>
            <Checkbox isChecked={task.completed}>
              <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
            </Checkbox>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Creada el: {new Date(task.createdAt).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

// Comentarios en español:
// Este componente representa la sección "Importante".
// Muestra una lista de tareas marcadas como importantes.
// Cada tarea puede ser marcada como completada.
// Se muestra la fecha de creación para cada tarea.