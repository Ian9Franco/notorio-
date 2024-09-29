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
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface MyDayProps {
  tasks: Task[];
}

export default function MyDay({ tasks }: MyDayProps) {
  const [newTask, setNewTask] = useState('')
  const bg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleAddTask = () => {
    // Implement task addition logic here
    console.log('Adding task:', newTask)
  }

  const todayTasks = tasks.filter(() => {
    // Implement logic to determine if a task is for today
    return true // Placeholder
  })

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
          {todayTasks.map((task) => (
            <Box key={task.id} p={2} bg={bg} borderRadius="md" borderWidth={1} borderColor={borderColor}>
              <Checkbox isChecked={task.completed}>
                <Text as={task.completed ? 's' : 'span'}>{task.text}</Text>
              </Checkbox>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box w="300px" bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
        <Heading size="md" mb={4}>Sugerencias</Heading>
        <VStack align="stretch" spacing={2}>
          {/* Add suggestion items here */}
          <Text>Sugerencia 1</Text>
          <Text>Sugerencia 2</Text>
        </VStack>
      </Box>
    </Flex>
  )
}