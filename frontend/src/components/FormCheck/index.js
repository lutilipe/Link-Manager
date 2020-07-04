import React, { useState, useEffect } from 'react'

const FormGroup = (props) => {
  const { data, label, name } = props

  const [isChecked, setIsChecked] = useState(null)

  useEffect(() => {
    const value = data && data[name] ? data[name] : undefined
    if (value !== undefined) {
      setIsChecked(value)
    }
  }, [name, data])

  const handleChange = e => {
    if (isChecked === e.target.checked) return
    setIsChecked(!!e.target.checked)
  }

  const inputProps = {
    type: 'checkbox',
    name,
    checked: !!isChecked,
    onChange: handleChange
  }

  return (
    <>
      <div className="form-group form-check">
        <label className="form-check-label">
          <input { ...inputProps }/>
          <span className="form-check-sign"></span>
          {label}
        </label>
      </div>
    </>
  )
}

export default FormGroup
