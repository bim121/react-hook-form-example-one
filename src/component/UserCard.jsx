import { Button, TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import "../App.css"

export const UserCard = (props) => {
    const { user: { name, suname }, userIndex, onDeleteUser } = props
    const { control } = useFormContext()

    return (
        <div className="card">
            <div className="card__header">
                <span>Пользователь {userIndex + 1}</span>
                <Button onClick={() => onDeleteUser(userIndex)}>Удалить пользователя</Button>
            </div>

            <Controller
                name={`users[${userIndex}].name`}
                control={control}
                defaultValue={name}
                render={({ field: { value, onChange } }) => (
                    <TextField
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                name={`users[${userIndex}].suname`}
                control={control}
                defaultValue={suname}
                render={({ field: { value, onChange } }) => (
                    <TextField
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
      </div>
    )
}