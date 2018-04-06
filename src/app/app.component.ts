import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userFormGroup: FormGroup;
  userList: any = [];
  isUpdate: boolean = false;
  editRecIndex: number;

    constructor(private fb: FormBuilder) {}
    ngOnInit() {
      this.userFormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        phone: ['', [Validators.required]]
      });
    }
    onSubmit() {
      if (this.userFormGroup.valid) {
       let user = {
                    name: this.userFormGroup.get('name').value,
                    email: this.userFormGroup.get('email').value,
                    phone: this.userFormGroup.get('phone').value
                 };
                 if(this.isUpdate){
                   this.userList.splice(this.editRecIndex, 1, user);
                   this.isUpdate = false;
                 }else{
                  this.userList.push(user);
                 } 
        this.userFormGroup.reset();
      }
    }
    onReset(){
      this.isUpdate = false;
      this.userFormGroup.setValue({
        name:    '',
        email: '',
        phone: ''
      });
    }
    updateUser(index) {
      this.isUpdate = true;
      this.editRecIndex = index;
      let editUser = this.userList[this.editRecIndex];
      this.userFormGroup.setValue({
        name:    editUser.name,
        email: editUser.email,
        phone: editUser.phone
      });
    }
    deleteUser(index) {
      this.userList.splice(index,1);
    }
}
