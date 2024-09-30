'use client'

import React, { useState } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Checkbox,
  Grid,
  GridItem,
  Button,
  Flex,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  category: 'myDay' | 'important' | 'planned' | 'tasks';
  dueDate?: string;
}

interface PlannedProps {
  tasks: Task[];
}

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function Planned({ tasks }: PlannedProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const bg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const tasksForSelectedDate = tasks.filter(
    task => task.dueDate && new Date(task.dueDate).toDateString() === selectedDate.toDateString()
  )

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<GridItem key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const hasTask = tasks.some(task => task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString());

      days.push(
        <GridItem key={day}>
          <Button
            onClick={() => setSelectedDate(date)}
            variant={isSelected ? 'solid' : 'ghost'}
            colorScheme={hasTask ? 'blue' : undefined}
            w="100%"
          >
            {day}
          </Button>
        </GridItem>
      );
    }

    return days;
  }

  const changeMonth = (increment: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + increment, 1));
  }

  return (
    <Grid templateColumns="1fr 300px" gap={4}>
      <GridItem>
        <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <Heading mb={4}>Planeado</Heading>
          <Flex justify="space-between" align="center" mb={4}>
            <Button onClick={() => changeMonth(-1)} leftIcon={<ChevronLeftIcon />}>Anterior</Button>
            <Heading size="md">{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</Heading>
            <Button onClick={() => changeMonth(1)} rightIcon={<ChevronRightIcon />}>Siguiente</Button>
          </Flex>
          <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={4}>
            {daysOfWeek.map(day => (
              <GridItem key={day} textAlign="center">
                <Text fontWeight="bold">{day}</Text>
              </GridItem>
            ))}
            {renderCalendar()}
          </Grid>
          <VStack align="stretch" spacing={2} mt={4}>
            {tasksForSelectedDate.map((task) => (
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
      </GridItem>
      <GridItem>
        <Box bg={bg} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
          <Heading size="md" mb={4}>Otros meses</Heading>
          <VStack align="stretch" spacing={2} maxHeight="500px" overflowY="auto">
            {[...Array(12)].map((_, i) => {
              const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + i - 5, 1);
              return (
                <Button key={i} onClick={() => setSelectedDate(date)} variant="outline">
                  {monthNames[date.getMonth()]} {date.getFullYear()}
                </Button>
              );
            })}
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  )
}

// Comentarios en español:
// Este componente representa la sección "Planeado".
// Muestra un calendario personalizado para el mes actual y permite seleccionar fechas.
// Las tareas planeadas se muestran para la fecha seleccionada.
// Incluye una barra lateral con botones para otros meses para facilitar la navegación.
// Se implementó un calendario personalizado en lugar de usar una biblioteca externa.