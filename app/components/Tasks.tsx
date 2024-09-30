'use client'

import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Checkbox,
  useColorModeValue,
  Flex,
  Button,
} from '@chakra-ui/react'
import { StarIcon, CalendarIcon } from '@chakra-ui/icons'

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  category: 'myDay' | 'important' | 'planned' | 'tasks';
}

interface TasksProps {
  tasks: Task[];
}

export default function Tasks({ tasks }: TasksProps) {
  const bg = useColorModeValue('white', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.600')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleMarkImportant = (taskId: string) => {
    // Implementar lógica para marcar como importante
    console.log(`Marcando tarea ${taskId} como importante`)
  }

  const handleMarkPlanned = (taskId: string) => {
    // Implementar lógica para marcar como planeada
    console.log(`Marcando tarea ${taskId} como planeada`)
  }

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
            <Flex justify="space-between" align="center">
              <Checkbox isChecked={task.completed}>
                <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
              </Checkbox>
              <Flex>
                <Button size="sm" onClick={() => handleMarkImportant(task.id)} mr={2}>
                  <StarIcon color={task.category === 'important' ? 'yellow.500' : 'gray.500'} />
                </Button>
                <Button size="sm" onClick={() => handleMarkPlanned(task.id)}>
                  <CalendarIcon color={task.category === 'planned' ? 'blue.500' : 'gray.500'} />
                </Button>
              </Flex>
            </Flex>
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
// Este componente representa la sección "Tareas".
// Muestra todas las tareas del usuario, independientemente de su categoría.
// Cada tarea puede ser marcada como completada, importante o planeada.
// Se aplica un efecto hover a cada tarea para mejorar la interactividad.
// Se muestra la fecha de creación para cada tarea.