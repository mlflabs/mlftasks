
import { Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService, TYPE_CATEGORIES } from './services/data.service';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public appPages = [];
  public start = [
    {
      title: 'Today',
      url: '/today',
      icon: 'sunny'
    },
    {
      title: 'Important',
      url: '/important',
      icon: 'star'
    },
    {
      title: 'Tasks',
      url: '/default-tasks',
      icon: 'clipboard'
    },
  ];

  public end = [
    {
      title: 'Categories',
      url: '/categories',
      icon: 'list-box'
    },
  ];

  public user = [
    {
      title: 'User',
      url: '/user',
      icon: 'settings'
    },
  ];

  public guest = [
    {
      title: 'Login',
      url: '/login',
      icon: 'contact'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'create'
    },
  ];
  public tasks = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public cdr: ChangeDetectorRef,
    public authService: AuthService,
    public dataService: DataService,
    public router: Router
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadMenu();
      this.subscribe();
    });
  }

  async loadMenu(){
    // lets now load all our categories
    const cats = await this.dataService.getAllByType(TYPE_CATEGORIES);
    console.log('Categories', cats);
    const catpages = cats.map(cat => {
      return {title: cat.title,
              url: '/'+cat.type+'/'+cat._id,
              icon: cat.icon };
    });
    this.appPages = this.start.concat(catpages, this.end);

    if(this.authService.isAuthenticated){
      this.appPages = this.appPages.concat(this.user);
    }
    else {
      this.appPages = this.appPages.concat(this.guest);
    }
    console.log('Pages', catpages, this.appPages);
    this.cdr.detectChanges();
  }

  async subscribe(){
    // setup subscription to cat changes
    const sub = this.dataService.subscribeCollectionChanges(TYPE_CATEGORIES, 1000)
      .subscribe( async doc => {
        console.log('RELOADING SUB MENU@@@@@@@@@@@@@@@');
        this.loadMenu();
      });

    const auth = this.authService.isAuthenticated$.subscribe(change => {
      console.log('User has been updated');
      this.loadMenu();
      // if changed then redirect to home
      this.router.navigate(['home']);
    });
  }

}
