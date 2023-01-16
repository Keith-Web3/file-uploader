import React from 'react'
import Card from './Card'
import '../sass/loading.scss'
import { motion } from 'framer-motion'

const loaderVariant = {
  final: {
    x: ['-20%', '500%'],
    transition: {
      duration: 1,
      repeat: Infinity,
      type: 'tween',
    },
  },
}

function Loading() {
  return (
    <Card className="loading">
      <p>Uploading...</p>
      <div className="loader">
        <motion.div
          className="sub-loader"
          variants={loaderVariant}
          animate="final"
        ></motion.div>
      </div>
    </Card>
  )
}

export default Loading
