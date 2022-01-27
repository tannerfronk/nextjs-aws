import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

const style = {
    display: 'flex',
    justifyContent: 'center',
    mt: 4
}

const LoginPage = () => {

    const handleRedirect = () => useRouter.push('/')

    return (
        <Box sx={style}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
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
                        await identity.login({
                            email: value.email,
                            password: value.password
                        }).then(() => {
                            console.log('Successfully submitted!')
                            handleRedirect()
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

export default LoginPage