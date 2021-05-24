import React, {ChangeEvent, useState} from 'react'

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }

  const activateViewMode = () => {
    setEditMode(false)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    props.changeTitle(e.currentTarget.value)
  }

  return (
    editMode
      ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}

export default EditableSpan
