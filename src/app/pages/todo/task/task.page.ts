import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, TYPE_TASKS } from '../../../services/data.service';
import { ModalController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit, OnDestroy {

  public item;
  public isLoading = false;
  public oldDoc;

  constructor(public dataService: DataService,
              public actionSheetController: ActionSheetController,
              public modalController: ModalController) { }

  ngOnInit() {
    this.oldDoc = {...{}, ...this.item};
    console.log('Edditing item: ', this.item);
  }

  saveItem() {
    console.log('Saving: ', this.item, this.oldDoc);
    this.dataService.save(Object.assign({}, this.item), TYPE_TASKS, this.oldDoc);
  }

  close(){
    this.modalController.dismiss();
  }

  async removeItem(){
    console.log('Remove doc:: ', this.item);
    this.dataService.remove(this.item._id);
    this.close();
  }



  async presentDefaultDateSuggestions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose Due Date',
      buttons: [{
        text: 'Today 6pm',
        role: 'destructive',
        icon: 'date',
        handler: () => {
          console.log('Today 6pm clicked');
          return 'today6pm';
        }
      }, {
        text: 'Tomorrow',
        icon: 'share',
        handler: () => {
          console.log('tomorrow ');
        }
      }, {
        text: 'Next week',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('next week clicked');
        }
      }, {
        text: 'Custom',
        icon: 'heart',
        handler: () => {
          console.log('custom clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    const test = await actionSheet.present();
  }


  displayDueDate(){

    return this.item.date;
  }

  dueDateClicked(){
    console.log('dueDate clicked');
  }

  taskChecked(){
    console.log('task checked');
  }

  printDone(done){
    if(done) return 'radio-button-on';
    return 'radio-button-off';
  }

  todayClicked(){
    console.log('Today Clicked');

    if(this.item.today)
      this.item.today = null;
    else
      this.item.today = Date.now();
  }

  todayColor(){
    if(this.item.today) return 'primary';
    return 'light';
  }

  todayColorLabel(){
    if(this.item.today) return 'success';
    return 'medium';
  }

  printTodayLabel(){
    if(this.item.today) return 'Due Today';
    return 'Add to my day';
  }

  printImportantIconColor(){
    if(this.item.important) return 'warning';
    return 'medium';
  }

  importantClicked(){
    if(this.item.important)
      this.item.important = null;
    else
      this.item.important = Date.now();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.saveItem();

  }

}
