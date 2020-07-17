import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';
//import { Course } from './course';

@Component({
  selector: 'app-root',
  templateUrl: './student.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  submitted = false;
  edited = false;
 
  //default value
  student = new Student(10, 'Nino', 'Boy', 'nino@abc.com');
  
  studentList: Array<Student> = []
  //courseList: Array<Course>=[]
  
 
  //you would need for Httpclient 
  constructor(private http: HttpClient){

}
  // execute this method, on page initialization 
ngOnInit() {
    this.getAllStudents();  //calling 
    //this.getAllCourses();
}

/*
getAllCourses(){
  this.http.get('http://localhost:9000/courses')
     .subscribe((courses: Array<Course>) => {
        this.courseList = courses;   //assign 
     });
   }
*/

  // Read all students records from the database
  getAllStudents(){
    this.http.get('http://localhost:9000/students')
       .subscribe((students: Array<Student>) => {
          this.studentList = students;   //assign 
       });
     }
    
     onSubmit() { 
        
      if (this.edited == true) return;
        
     //Calling REST Service
      this.http.post('http://localhost:9000/students/', this.student)
         .subscribe(
           (res) => {
             this.getAllStudents();
                  }
         );
       }
    
 
     onPutSubmit() {
 
      this.edited = true; 
             
      // Create a student record in the database
      this.http.put('http://localhost:9000/students/'+ this.student.studentID, this.student)
         .subscribe(() => {
             this.getAllStudents();  //calling 
         });
       }
          
       
      // Update a student record in the database
      onEditClick(event: any, data: any) {
       console.log(data);
       // assign value to model
       this.student.studentID = data.studentID;
       this.student.first_name = data.first_name;
       this.student.last_name = data.last_name;  
       this.student.email=data.email;  
       }
       
       
      // Delete a student record in the database
     onDeleteClick(event: any, data: Student) {
      this.http.delete('http://localhost:9000/students/'+data.studentID)
         .subscribe(() => {
      this.getAllStudents()
         });
}
}
