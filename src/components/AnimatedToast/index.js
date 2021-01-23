import React, { useCallback, useEffect, useState } from 'react'
import { Toast, ToastBody, ToastHeader } from 'reactstrap'
import { Wrapper } from './styles'
const types = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info'
}

const AnimatedToast = ({ type = 'danger', headerTitle, message }) => {
  const toastClass = `bg-${types[type] ?? 'info'} rounded`

  return (
    <Wrapper className={toastClass}>
      <Toast>
        <ToastHeader>
          {headerTitle}
        </ToastHeader>
        <ToastBody>
          {message}
        </ToastBody>
      </Toast>
    </Wrapper>
  )
}

export default AnimatedToast
