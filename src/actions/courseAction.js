import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function createCourse(course){
  return { type: types.CREATE_COURSE, course}; // the same with {course: course}
}

export function loadCoursesSuccess(courses){
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course){
  return {type: types.CREATE_COURSES_SUCCESS, course};
}

export function updateCourseSuccess(course){
  return {type: types.UPDATE_COURSES_SUCCESS, course};
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi.getAllCourses().then((courses)=>{
      dispatch(loadCoursesSuccess(courses));
    }).catch((error)=>{ //catch any exception
      throw(error);
    });
  };
}

export function saveCourse(course){
  return function(dispatch, getState){
    return courseApi.saveCourse(course).then((saveCourse)=>{
      course.id ? dispatch(updateCourseSuccess(saveCourse)): dispatch(createCourseSuccess(saveCourse));
    }).catch((error)=>{ //catch any exception
      throw(error);
    });
  };
}
