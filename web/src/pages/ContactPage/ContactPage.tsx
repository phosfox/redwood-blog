import { MetaTags, useMutation } from '@redwoodjs/web'
import {
  Submit,
  Form,
  TextField,
  TextAreaField,
  FieldError,
  Label,
  useForm,
  FormError,
} from '@redwoodjs/forms'
import { Toaster, toast } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message.')
      formMethods.reset()
    },
  })
  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: {
        input: data,
      },
    })
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <Form onSubmit={onSubmit} formMethods={formMethods} error={error}>
        <FormError error={error} wrapperClassName="form-error"></FormError>
        <Label name="name" errorClassName="error" htmlFor="name">
          Name
        </Label>
        <TextField
          errorClassName="error"
          name="name"
          id="name"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error" />
        <Label name="email" errorClassName="error" htmlFor="email">
          Email
        </Label>
        <TextField
          errorClassName="error"
          name="email"
          id="message"
          validation={{ required: true }}
        />
        <FieldError name="email" className="error" />
        <Label name="message" errorClassName="error" htmlFor="message">
          Message
        </Label>
        <TextAreaField
          errorClassName="error"
          name="message"
          id="message"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error" />
        <Submit disabled={loading}>Send Message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
