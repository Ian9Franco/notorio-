'use client'

import React, { useState } from 'react'
import {
  Box,
  Flex,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  useColorModeValue,
  Checkbox,
  HStack,
} from '@chakra-ui/react'
import { AddIcon, StarIcon, CalendarIcon } from '@chakra-ui/icons'

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  category: 'myDay' | 'important' | 'planned' | 'tasks';
}

interface MyDayProps {
  tasks: Task[];
}

export default function MyDay({ tasks }: MyDayProps) {
  const [newTask, setNewTask] = useState('')
  const bg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleAddTask = () => {
    // Implementar lógica para agregar tarea
    console.log('Agregando tarea:', newTask)
  }

  const handleExtendTask = (taskId: string, category: 'important' | 'planned') => {
    // Implementar lógica para extender tarea
    console.log(`Extendiendo tarea ${taskId} a ${category}`)
  }

  return (
    <Flex>
      <Box flex={1} pr={4}>
        <Heading mb={4}>Mi día</Heading>
        <Flex mb={4}>
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Agregar una tarea"
            mr={2}
          />
          <Button onClick={handleAddTask} leftIcon={<AddIcon />}>
            Agregar
          </Button>
        </Flex>
        <VStack align="stretch" spacing={2}>
          {tasks.map((task) => (
            <Box key={task.id} p={2} bg={bg} borderRadius="md" borderWidth={1} borderColor={borderColor}>
              <Flex justify="space-between" align="center">
                <Checkbox isChecked={task.completed}>
                  <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
                </Checkbox>
                <HStack>
                  <Button size="sm" onClick={() => handleExtendTask(task.id, 'important')}>
                    <StarIcon />
                  </Button>
                  <Button size="sm" onClick={() => handleExtendTask(task.id, 'planned')}>
                    <CalendarIcon />
                  </Button>
                </HStack>
              </Flex>
              <Text fontSize="xs" color="gray.500" mt={1}>
                Creada el: {new Date(task.createdAt).toLocaleString()}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box w="300px" bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
        <Heading size="md" mb={4}>Sugerencias</Heading>
        <VStack align="stretch" spacing={2}>
          {tasks.filter(task => task.category === 'important').map((task) => (
            <Text key={task.id}>{task.text}</Text>
          ))}
        </VStack>
      </Box>
    </Flex>
  )
}

// Comentarios en español:
// Este componente representa la sección "Mi día".
// Muestra las tareas del día actual y permite agregar nuevas tareas.
// Cada tarea puede ser marcada como completada, importante o planeada.
// Incluye un panel de sugerencias que muestra las tareas importantes.
// La fecha de creación se muestra para cada tarea.