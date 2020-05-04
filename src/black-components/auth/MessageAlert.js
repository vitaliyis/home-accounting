import React from 'react'

const MessageAlert = props => {
  const {type, message} = props
  return (
    <div className={`alert alert-${type}`}>{message}</div>
  )
}

export default MessageAlert