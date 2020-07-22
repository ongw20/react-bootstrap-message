import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { success, warn, info, error } from '../src'

export const MessageExample = () => {
  const showSuccess = () => {
    success('Success')
  }
  const showWarning = () => {
    warn('Warning')
  }
  const showInfo = () => {
    info('Info')
  }
  const showError = () => {
    error('Error')
  }
  return (
    <div>
      <div className="form-group px-2">
        <button className="btn btn-success" onClick={showSuccess}>
          Success
        </button>
      </div>
      <div className="form-group px-2">
        <button className="btn btn-warning" onClick={showWarning}>
          Warning
        </button>
      </div>
      <div className="form-group px-2">
        <button className="btn btn-info" onClick={showInfo}>
          Info
        </button>
      </div>
      <div className="form-group px-2">
        <button className="btn btn-danger" onClick={showError}>
          Error
        </button>
      </div>
    </div>
  )
}

export default {
  title: 'Message',
}
