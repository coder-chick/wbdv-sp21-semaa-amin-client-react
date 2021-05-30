// import React from 'react'
// import { Link } from 'react-router-dom'
// import CourseRow from './course-row'

// export default class CourseTable 
//     extends React.Component{

//         constructor(props)
//         {
//             super(props)
//             console.log(props)
//         }

  


//         render(){
//             return(
//                 <div>
//                     <Link to="/courses/grid">
//                         <i className="fa fa-2x fa-th align-right"></i>  
                               
//                     </Link>  
//                     <h2>CourseTable</h2>    
//                     <table className="table">
//                         <tbody>
//                             {/* <CourseRow title="CS1234" owner= "alice" lastModified={"1/2/34"} />
//                             <CourseRow title="CS5678" owner= "bob" lastModified={"2/2/34"}/>
//                             <CourseRow title="CS91011" owner= "jen" lastModified={"3/2/34"}/>
//                             <CourseRow title="CS121314" owner= "jack" lastModified={"4/2/34"}/> */}
//                             {
//                                 this.props.courses.map((course, ndx)  =>  
//                                     <CourseRow 
//                                         deleteCourse = {this.props.deleteCourse}
//                                         key = {ndx}
//                                         course={course}
//                                         title= {course.title} 
//                                         owner= {course.owner} 
//                                         lastModified={course.lastModified} 
//                                     />)
//                             }
//                         </tbody>

//                     </table>
//                     </div>
//             )
//         }
//     } 

import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";

export default class CourseTable extends
  React.Component {

    constructor(props) {
        super(props);
    }

  render() {
    return(
      <div className="semaa-course-table">
          <Link to="/courses/grid">
              <i className="fas fa-th float-right fa-2x"></i>
          </Link>
        <h2>Course Table</h2>
        <table className="table">
            <thead></thead>
            <tbody>
              {/*<CourseRow title="CS5610" owner="me"/>*/}
              {/*<CourseRow title="CS3200" owner="you"/>*/}
              {/*<CourseRow title="CS5200" owner="him"/>*/}
              {/*<CourseRow title="CS4550" owner="she"/>*/}
              {
                this.props.courses.map(course =>
                  <CourseRow
                      key={course._id}
                      deleteCourse={this.props.deleteCourse}
                      updateCourse={this.props.updateCourse}
                    course={course}
                    title={course.title}
                    lastModified={course.lastModified}
                    owner={course.owner}/>)
              }
            </tbody>
        </table>
      </div>
    )
  }
}