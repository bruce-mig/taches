import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Formik, Form } from "formik"
import moment from "moment"

function TodoComponent() {
    const { id } = useParams()

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()

    useEffect(
        () => retrieveTodo,
        [id]
    )

    function retrieveTodo() {
        if (id != -1) {
            retrieveTodoApi(username, id)
                .then((response) => {
                    console.log(response)
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo)
        if (id == -1) {
            createTodoApi(username, todo)
                .then(() => {
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        } else {
            updateTodoApi(username, id, todo)
                .then(() => {
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description'
        };
        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters'
        }

        if (values.targetDate === '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target Date'
        }
        console.log(values)
        return errors
    }
    return (
        <div className="container">
            <h1>Enter Todo details</h1>
            <div>
                <Formik initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {
                        (props) => (

                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default TodoComponent