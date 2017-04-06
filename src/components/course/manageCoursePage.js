import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseAction';
import { CourseForm } from './courseForm';
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

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
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

  onSave(event){
    this.setState({saving: true});
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course).then(()=>{
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

  onChange(event){
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  render() {
    return (
     <CourseForm
       allAuthors={this.state.authors}
       loading = {this.state.saving}
       onSave={this.onSave}
       onChange={this.onChange}
       course={this.state.course}
       errors={this.state.errors}
     />
    );
  }
}

function getCourseById(courses, courseId){
  let course = {
    id: '',
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
      value: author.id,
      text: author.firstName+ ' '+ author.lastName
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
