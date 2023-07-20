import { useState, useEffect } from 'react'
import { useAsyncError } from 'react-router-dom'
import styled from 'styled-components'
// import TextInput from '../../components/TextInput'
import './index.css'

export const SlimBorder = styled.div`
  border-size: 1px;
  border-style: solid;  
  padding : 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;s
`

export const Btn = styled.button`
    background-color: ${props => props.secondary === true ? '#8392ab' :  props.disabled || props.loader === true ? "#a8b8d8" : props.del === true ? '#FB020F' : '#2152ff'};
    `

    //inputs

export function Button ({
  name,
  disabled,
  className,
  loader,
  del,
  onClick,
  secondary,
  edit,

}){
  return(
    <Btn onClick={onClick} secondary={secondary} del={del} className={ " flex justify-center py-1 px-4 text-white " + className} disabled={disabled} loader={loader}>
      { loader? <span className="loader"></span> : del === true ? <span className="material-icons-round" title='supprimer'>delete</span> : edit === true ? <span className="material-icons-round" title='Editer'>edit</span> : name}
    </Btn>
  )
}

export function Input({
  icon,
  name,
  type,
  value,
  placeholder,
  required,
  sendValue,
  className,
  error,
  label
}) {
  const [inputValue, setInputValue] = useState(value ? value : '')
  const handleChange = (e) => {
    setInputValue(e.target.value)
    sendValue(e.target.value)
  }
  
  return (
    <div className="flex flex-col gap-2">
      {icon ? (
        <div className="flex gap-2 items-center w-full">
          <span className="material-icons-round">{icon}</span>
          <input
            className={
              'border-2 px-2 py-1 rounded-2 w-full outline-none focus:outline-slate-800 ' +
              className
            }
            onChange={handleChange}
            name={name && name}
            type={type ? type : 'text'}
            required={required && true}
            value={inputValue}
            placeholder={placeholder && placeholder}
          />
        </div>
      ) : type === 'radio' ? (
        <div className='flex flex-row  items-center gap-2'>
           <input
            className={className}
            onChange={handleChange}
            name={name && name}
            type={type ? type : 'text'}
            required={required && true}
            checked={inputValue}
          />
          <span className='font-semibold'>{label}</span>
        </div>
      ) : (
        <input
          className={
            'border-2 px-2 py-1 rounded-2 w-full focus:outline-slate-800' +
            className
          }
          onChange={handleChange}
          name={name && name}
          type={type ? type : 'text'}
          required={required && true}
          value={inputValue}
          placeholder={placeholder && placeholder}
        />
      )}

      {error && (
        <div className="flex items-center gap-2 text-3">
          <span className="material-icons-round text-red-700 text-4">
            {error.icon}
          </span>
          <span className="text-red-700">{error.message}</span>
        </div>
      )}
    </div>
  )
}

//email

export function Email({
  icon,
  name,
  type = 'email',
  value,
  placeholder,
  required,
  sendValue,
  className,
  error,
  setError,
  setChecked
}) {
  const [inputValue, setInputValue] = useState(value ? value : '')
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  //handler
  const handleChange = (e) => {
    setInputValue(e.target.value)
    if (e.target.value.match(mailformat)) {
      sendValue(e.target.value)
      setError()
      setChecked && setChecked(false)
    } else {
      setChecked && setChecked(true)
      setError({
        icon: 'warning',
        message: 'email not valid...'
      })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {icon ? (
        <div className="flex gap-2 items-center w-full">
          <span className="material-icons-round">{icon}</span>
          <input
            className={
              'border-2 px-2 py-1 rounded-2 w-full outline-none focus:outline-slate-800' +
              className
            }
            onChange={handleChange}
            name={name && name}
            type={type ? type : 'text'}
            required={required && true}
            value={inputValue}
            placeholder={placeholder && placeholder}
          />
        </div>
      ) : (
        <input
          className={
            'border-2 px-2 py-1 rounded-2 w-full focus:outline-slate-800' +
            className
          }
          onChange={handleChange}
          name={name && name}
          type={type ? type : 'text'}
          required={required && true}
          value={inputValue}
          placeholder={placeholder && placeholder}
        />
      )}

      {error && (
        <div className="flex items-center gap-2 text-3">
          <span className="material-icons-round text-red-700 text-4">
            {error.icon}
          </span>
          <span className="text-red-700">{error.message}</span>
        </div>
      )}
    </div>
  )
}


export function Password({
  icon = 'remove_red_eye',
  name,
  value,
  placeholder,
  required,
  sendValue,
  className,
  error,
  setError,
  setChecked
}) {
  const [inputValue, setInputValue] = useState(value ? value : '')
  const [showPassword, setShowPassword] = useState(false)
  // const [checked, setChecked] = useState(false)



  const handleChange = (e) => {
    setInputValue(e.target.value)
      if (e.target.value.length > 7) {
        sendValue(e.target.value)
        setChecked && setChecked(false)
        setError()
      } else {
        setChecked && setChecked(true)
        setError({
          icon: 'warning',
          message: 'Password must have more than 8 characters'
        })
      }
  }

  const handleShowPassword = () =>{
    setShowPassword(!showPassword)

  }

  return (
    <div className="flex flex-col gap-2">
      {icon ? (
        <div className="flex gap-2 items-center w-full">
          <input
            className={
              'border-2 px-2 py-1 rounded-2 w-full outline-none focus:outline-slate-800' +
              className
            }
            onChange={handleChange}
            name={name && name}
            type={showPassword ? 'text' : 'password'}
            required={required && true}
            value={inputValue}
            placeholder={placeholder && placeholder}
          />
            <span 
            className=" cursor-pointer material-icons-round"
            onClick={handleShowPassword}
            >{showPassword ? 'lock' : icon}</span>
        </div>
      ) : (
        <input
          className={
            'border-2 px-2 py-1 rounded-2 w-full focus:outline-slate-800' +
            className
          }
          onChange={handleChange}
          name={name && name}
          type='password'
          required={required && true}
          value={inputValue}
          placeholder={placeholder && placeholder}
        />
      )}

      {error && (
        <div className="flex items-center gap-2 text-3">
          <span className="material-icons-round text-red-700 text-3">
            {error.icon}
          </span>
          <span className="text-red-700 text-3">{error.message}</span>
        </div>
      )}
    </div>
  )
}

export default function Form({ className, children }) {
  return (
    <div className={className} action="">
      {children}
    </div>
  )
}

export function Select({
  name,
  data, 
  selected,
  vName,
  sendValue,
  placeholder,
  className,
  SelectedValue,
  loader
}){

  const [inputValue, setInputValue] = useState(SelectedValue ? SelectedValue : '')
  const handleChange = (e) => {
    setInputValue(e.target.value)
    sendValue(e.target.value)
    console.log(e.target.value)
  }


  return(
    <div className="w-full flex flex-row gap-2">
      <select onChange={handleChange} name={vName} className={'border-2 px-2 py-1 rounded-2 w-full focus:outline-slate-800' + className}>
        <option selected={SelectedValue ? false : true} disabled>---- select {placeholder} ----</option>
        {data && data.map(({name})=>(
        <option value={name} key={name}>{name}</option>
        ))}
      </select>
      {loader && <span className="loader"></span>}
    </div>
  )
}

const Check = styled.div`
  background-color: ${(props) => props.checked === true && '#2152ff'};
  border: ${props => props.checked === true ? 'none' : '2px solid #e4e4e7'}

`

export function Checkbox ({
  name,
  checked,
  readOnly,
  title,
  handler
}){

  //handeler
  const handleCheck = () => {
    handler(!checked)
  }

  return(
    <div onClick={handleCheck} className="flex flex-row gap-2 items-center cursor-pointer">
      <Check checked={checked} className="flex justify-center items-center border-zinc-200 rounded h-5 w-5">
        <span className="material-icons-round text-4 font-semibold text-white">
          check
        </span>
      </Check>
      <span className='text-3'> {title ? title : "Check Box"}</span>
    </div>
  )
}

//Radio
export function Radio ({
    inputName,
    name,
    type,
    value,
    required,
    sendValue,
    className,
    label,
    labelStyle,
    changeActive
  }) {
    const [active, setActive] = useState(false)
    
    const handleActive = () =>{
      if(value === name){
        console.log(10)
        setActive(true)
      }else{
        setActive(false)
      }
    }

    const handleChange = () => {
      sendValue({
        value: name,
        inputName : inputName
      })
      changeActive && changeActive(name)
      handleActive()
    }

    useEffect(()=>{
      handleActive()
    },[handleChange])

    return (
          <div className='flex flex-row  items-center gap-2'>
             <input
              className={'' + className}
              onChange={handleChange}
              name={inputName && inputName}
              type={type ? type : 'radio'}
              required={required && true}
              checked={active}
            />
            <span className={' ' + labelStyle} >{label}</span>
          </div>
    )
  }


  export function TextArea({
    icon,
    name,
    value,
    placeholder,
    required,
    sendValue,
    className,
    error,
    label
  }) {
    const [inputValue, setInputValue] = useState(value ? value : '')
    const handleChange = (e) => {
      setInputValue(e.target.value)
      sendValue(e.target.value)
    }
    
    return (
      <div className="flex flex-col gap-2">

          <textarea
            rows="8"
            maxLength="5000"
            className={
              'border-2 p-3 rounded-2 w-full outline-none ' +
              className
            }
            onChange={handleChange}
            name={name && name}
            required={required && true}
            value={inputValue}
            placeholder={placeholder && placeholder}
          >
          </textarea>
  
        {error && (
          <div className="flex items-center gap-2 text-3">
            <span className="material-icons-round text-red-700 text-4">
              {error.icon}
            </span>
            <span className="text-red-700">{error.message}</span>
          </div>
        )}
      </div>
    )
  }


  export function File({
    icon,
    name,
    value,
    placeholder,
    required,
    sendValue,
    className,
    error,
    label,
    hidden,
    only
  }) {
    const [inputValue, setInputValue] = useState(value && value)
    const date = new Date()
    const handleChange = (e) => {
      // file extention
      const file = e.target.files[0]
      // console.log(file)
      const ext = file.name.split('.')[1]
      const rString = Math.random().toString(36).substring(2, 7)
      const newFileName =
        'tunawork' + date.getTime().toString() + rString + '.' + ext
      // file.name = 150
      console.log(newFileName)

      // setFile(URL.createObjectURL(e.target.files[0]))
      sendValue({
        link: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
        fileName: newFileName,
        name: e.target.files[0].name
      })
    }
    
    return (
      // <div className="flex flex-col gap-2">

          <input
            id="dropzone-file"
            className={
              'border-2 p-3 rounded-2 w-full outline-none ' +
              className
            }
            onChange={handleChange}
            name={name && name}
            required={required && true}
            // value={ inputValue && inputValue.name}
            type='file'
            hidden={hidden}
            accept={only && only}
            
          />
          )
  }