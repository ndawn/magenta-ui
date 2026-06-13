import { useState, type ComponentProps } from "react"

import { CircleAlertIcon } from "lucide-react"

import { formOptions, useForm } from "@tanstack/react-form"

import IconGithub from "@/components/icons/IconGithub"
import IconGoogle from "@/components/icons/IconGoogle"
import IconMicrosoft from "@/components/icons/IconMicrosoft"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

type LoginValues = {
  username: string
  password: string
}

type RegisterValues = LoginValues & {
  firstName: string
  lastName: string
  terms: boolean
}

type AuthFormProps = ComponentProps<"form"> & {
  onLogin: (values: LoginValues) => Promise<string | undefined>
  onRegister: (values: RegisterValues) => Promise<string | undefined>
}

const formOpts = formOptions({
  defaultValues: {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    terms: false,
  },
})

const AuthForm = ({ onLogin, onRegister, ...props }: AuthFormProps) => {
  const [type, setType] = useState<"Login" | "Register">("Login")
  const [error, setError] = useState<string | undefined>()
  const [isRequesting, setRequesting] = useState(false)

  const toggle = () =>
    setType((prev) => (prev === "Login" ? "Register" : "Login"))

  const onSubmit = ({ value }: { value: RegisterValues }) => {
    setRequesting(true)
    debugger

    {
      ;(type === "Register" ? onRegister(value) : onLogin(value))
        .then(setError)
        .finally(() => setRequesting(false))
    }
  }

  const form = useForm({
    ...formOpts,
    onSubmit,
  })

  const triggerFormSubmit = () => {
    setError(undefined)
    form.handleSubmit()
  }

  return (
    <form {...props}>
      <FieldGroup>
        {error && (
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle className="capitalize">{type} failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) =>
              value.length < 4
                ? "Username should include at least 4 characters"
                : undefined,
          }}
        >
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor="auth-form-username">Username</FieldLabel>
              <Input
                required
                id="auth-form-username"
                placeholder="Enter your username"
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(event.currentTarget.value)
                }
                aria-invalid={!field.state.meta.isValid}
              />
              {field.state.meta.errors && (
                <FieldError>{field.state.meta.errors}</FieldError>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              value.length < 5
                ? "Password should include at least 5 characters"
                : undefined,
          }}
        >
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor="auth-form-password">Password</FieldLabel>
              <Input
                type="password"
                required
                id="auth-form-password"
                placeholder="Enter your password"
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(event.currentTarget.value)
                }
                aria-invalid={!field.state.meta.isValid}
              />
              {field.state.meta.errors && (
                <FieldError>{field.state.meta.errors}</FieldError>
              )}
            </Field>
          )}
        </form.Field>

        {type === "Register" && (
          <>
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value ? "First name cannot be empty" : undefined,
              }}
            >
              {(field) => (
                <Field data-invalid={!field.state.meta.isValid}>
                  <FieldLabel htmlFor="auth-form-firstName">
                    First name
                  </FieldLabel>
                  <Input
                    required
                    id="auth-form-firstName"
                    placeholder="Enter your first name"
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(event.currentTarget.value)
                    }
                    aria-invalid={!field.state.meta.isValid}
                  />
                  {field.state.meta.errors && (
                    <FieldError>{field.state.meta.errors}</FieldError>
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field
              name="lastName"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Last name cannot be empty" : undefined,
              }}
            >
              {(field) => (
                <Field data-invalid={!field.state.meta.isValid}>
                  <FieldLabel htmlFor="auth-form-lastName">
                    Last name
                  </FieldLabel>
                  <Input
                    required
                    id="auth-form-lastName"
                    placeholder="Enter your last name"
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(event.currentTarget.value)
                    }
                    aria-invalid={!field.state.meta.isValid}
                  />
                  {field.state.meta.errors && (
                    <FieldError>{field.state.meta.errors}</FieldError>
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field
              name="terms"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Please accept terms and conditions" : undefined,
              }}
            >
              {(field) => (
                <Field
                  orientation="horizontal"
                  data-invalid={!field.state.meta.isValid}
                >
                  <Checkbox
                    required
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(!!checked)}
                    id="auth-form-terms"
                    aria-invalid={!field.state.meta.isValid}
                  />
                  <FieldLabel htmlFor="auth-form-terms">
                    I accept terms and conditions
                  </FieldLabel>
                  {field.state.meta.errors && (
                    <FieldError>{field.state.meta.errors}</FieldError>
                  )}
                </Field>
              )}
            </form.Field>
          </>
        )}

        <Button
          type="button"
          disabled={isRequesting}
          className="w-full"
          onClick={triggerFormSubmit}
        >
          {isRequesting && <Spinner />}
          {type}
        </Button>

        <FieldSeparator>Or continue with</FieldSeparator>

        <div className="flex flex-row gap-4">
          <Button variant="outline" className="grow">
            <IconGoogle />
          </Button>
          <Button variant="outline" className="grow">
            <IconMicrosoft />
          </Button>
          <Button variant="outline" className="grow">
            <IconGithub />
          </Button>
        </div>

        <p className="text-sm text-center text-slate-600">
          {type === "Register"
            ? "Already have an account? "
            : "Don't have an account? "}
          <a href="#" onClick={toggle} className="underline underline-offset-4">
            {type === "Register" ? "Login" : "Register"}
          </a>
        </p>
      </FieldGroup>
    </form>
  )
}

export default AuthForm
