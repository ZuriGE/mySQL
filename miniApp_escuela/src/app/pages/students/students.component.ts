import { Component } from '@angular/core';
import { Response } from 'src/app/models/response';
import { StudentServiceService } from 'src/app/shared/student-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { ChangeDetectorRef } from '@angular/core';
import swal from'sweetalert2';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
studentForm: FormGroup

students: Student []

showTable:Boolean = false

constructor(public apiService: StudentServiceService, private formBuilder:FormBuilder, private cdr:ChangeDetectorRef){
  this.apiService.students=null;
  this.studentForm = this.formBuilder.group({
    student_id: [''],
    first_name: [''],
    last_name: [''],
    group_id: [''],
    year: ['']
  });
}


showStudent(){
  const student_id = this.studentForm.get('student_id').value;
  
  if (student_id==''){
    this.apiService.getAllStudents().subscribe((res:Response)=>{
      console.log(res)
      if (!res.error){
        console.log(res)
        this.showTable=true
        this.apiService.students = res.data;
        this.students = res.data;
        this.cdr.detectChanges();
      }
    })
  }else{
    this.apiService.getStudentById(student_id).subscribe((res:Response)=>{
      console.log(res)
      if (res.error){
        swal.fire({
          
          icon: "error",
          title: "No existe ningún estudiante con ese ID",
          showConfirmButton: false,
          backdrop: false,
          timer: 2500
        });
      }else{
        console.log(res)
        this.showTable=true
        this.apiService.students = res.data;
        this.students = res.data;
        this.cdr.detectChanges();
      }
    })
  }
  
  this.students=this.apiService.students
}


newStudent(){
  
  let newStudent = this.studentForm.value
console.log(newStudent.first_name)
  if (newStudent.first_name==0 ||newStudent.last_name==0 ||newStudent.group==0 ||newStudent.year==0){
    swal.fire({            
      icon: "warning",
      title: `Rellena todos los campos marcados con asterisco (*)`,
      showConfirmButton: false,
      backdrop: false,
      timer: 2000
    })
  }else{
    swal.fire({
      title: "Revisa los datos:",
      text: `${newStudent.first_name} ${newStudent.last_name}, grupo ${newStudent.group_id}, año ${newStudent.year}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar datos"
    }).then((result) => {      
      if (result.isConfirmed) {
        this.apiService.postStudent(newStudent).subscribe((res:Response)=>{
          if (!res.error){
            swal.fire({                
              icon: "success",
              title: `Estudiante añadido con ID ${res.message}`,
              showConfirmButton: false,
              backdrop: false,
              timer: 1500
            })
          }else{
            swal.fire({              
              icon: "error",
              title: `Se ha producido un error`,
              showConfirmButton: false,
              backdrop: false,
              timer: 1500
            })
          }
        })
      }
    });
  }
}

}




