'use client'

import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react'

interface Task {
  id: string;
  text: string;
  completed: boolean;
  list?: string;
}

interface TasksProps {
  tasks: Task[];
}

export default function Tasks({ tasks }: TasksProps) {
  const bg = useColorModeValue('white', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.600')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box>
      <Heading mb={4}>Tareas</Heading>
      <VStack align="stretch" spacing={2}>
        {tasks.map((task) => (
          <Box
            key={task.id}
            p={2}
            bg={bg}
            borderRadius="md"
            borderWidth={1}
            borderColor={borderColor}
            _hover={{ bg: hoverBg }}
            transition="background-color 0.2s"
          >
            <Checkbox isChecked={task.completed}>
              <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
            </Checkbox>
            {task.list && (
              <Text fontSize="sm" color="gray.500" ml={6}>
                {task.list}
              </Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

// Comentarios en español:
// Este componente representa la sección "Tareas".
// Muestra todas las tareas del usuario, incluyendo la lista a la que pertenecen.
// Cada tarea tiene un efecto hover y puede marcarse como completada.