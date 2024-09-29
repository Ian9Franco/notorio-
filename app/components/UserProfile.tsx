'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ref, get, set } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '../db/firebase'
import { Avatar, Text, VStack, Input, useToast, Spinner } from '@chakra-ui/react'

export default function UserProfile() {
  const [username, setUsername] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        const userRef = ref(db, `users/${user.uid}`)
        try {
          const snapshot = await get(userRef)
          if (snapshot.exists()) {
            const userData = snapshot.val()
            setUsername(userData.username || '')
            setProfileImage(userData.profileImage || '')
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          toast({
            title: 'Error al cargar datos del usuario',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }
    }
    fetchUserData()
  }, [toast])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const user = auth.currentUser
      if (user) {
        setIsLoading(true)
        try {
          const imageRef = storageRef(storage, `users/${user.uid}/profileImage`)
          await uploadBytes(imageRef, file)
          const downloadURL = await getDownloadURL(imageRef)
          await set(ref(db, `users/${user.uid}/profileImage`), downloadURL)
          setProfileImage(downloadURL)
          toast({
            title: 'Imagen de perfil actualizada',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        } catch (error) {
          console.error('Error uploading profile image:', error)
          toast({
            title: 'Error al actualizar la imagen de perfil',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  const handleUsernameChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newUsername = e.target.value
    const user = auth.currentUser
    if (user && newUsername !== username) {
      setIsLoading(true)
      try {
        await set(ref(db, `users/${user.uid}/username`), newUsername)
        setUsername(newUsername)
        toast({
          title: 'Nombre de usuario actualizado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        console.error('Error updating username:', error)
        toast({
          title: 'Error al actualizar el nombre de usuario',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    }
    setIsEditingUsername(false)
  }

  return (
    <VStack spacing={2} align="center">
      {isLoading && <Spinner size="sm" />}
      <Avatar
        size="md"
        src={profileImage}
        cursor="pointer"
        onClick={handleImageClick}
        aria-label="Cambiar imagen de perfil"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
        aria-hidden="true"
      />
      {isEditingUsername ? (
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleUsernameChange}
          size="sm"
          width="150px"
          aria-label="Editar nombre de usuario"
        />
      ) : (
        <Text
          fontSize="sm"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => setIsEditingUsername(true)}
          aria-label="Haz clic para editar el nombre de usuario"
        >
          {username || 'Establecer nombre de usuario'}
        </Text>
      )}
    </VStack>
  )
}