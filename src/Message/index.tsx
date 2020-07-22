import React, { FC, useState, useRef, useEffect } from 'react'
import './index.scss'

export const enum MessageType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'danger',
}

export type AddMessage = (
  type: MessageType,
  content: string,
  duration: number
) => void

type MessageObj = {
  timer: number
  type: MessageType
  duration: number
  content: string
}

const Message: FC<{ addRef: { current: null | AddMessage } }> = ({
  addRef,
}) => {
  const msgsRef = useRef<MessageObj[]>([])
  const [msgs, setMsgs] = useState<MessageObj[]>(msgsRef.current)

  const add: AddMessage = (type, content, duration) => {
    const timer = window.setTimeout(() => {
      setMsgs(
        (msgsRef.current = msgsRef.current.filter((msg) => msg.timer !== timer))
      )
    }, duration * 1000)
    setMsgs((msgsRef.current = [...msgs, { timer, type, duration, content }]))
  }

  useEffect(() => {
    return () => {
      msgsRef.current.forEach((msg) => clearTimeout(msg.timer))
    }
  }, [])

  addRef.current = add

  return msgs.length ? (
    <div className="rc-message d-flex flex-column position-absolute">
      {msgs?.map((msg) => (
        <div
          key={msg.timer}
          className={`rc-content align-self-center alert alert-${msg.type}`}
          style={{ animationDuration: msg.duration + 's' }}
        >
          <span>{msg.content}</span>
        </div>
      ))}
    </div>
  ) : null
}

export default Message
