import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  allowCalls = false;
  custid ='';
  isNewUser = false;
  hideUserUpdate = false;
  showSuccessMsg = false;
  emailFormControl!:FormControl;
  customerDetails:Customer = new Customer();
  customerform: FormGroup = this.fb.group({
    vehicleNumber: ['', [Validators.required]],
    emailIdController: ['', [Validators.required, Validators.email]],
    fullName:['',Validators.required ],
    mobileNumber:['', [Validators.required]],
    emergencyContactNumber:['', [Validators.required]],
    
  });
  favoriteSeason:any;
  seasons: string[] = ['Your Car is Towed', 'Your car is met with an accident', 
  'Car door is not closed properly',
   'Car Parking lights not turn off',
  'Other'];
  constructor(private fb: FormBuilder, 
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) {
     
   }


  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.custid = params['id'];
          if(this.custid) {
            this.customerService.getCustomer(this.custid).subscribe(resp => {
              if(resp) {
                this.customerDetails = resp;
                if(resp.isRegisterByCustomer) {
                    this.isNewUser = false;
                } else {
                  this.isNewUser = true;
                }
              }
              
            })
          }
        }
      );
    

   
    // this.customerform.addControl('new', this.fb.group({
    //   vehicleNumber: ['', [Validators.required]],
    //   emailIdController: ['', [Validators.required, Validators.email]],
    //   fullName:['',Validators.required ],
    //   mobileNumber:['', [Validators.required]],
    //   emergencyContactNumber:['', [Validators.required]],
    // //  AllowCalls:['', [Validators.required]],

    // }))

    // this.customerform = new FormGroup({
    //   vehicleNumber:new FormControl(),
    //   emailIdController: new FormControl(),
    //   fullName: new FormControl(),
    //   mobileNumber: new FormControl(),
    //   emergencyContactNumber: new FormControl(),

    // })
  }

  onSubmit(customerForm:FormGroup) {
    if(customerForm.valid) {
      let customer:Customer = {
        customerId:this.custid,
        fullName:this.customerform.get('fullName') ? this.customerform.get('fullName')?.value:'',
        emailId:this.customerform.get('emailIdController') ? this.customerform.get('emailIdController')?.value:'',
        emergencyContactNumber:this.customerform.get('emergencyContactNumber') ? this.customerform.get('emergencyContactNumber')?.value:'',
        mobileNumber:this.customerform.get('mobileNumber') ? this.customerform.get('mobileNumber')?.value:'',
        vehicleNumber:this.customerform.get('vehicleNumber') ? this.customerform.get('vehicleNumber')?.value:'',
        allowCalls:this.allowCalls,
        isRegisterByCustomer:true              
      }
      this.customerService.updateCustomer(customer).subscribe(resp => {
          alert('update the details successfully');
         // window.location.reload();
         this.showSuccessMsg = true;
         this.hideUserUpdate = true;

      })

    }
  }

  onAllowCallsChange(event:any) {
  //  console.log(event);
    this.allowCalls = event.checked;
  }

  onUserSubmit() {
    this.router.navigate(['success']);
    
  }

}
