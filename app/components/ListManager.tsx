'use client'

import React, { useState, useEffect } from 'react'
import {
  VStack,
  HStack,
  Box,
  Input,
  Button,
  Text,
  Image,
  useColorModeValue,
  IconButton,
  Textarea,
} from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { auth, db, storage } from '../db/firebase'
import { ref, onValue, push, update, remove } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

interface ListItem {
  id: string
  content: string
  completed: boolean
  imageUrl?: string
}

interface List {
  id: string
  title: string
  items: ListItem[]
}

export default function ListManager() {
  const [lists, setLists] = useState<List[]>([])
  const [newListTitle, setNewListTitle] = useState('')
  const [editingListId, setEditingListId] = useState<string | null>(null)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [newItemContent, setNewItemContent] = useState('')

  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      const listsRef = ref(db, `users/${user.uid}/lists`)
      onValue(listsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const loadedLists = Object.entries(data).map(([id, list]: [string, any]) => ({
            id,
            ...list,
            items: list.items ? Object.entries(list.items).map(([itemId, item]: [string, any]) => ({
              id: itemId,
              ...item,
            })) : [],
          }))
          setLists(loadedLists)
        } else {
          setLists([])
        }
      })
    }
  }, [])

  const addList = () => {
    const user = auth.currentUser
    if (user && newListTitle.trim()) {
      const listsRef = ref(db, `users/${user.uid}/lists`)
      push(listsRef, { title: newListTitle.trim(), items: {} })
      setNewListTitle('')
    }
  }

  const updateListTitle = (listId: string, newTitle: string) => {
    const user = auth.currentUser
    if (user) {
      const listRef = ref(db, `users/${user.uid}/lists/${listId}`)
      update(listRef, { title: newTitle })
    }
  }

  const addItem = (listId: string) => {
    const user = auth.currentUser
    if (user && newItemContent.trim()) {
      const itemsRef = ref(db, `users/${user.uid}/lists/${listId}/items`)
      push(itemsRef, { content: newItemContent.trim(), completed: false })
      setNewItemContent('')
    }
  }

  const updateItem = (listId: string, itemId: string, updates: Partial<ListItem>) => {
    const user = auth.currentUser
    if (user) {
      const itemRef = ref(db, `users/${user.uid}/lists/${listId}/items/${itemId}`)
      update(itemRef, updates)
    }
  }

  const deleteItem = (listId: string, itemId: string) => {
    const user = auth.currentUser
    if (user) {
      const itemRef = ref(db, `users/${user.uid}/lists/${listId}/items/${itemId}`)
      remove(itemRef)
    }
  }

  const handleImageUpload = async (listId: string, itemId: string, file: File) => {
    const user = auth.currentUser
    if (user) {
      const imageRef = storageRef(storage, `users/${user.uid}/images/${file.name}`)
      await uploadBytes(imageRef, file)
      const downloadURL = await getDownloadURL(imageRef)
      updateItem(listId, itemId, { imageUrl: downloadURL })
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Input
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="Nueva lista"
        />
        <Button onClick={addList} leftIcon={<AddIcon />}>
          Agregar lista
        </Button>
      </HStack>
      {lists.map((list) => (
        <Box key={list.id} bg={bgColor} p={4} borderRadius="md" borderColor={borderColor} borderWidth={1}>
          {editingListId === list.id ? (
            <Input
              value={list.title}
              onChange={(e) => updateListTitle(list.id, e.target.value)}
              onBlur={() => setEditingListId(null)}
              autoFocus
            />
          ) : (
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">{list.title}</Text>
              <IconButton
                aria-label="Edit list title"
                icon={<EditIcon />}
                size="sm"
                onClick={() => setEditingListId(list.id)}
              />
            </HStack>
          )}
          <VStack align="stretch" mt={4} spacing={2}>
            {list.items.map((item) => (
              <Box key={item.id} p={2} bg={useColorModeValue('gray.50', 'gray.600')} borderRadius="md">
                {editingItemId === item.id ? (
                  <VStack align="stretch">
                    <Textarea
                      value={item.content}
                      onChange={(e) => updateItem(list.id, item.id, { content: e.target.value })}
                      onBlur={() => setEditingItemId(null)}
                      autoFocus
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(list.id, item.id, file)
                      }}
                    />
                  </VStack>
                ) : (
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text as={item.completed ? 's' : 'span'}>{item.content}</Text>
                      {item.imageUrl && (
                        <Image src={item.imageUrl} alt="Item image" maxH="100px" objectFit="cover" />
                      )}
                    </VStack>
                    <HStack>
                      <IconButton
                        aria-label="Edit item"
                        icon={<EditIcon />}
                        size="sm"
                        onClick={() => setEditingItemId(item.id)}
                      />
                      <IconButton
                        aria-label="Delete item"
                        icon={<DeleteIcon />}
                        size="sm"
                        onClick={() => deleteItem(list.id, item.id)}
                      />
                    </HStack>
                  </HStack>
                )}
              </Box>
            ))}
          </VStack>
          <HStack mt={4}>
            <Input
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              placeholder="Nuevo item"
            />
            <Button onClick={() => addItem(list.id)} leftIcon={<AddIcon />}>
              Agregar
            </Button>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}