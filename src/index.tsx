import React from 'react'
import Message, { AddMessage, MessageType } from './Message'
import { render, unmountComponentAtNode } from 'react-dom'

function message(): {
  factory: AddMessage
  destory: () => void
} {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const addRef: { current: AddMessage | null } = { current: null }

  render(<Message addRef={addRef} />, div)

  return {
    factory: (type, content, duration) => {
      addRef.current && addRef.current(type, content, duration)
    },
    destory: () => {
      addRef.current = null
      unmountComponentAtNode(div)
      div.parentNode?.removeChild(div)
    },
  }
}

const { factory, destory } = message()

export { destory }

const DURATION = 3
/**
 * @param {string} content message
 * @param {number} duration duration: seconds
 */
export const success = (content: string, duration = DURATION) =>
  factory(MessageType.SUCCESS, content, duration)
/**
 * @param {string} content message
 * @param {number} duration duration: seconds
 */
export const info = (content: string, duration = DURATION) =>
  factory(MessageType.INFO, content, duration)
/**
 * @param {string} content message
 * @param {number} duration duration: seconds
 */
export const warn = (content: string, duration = DURATION) =>
  factory(MessageType.WARNING, content, duration)
/**
 * @param {string} content message
 * @param {number} duration duration: seconds
 */
export const error = (content: string, duration = DURATION) =>
  factory(MessageType.ERROR, content, duration)
