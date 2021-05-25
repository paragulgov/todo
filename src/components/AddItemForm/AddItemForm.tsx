import {Button, IconButton, TextField} from '@material-ui/core'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {AddBox} from '@material-ui/icons'

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addItem()
    }
  }

  const addItem = () => {
    if (title.trim() !== '') {
      props.addItem(title)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        variant="outlined"
        size="small"
        color="secondary"
        label="Title"
        helperText={error}
      />
      <IconButton onClick={addItem}>
        <AddBox color="secondary" />
      </IconButton>
    </div>
  )
}
