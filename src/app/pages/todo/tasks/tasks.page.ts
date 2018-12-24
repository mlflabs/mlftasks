import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DataService, TYPE_TASKS } from '../../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../models';
import { ModalController } from '@ionic/angular';
import { TaskPage } from '../task/task.page';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage implements OnInit, OnDestroy {

  public subscriptions = [];
  public items =[];
  public item;
  public category;// = new Category();
  public type = 'default';
  public title = 'Tasks';
  public icon = 'clipboard';
  public newTask;
  public newTaskInputFocused = false;


  constructor(public dataService: DataService,
              private route: ActivatedRoute,
              public modalController: ModalController,
              public cdr: ChangeDetectorRef) { }


  async ngOnInit() {
    console.log('ngOnInit');
    console.log('Data: ', this.route.snapshot.data);
    const data = this.route.snapshot.data;
    // see if we have any data provided
    if(data){
      if(data.icon) this.icon = data.icon;
      if(data.title) this.title = data.title;
      if(data.type) this.type = data.type;
    }

    // see what kind of type are we
    console.log('Tasks type: ', this.type);
    if(this.type === 'category'){
      const catid = this.route.snapshot.paramMap.get('id');
      console.log('Catid: ', catid);

      this.category = await this.dataService.getDoc(catid);
      console.log('Category: ', this.category, catid);
      if(this.category == null) return;

      this.subscriptions[0] = this.dataService.subscribeCollectionChanges(TYPE_TASKS,1000)
        .subscribe(async doc => {
          console.log('We are making changes to docs', doc);
          // make sure its out category
          if(doc.category !== this.category._id) return;
          this.items = await this.dataService.findDocsByCategory(this.category._id);
          this.cdr.detectChanges();
      });
      this.items = await this.dataService.findDocsByCategory(this.category._id);
    }
    else if(this.type === 'important'){
      this.subscriptions[0] = this.dataService.subscribeCollectionChanges(TYPE_TASKS,1000)
        .subscribe(async doc => {
          console.log('We are making changes to docs', doc);
          // make sure its out category
          this.items = await this.dataService.findAllDocsByPropertyNotNull('important');
          this.cdr.detectChanges();
      });
      this.items = await this.dataService.findAllDocsByPropertyNotNull('important');
    }
    else if(this.type === 'today'){
      this.subscriptions[0] = this.dataService.subscribeCollectionChanges(TYPE_TASKS,1000)
      .subscribe(async doc => {
        console.log('We are making changes to docs', doc);
        // make sure its out category
        this.items = await this.dataService.findAllDocsByPropertyNotNull('today');
        this.cdr.detectChanges();
      });
      this.items = await this.dataService.findAllDocsByPropertyNotNull('today');
    }
    else if(this.type === 'default'){
      this.subscriptions[0] = this.dataService.subscribeCollectionChanges(TYPE_TASKS,1000)
        .subscribe(async doc => {
          console.log('We are making changes to docs', doc);
          // make sure its out category
          if(doc.category !== 'default') return;
          this.items = await this.dataService.findDocsByCategory('default');
          this.cdr.detectChanges();
      });
      this.items = await this.dataService.findDocsByCategory('default');
    }
    else if(this.type === 'tag'){
      // TODO: need to add tag system.
    }

    this.cdr.detectChanges();

  }


  async selectedItem(item){
    console.log('selectedItem', item);
    const modal = await this.modalController.create({
      component: TaskPage,
      componentProps: { item: {...{}, ...item}}
    });
    modal.present();
  }

  taskChecked(item){
    console.log('Task Checked: ', item);
    const done = (item.done)?null:Date.now();
    this.saveItem({...item, ...{done: done}});
  }


  async saveItem(item) {
    console.log('Saving Test: ', this.item);
    await this.dataService.save(item, TYPE_TASKS);

  }

  removeItem(doc){
    console.log('Deleting doc:: ', doc);
    this.item = {};
    this.dataService.remove(doc._id);
  }

  selectedItem2(item){
    this.item = {...{}, ...item};
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    });
  }

  add(){
    console.log('ADD');
  }

  newTaskFocus(){
    console.log('newTaskFocus');
    this.newTaskInputFocused = true;
  }

  newTaskBlur(){
    console.log('newTaskBlur');
    this.newTaskInputFocused = false;
  }

  newTaskKeyInput(event){
    console.log('newTaskKeyInput', event);

    if(event.code === 'Enter'){
      console.log('ENTER');
      if(this.newTask != null){
        // we have a value, lets make a task and clear input

        // lets see if we have a category or this is dynamic
        let catid = 'default';
        if(this.category != null && this.category._id != null)
          catid = this.category._id;
        this.saveItem({
          category: catid,
          title: this.newTask,
        });

        this.newTask = '';
      }
    }
  }

  printDone(done){
    if(done) return 'radio-button-on';
    return 'radio-button-off';
  }

  printDoneColor(done, title){
    if(!title) return 'light';
    if(done) return 'success';
    return 'primary';
  }

  printTitle(value){
    if(value == null || value === '')
      return 'No Title';
    return value;
  }

}
