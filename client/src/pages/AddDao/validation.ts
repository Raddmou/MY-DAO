import * as yup from 'yup';

export const validationSchema = yup.object({
    // age: yup
    //   .number()
    //   .min(18, 'Too young. Only adults can be added to the list')
    //   .max(150, 'Too old.')
    //   .required('Age is required'),
    // city: yup
    //   .string()
    //   .required('City can\'t be empty'),
    name: yup
      .string()
      .required('Name can\'t be empty'),
      //TODO: max length
    // membershipMode: yup
    //   .string()
    //   .required('membershipMode is required'),
    // membershipMode: yup
    //   .string()
    //   .oneOf([
    //     yup.ref('0'),
    //     yup.ref('1'),
    //     yup.ref('2')
    //   ],
    //   "message"
    // ),
    // note: yup
    //   .string()
    //   .required('Notes about citizen are required'),
  });