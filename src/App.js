import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import './App.css';
import { Button } from '@mui/base';
import { UserCard } from './component/UserCard';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const methods = useForm({
    defaultValues: {
      users: []
    }
  });

  const {control, handleSubmit, reset} = methods;

  const {append, remove, fields} = useFieldArray({
    name: "users",
    control: control
  })

  const onSave = (data) => {
    console.log(data);
  }

  const onAddUser = () => {
    const lastUser = fields.at(-1)
    let newUserId = 1;

    if(lastUser){
      newUserId = lastUser.id + 1;
    }

    append({
      id: newUserId,
      name: "",
      suname: ""
    })
  }

  const onDeleteUser = (userIndex) => {
    remove(userIndex)
  }

  useEffect(() => {
    const getUsersAsync = async () => {
      const {data} = await axios.get("http://localhost:3030/users");
      reset({
        users: data
      })
    }
   
    getUsersAsync()
  }, [reset])

  return (
    <FormProvider {...methods}>
      {fields.map((user, index) => (
        <UserCard key={user.id} user={user} userIndex={index} onDeleteUser={onDeleteUser} />
      ))}
      <Button onClick={onAddUser}>Добавить пользователя</Button>
      <Button onClick={handleSubmit(onSave)}>Сохранить</Button>
    </FormProvider>
  );
}

export default App;
