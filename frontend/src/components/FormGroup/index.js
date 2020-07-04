import React, { useState, useEffect } from 'react'

const FormGroup = (props) => {
  const { data, label, name, type } = props

  const [value, setValue] = useState('')

  useEffect(() => {
    const value = data && data[name] ? data[name] : undefined
    if (value !== undefined) {
      setValue(value)
    }
  }, [name, data])

  const handleChange = e => {
    if (value === e.target.value) return
    setValue(e.target.value)
  }

  const inputProps = {
    type,
    name,
    value: value || '',
    onChange: handleChange
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-control" { ...inputProps }/>
    </div>
  )
}

export default FormGroup
