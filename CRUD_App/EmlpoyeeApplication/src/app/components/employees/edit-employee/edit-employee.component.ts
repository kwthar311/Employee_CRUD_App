import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  UpdatedObj!: Employee;
  employeeDetails: Employee = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    title: '',
    salary: 0,
  };
  UpdateForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.UpdateForm = new FormGroup({
      id: new FormControl('', Validators.required),
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

    let idNumber: number = 0;
    this.route.paramMap.subscribe({
      next: (parmes) => {
        let id: string | null | undefined = parmes.get('id');
        if (id !== null && id !== undefined) {
          idNumber = +id;
        }
        if (idNumber) {
          this.employeeService.getEmployee(idNumber).subscribe({
            next: (response) => {
              console.log(response);
              this.employeeDetails = response;
              this.UpdateForm.patchValue({
                id: response.id,
                name: response.name,
                email: response.email,
                phone: response.phone,
                title: response.title,
                salary: response.salary,
              });
            },
          });
        }
      },
    });
  }

  UpdateEmployee() {
    if (this.UpdateForm.valid) {
      this.UpdatedObj = { ...this.UpdateForm.value };
      this.employeeService
        .UpdateEmployee(this.UpdatedObj.id, this.UpdatedObj)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['employees']);
          },
        });
    }
  }

  DeleteEmployee(id: number) {
    if (this.UpdateForm.valid) {
      this.UpdatedObj = { ...this.UpdateForm.value };
      this.employeeService.deleteEmployee(this.UpdatedObj.id).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['employees']);
        },
      });
    }
  }
}
