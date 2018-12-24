import { Component, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPage implements OnInit, OnDestroy {

  user;
  public subscription: any;

  constructor(public auth: AuthService,
    public cdr: ChangeDetectorRef) { }


  ngOnInit() {
    this.subscription = this.auth.user$.asObservable().subscribe(
      res => {
        this.user = res;
        this.cdr.detectChanges();
      }
    );
  }

  ngOnDestroy() {
  }

  logout() {
    this.auth.logout();
  }

}
