import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import { Observable, fromEvent, Subject } from 'rxjs';
import { map, debounceTime, filter, first } from 'rxjs/operators';
import { Doc } from '../models';
import { generateCollectionId } from '../utils';
import { promise } from '../../../node_modules/protractor';
import { isEqual } from 'lodash';
import { diff } from 'deep-diff';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

export const TYPE_TASKS = 'todotasks';
export const TYPE_CATEGORIES = 'todocategories';

PouchDB.plugin(PouchDBFind);
// PouchDB.debug.enable('pouchdb:find');

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _pouch: any;
  private _pouchReady;
  public ready = false;
  private _changes;
  private _user;
  private _token;


  private _localPouchOptions = {
    revs_limit: 5,
    auto_compaction: true
  };

  constructor(private platform: Platform,
              public authService: AuthService) {
    console.log('Hello DataService');

    this._changes = new Subject();
    this._pouchReady = new Subject();

    this.platform.ready().then(() => {
      this._user = authService.user;
      this.initPouch(this._user.username,
        this._user.username !== 'Guest',
        this._user.username !== 'Guest' );

      authService.user$.subscribe(user =>{
        if(user.username !== this._user.username){
          // only update if we are different, user change
          // also see if we are updating from guest, import old data
          if(this._user.username === 'Guest'){
            this.initPouch(user.username, true, true);
          }
          else {
            this.initPouch(user.username, true, false);
          }
          this._user = user;
        }
      });
    });
  }


  waitForReady(): Observable<any> {
    // let others know are datasource is ready
    return this._pouchReady.asObservable().pipe(first());
    if(this.ready === true){
      this._pouchReady.next(true);
    }

  }

  subscribeChanges(): Observable<any> {
    console.log('Subscribing to changes');
    return this._changes.asObservable().pipe(
      // debounceTime(1000),
      map(doc => {
        return doc;
      })
    );
  }

  subscribeCollectionChanges(type: string, debounce:number=0): Observable<any> {
    console.log('Subscribing to collection changes', type, debounce);
    return this._changes.asObservable().pipe(
      debounceTime(debounce),
      filter(doc => doc['_id'].startsWith(type+'|'))
    );
  }


  subscribeDocChanges(id: string, debounce: number = 0): Observable<any> {
    console.log('Subscribing to doc changes', id, debounce);
    return this._changes.asObservable().pipe(
      debounceTime(debounce),
      filter(doc => doc['_id'] === id)
    );
  }

  async getAllByType(type, serverRefreshForce = false){
    const all = await this._pouch.allDocs();
    const res = await this._pouch.allDocs({
      include_docs: true,
      startkey: type+'|',
      endkey: type+'|'+ String.fromCharCode(65535)
    });
    console.log('all: ', all);
    console.log('res: ',res);
    const docs = res.rows.map(row => row.doc);
    console.log('Get Collection: ', type, docs);
    return docs;
  }

  async getAllDocs() {
    const res = await this._pouch.allDocs({include_docs: true});
    const docs = res.rows.map(row => row.doc);
    console.log('GetAllDocs:  ', res, docs);
    return docs;
  }

  async remove(id) {
    try {
      const doc = await this._pouch.get(id);
      doc._deleted = true;
      const res = await this._pouch.put(doc);

      if(res.ok)
        return res;
      else
        return false;
    }
    catch(e) {
      console.log('Remove Pouch Error:: ', e);
      return false;
    }
  }


  async save(doc, collection:string='', oldDoc = null): Promise<any> {

    // if its a design doc, or query, skip it
    if(doc._id != null && doc._id.startsWith('_') )
    {
      console.log('Skiped Save, internal doc:  ', doc);
      return false;
    }

    console.log('Saving Doc: ', doc, collection, oldDoc);

    // see if we need to compare changes and only save if there are any
    // lets see if there are actual changes
    const changes = diff(doc, oldDoc);
    if(oldDoc != null){
      console.log('Save, changes: ', changes);

      // console.log('ARE THERE CHANGES: ', changes);
      if(isEqual(oldDoc, doc)){
        // console.log('NO Changes');
        return false; // we have no need to save, maybe here we need something else, like a message
      }
    }


    let res;
    try {
      doc.updated = Date.now();

      if(doc._id == null){
        doc._id = generateCollectionId(collection);
        console.log(doc);
        res = await this._pouch.put(doc);
      }
      else{
        // try getting the doc and merge it
        const old = await this._pouch.get(doc._id);
        console.log('Got old doc: ', old);

        res = await this._pouch.put({...old, ...doc});
      }
      console.log('Saved doc: ', res);
      if(res.ok)
        return res;
      else
        return false;
    }
    catch(e) {
      console.log('Save Pouch Error:: ', e);
      return false;
    }
  }

  async getDoc(id:string): Promise<any> {
    try {
      const doc = await this._pouch.get(id);
      console.log('Get Doc Loaded: ', doc);
      return doc;
    }
    catch(e){
      console.log('Get Doc Error: ', e);
      return null;
    }
  }

  async findDocsByCategory(id:string): Promise<any> {
    try {
      const docs = await this._pouch.find({
        selector: {
          category: {$eq: id}
        }
      });
      console.log('Found docs by category::: ', docs);

      return docs.docs;
    }
    catch(e){
      console.log('Error finding docs: ', e);
      return [];
    }
  }

  async findDocsByProperty(value, prop:string): Promise<any> {
    try {

      const query = { [prop]: {$eq: value}};
      console.log('Query: ', query);


      const docs = await this._pouch.find({
        selector: {
          [prop]: {$eq: value}
        }
      });
      console.log('Found docs by property::: ', value, prop, docs);

      return docs.docs;
    }
    catch(e){
      console.log('Error finding docs by property: ', e, value, prop);
      return [];
    }
  }

  async findAllDocsByPropertyNotNull(prop:string): Promise<any> {
    try {
      const docs = await this._pouch.find({
        selector: {
          [prop]: {'$gt': 0}
        }
      });
      console.log('Found docs not null by property::: ', prop, docs);

      return docs.docs;
    }
    catch(e){
      console.log('Error finding not null docs by property: ', e,  prop);
      return [];
    }
  }

  private async  initPouch(pouchName:string,
                    syncRemote:boolean=false,
                    mergeOldData:boolean=false):Promise<any> {

    console.log('DataProvider->initDB localName: '+JSON.stringify(pouchName));

    let olddocs;

    if(mergeOldData){
      // if we are merging, first get all the data
      olddocs = await this.getAllDocs();
    }

    this._pouch = await new PouchDB(pouchName, this._localPouchOptions);

    await this._pouch.createIndex({
        index: {
          fields: ['category']
        }
    });
    await this._pouch.createIndex({
        index: {
          fields: ['today']
        }
    });
    await this._pouch.createIndex({
        index: {
          fields: ['important']
        }
    });
    await this._pouch.createIndex({
        index: {
          fields: ['dueDate']
        }
    });
    await this._pouch.createIndex({
        index: {
          fields: ['remindDate']
        }
    });

    window['PouchDB'] = PouchDB;// make it visible for chrome extension

      // create our event subject
    this._pouch.changes({live: true, since: 'now', include_docs:true})
        .on('change', change => {
          console.log('Pouch on change', change);
          this._changes.next(change.doc);
    });

    if(syncRemote){
      console.log('USER::: ', this._user);
      const remoteDB = new PouchDB(environment.couch_db,
        {headers:{ 'x-access-token': this._user.token} });

      const opts = {
        live: false,
        retry: false
      };
      this._pouch.replicate.to(remoteDB, opts);
      this._pouch.replicate.from(remoteDB, opts)
       .on('change', function (change) {
        console.log('Remote Sync: ', change);
      }).on('error', function (err) {
        console.log('Remote Error: ', err);
        // yo, we got an error! (maybe the user went offline?)
      }).on('complete', function () {
        console.log('Remote Sync Completed ');
      }).on('paused', function (info) {
        console.log('Remote Sync PAUSED: ', info);
        // replication was paused, usually because of a lost connection
      }).on('active', function (info) {
        console.log('Remote Sync ACTIVE: ', info);
      });
    }

    // load the docs into new pouch db
    if(mergeOldData){
      olddocs.forEach(doc => {
        this.save(doc);
      });
    }
    this.ready = true;
    this._pouchReady.next(true);
    this.createSettingsDoc();
  }

  async createSettingsDoc(){
    console.log('%%%%%%% Create Settings Doc: ');
    const settings = await this.getDoc('settings');
    console.log('Settings:: ', settings);
    if(!settings){
      this.save({
        _id: 'settings',
        specialCollections:{
          today: {
            showCompleted: false
          },
          important: {
            showCompleted: false
          },
          tasks: {
            showCompleted: false
          }
        }
      });
    }

  }

}
