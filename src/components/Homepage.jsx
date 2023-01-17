import React, { useRef } from 'react'
import { useEffect } from 'react'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { nanoid } from 'nanoid'

import image from '../assets/image.svg'
import '../sass/homepage.scss'
import Card from './Card'
import { storage } from './firebase'

const events = ['drop', 'dragover', 'dragenter', 'dragleave']
const storageRef = ref(storage, `images/${nanoid()}`)

function Homepage({ setErrorMessage, setUploadState, setImageUrl }) {
  const dropAreaRef = useRef()

  async function onFileDrop(e) {
    const file = e.target.files?.[0] || e.dataTransfer.files[0]
    if (file.type.slice(0, 5) !== 'image') {
      setErrorMessage('The chosen file is not an image')
      e.target.value = null
      return
    }

    setUploadState('uploading')

    const response = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(response.ref)
    setUploadState('uploaded')
    setImageUrl(url)
  }

  useEffect(() => {
    events.forEach(event => {
      dropAreaRef.current.addEventListener(event, e => e.preventDefault())
    })
  })

  return (
    <Card className="homepage">
      <h1>Upload your image</h1>
      <p>File should be Jpeg, Png,....</p>
      <div className="drop-area" ref={dropAreaRef} onDrop={onFileDrop}>
        <img src={image} alt="drop area" />
        <p>Drag and drop your image here</p>
      </div>
      <p>or</p>
      <input type="file" name="file" id="file" onChange={onFileDrop} />
      <label htmlFor="file">Choose a file</label>
    </Card>
  )
}

export default Homepage
