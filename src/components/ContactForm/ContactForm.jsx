import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts, addContact } from "../../redux/contactsSlice";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const initialValues = { name: "", number: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 character")
      .max(50, "Maximum 50 character")
      .required("Required"),
    number: Yup.string().required("Required"),
  });

  const handleSubmit = (values, actions) => {
    const isExist = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isExist) {
      alert("This person already exists");
      return;
    }

    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <label className={styles.label}>
          Name:
          <Field className={styles.input} type="text" name="name" />
          <ErrorMessage className={styles.error} name="name" component="div" />
        </label>
        <label className={styles.label}>
          Number:
          <Field className={styles.input} type="text" name="number" />
          <ErrorMessage className={styles.error} name="number" component="div" />
        </label>
        <button className={styles.button} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
