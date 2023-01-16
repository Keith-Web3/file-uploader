import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useState } from 'react'

import Popup from './components/Popup'
import Homepage from './components/Homepage'
import Loading from './components/Loading'
import './sass/index.scss'
import FinalPage from './components/FinalPage'

let timeout

function App() {
  const [uploadState, setUploadState] = useState('not-uploaded')
  const [errorMessage, setErrorMessage] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (errorMessage) {
      timeout = setTimeout(() => {
        setErrorMessage('')
      }, 3100)
    }
    return () => clearTimeout(timeout)
  }, [errorMessage])

  return (
    <>
      <AnimatePresence>
        {errorMessage && <Popup message={errorMessage} />}
      </AnimatePresence>
      {uploadState === 'not-uploaded' && (
        <Homepage
          setErrorMessage={setErrorMessage}
          setUploadState={setUploadState}
          setImageUrl={setImageUrl}
        />
      )}
      {uploadState === 'uploading' && <Loading />}
      {uploadState === 'uploaded' && (
        <FinalPage imageUrl={imageUrl} setErrorMessage={setErrorMessage} />
      )}
    </>
  )
}

export default App
