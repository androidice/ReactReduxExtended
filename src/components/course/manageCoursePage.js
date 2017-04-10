import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './courseForm';
import toastr  from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      authors: Object.assign([], this.props.authors),
      saving: false,
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.course.id != nextProps.course.id){
      //Necessary to update from when existing course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
    if(nextProps.authors.length > 0){
      this.setState({authors: Object.assign([], nextProps.authors)});
    }
  }

  handleSubmit(values) {
    this.setState({saving: true});
    event.preventDefault();
    console.log('course',values);
    this.props.actions.saveCourse(values).then(()=>{
       this.redirect();
    }).catch((error)=>{
      this.setState({saving: false});
      toastr.error(error);
    });
  }

  redirect(){
     this.setState({saving: false});
     toastr.success('Course Saved');
     this.context.router.push('/courses');
  }

  render() {
    return (
     <CourseForm
       allAuthors={this.state.authors}
       loading = {this.state.saving}
       onSubmit={this.handleSubmit}
       course={this.state.course}
       authors={this.state.authors}
       errors={this.state.errors}
     />
    );
  }
}

function getCourseById(courses, courseId){
  let course = {
    id: undefined,
    title: '',
    watchHref: '',
    authorId: '',
    length: '',
    category: ''
  };
  if(courseId){
    course = courses.filter((_course)=>{
      return (_course.id === courseId);
    });

    if(course[0]){
      return course [0];
    }
  }
  return course;
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let courseId = ownProps.params.id || undefined;
  let course = getCourseById(state.courses, courseId);

  const authorFormat = state.authors.map((author)=>{// reformating of data
    return {
      id: author.id,
      value: author.firstName+ ' '+ author.lastName
    };
  });

  return {
    course: course,
    authors: authorFormat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
