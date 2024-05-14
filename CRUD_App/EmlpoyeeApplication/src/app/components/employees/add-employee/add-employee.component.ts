import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeObject: Employee = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    title: '',
    salary: 0,
  };

  reactiveForm!: FormGroup;
  constructor(
    private employeeService: EmployeesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'), // Matches 11 digits without any dashes or other separators
    ]),
      title: new FormControl('', Validators.required),
      salary: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
    });
  }
  addEmployee() {
    //console.log(this.addEmployeeObject)
    if (this.reactiveForm.valid) {
      this.addEmployeeObject = { ...this.reactiveForm.value };
      this.employeeService.addEmployee(this.addEmployeeObject).subscribe({
        next: (employee) => {
          // console.log(employee);
          this.router.navigate(['employees']);
        },
      });
    }
  }
}
