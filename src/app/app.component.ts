import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoading = false;
 
  constructor(private loadingService: LoadingService) {}


  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }


}
