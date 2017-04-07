import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.length) {
    errors.length = 'Required';
  } else if (!/(\d(:\d)*)/g.test(values.length)) {
    errors.length = 'Invalid Length';
  }
  return errors;
};

const renderField = ({ input, label, required, placeholder, type, meta: { touched, error, warning } }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={placeholder} type={type}/> {required &&
                                                                   <span>*</span>}
        {touched && ((error &&
                      <span className="error">{error}</span>) || (warning &&
                                                                  <span>{warning}</span>))}
      </div>
    </div>
  );
};

const renderSelectField = ({ input, label, required, defaultOption, options }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <select {...input}>
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return <option key={option.id}
                           value={option.id}>{option.value}</option>;
          })}
        </select>
        {required && <span>*</span>}
      </div>
    </div>
  );
};

let CourseForm = (props) => {
  const { course, authors, onChange, onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <Field name="title"
             component={renderField}
             value={course.title}
             type="text"
             label="Course"
             placeholder="Course"
             required="required"
             onChange={onChange}/>
      <Field name="authorId"
             component={renderSelectField}
             options={authors}
             value={course.authorId}
             defaultOption="Select here..."
             label="Authors"/>
      <Field name="category"
             component={renderField}
             value={course.category}
             type="text"
             label="Category"
             placeholder="Category"
             onChange={onChange}/>
      <Field name="length"
             component={renderField}
             value={course.length}
             type="text"
             label="Length"
             placeholder="Length"
             required="required"
             onChange={onChange}/>
      <button type="submit" disabled={!props.valid}>Save</button>
    </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

CourseForm = reduxForm({
  form: 'courseForm',
  validate
})(CourseForm);


function mapStateToProps(state, ownProps){
  return {
    initialValues: ownProps.course
  };
}

CourseForm = connect(mapStateToProps)(CourseForm);

export default CourseForm;
