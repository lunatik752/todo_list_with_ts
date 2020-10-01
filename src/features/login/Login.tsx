import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import {FormikHelpers, useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useAppDispatch} from "../../state/store";
import {AppRootStateType} from "../../state/store";


type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    type FormErrorType = {
        email: string
        password: string
        rememberMe: boolean
        captcha?: string
    }


    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()

    const validate = (values: FormErrorType) => {
        const errors: any = {};
        if (!values.email) {
            errors.email = 'Email is required';
        }
        /* else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
             errors.email = 'Invalid email address';
         }*/
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(loginTC(values));
            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                } else {
                }
            }
        },
    })


    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target='_blank' rel="noopener noreferrer">here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            name="email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
