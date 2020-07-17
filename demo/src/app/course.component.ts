import {Component} from '@angular/core';
import { Course } from './course';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'course',
  templateUrl: './course.html',
  styleUrls: ['./app.component.css']
})
export class CourseComponent {

  constructor(private http: HttpClient){

  }


  courseList: Array<Course>=[]

  ngOnInit() {
   
    this.getAllCourses();
}
  
  getAllCourses(){
    this.http.get('http://localhost:9000/courses')
       .subscribe((courses: Array<Course>) => {
          this.courseList = courses;   //assign 
       });
     }
   
}

