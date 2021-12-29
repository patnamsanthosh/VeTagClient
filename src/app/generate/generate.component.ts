import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  generatedUrl = '';
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
  }

  generate() {
    let cust: Customer = {
      customerId: 'aa'
    }

    this.customerService.saveCustomer(cust).subscribe(resp => {
        if(resp) {
          const parsedUrl = new URL(window.location.href);
          const baseUrl = parsedUrl.origin;
          this.generatedUrl = baseUrl + '/customer/'+ resp.customerId;
          console.log(this.generatedUrl);
        }
    })
  }

}
