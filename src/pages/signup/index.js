import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

const style = {
    display: 'flex',
    justifyContent: 'center',
    mt: 4
}

const SignUpPage = () => {

    const handleRedirect = () => useRouter.push('/')

    return (
        <Box sx={style}>
            <Formik
                initialValues={{
                    email: 'email@example.com',
                    password: 'ChangeMe123!',
                    firstName: 'Tony',
                    lastName: 'Stark',
                    userName: ''
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('First Name is required'),
                    lastName: Yup.string()
                        .required('Last Name is required'),
                    userName: Yup.string()
                        .min(3, 'Must be at least 4 characters')
                        .max(25, 'Cannot be longer than 25 characters')
                        .required('Username is required'),
                    email: Yup.string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Email is required'),
                    password: Yup.string()
                        .min(8, 'Must be at least 8 characters')
                        .max(255)
                        .required('Password is required')
                })}
                onSubmit={async (value, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: true })
                        setSubmitting(false)
                        await identity.signup({
                            email: value.email,
                            password: value.password,
                            user_metadata: {
                                firstName: value.firstName,
                                lastName: value.lastName,
                                userName: value.userName
                            }
                        }).then(() => {
                            handleRedirect()
                            console.log('successfully submitted')
                        })
                    } catch (e) {
                        console.log(e)
                        setStatus({ success: false })
                        setErrors({ submit: e.message })
                        setSubmitting(false)
                    }
                }}
            >
                {({
                    errors,
                    values,
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                    touched
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField
                                sx={{ mr: 1 }}
                                error={Boolean(touched.firstName && errors.firstName)}
                                fullWidth
                                helperText={touched.firstName && errors.firstName}
                                label="First Name"
                                margin="normal"
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                variant="outlined"
                                value={values.firstName}
                            />
                            <TextField
                                sx={{ ml: 1 }}
                                error={Boolean(touched.lastName && errors.lastName)}
                                fullWidth
                                helperText={touched.lastName && errors.lastName}
                                label="Last Name"
                                margin="normal"
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="text"
                                variant="outlined"
                                value={values.lastName}
                            />
                        </Box>
                        <TextField
                            error={Boolean(touched.userName && errors.userName)}
                            fullWidth
                            helperText={touched.userName && errors.userName}
                            label="Username"
                            margin="normal"
                            name="userName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            variant="outlined"
                            value={values.userName}
                        />
                        <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            variant="outlined"
                            value={values.email}
                        />
                        <TextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            variant="outlined"
                            value={values.password}
                        />
                        <Button
                            sx={{ mt: 2, backgroundColor: '#F0131E' }}
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            variant="contained"
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default SignUpPage