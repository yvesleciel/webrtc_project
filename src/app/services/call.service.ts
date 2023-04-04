import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue, update} from "firebase/database";
import {CallBackFn} from "../interfaces/CallBackFn";


@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor() { }

  writeOfferOrAnswerOrIce(nodeName:string, data:any) {
    const db = getDatabase();
    console.log(db)
    return update(ref(db, 'calls/' + nodeName), {
      data:data,
    });
  }

  getOfferOrAnswerOrIce(nodeName:string, callBack: CallBackFn){
    const db = getDatabase();
    const callRef = ref(db, 'calls/' + nodeName + '/data');
    onValue(callRef, (snapshot)=>{
      console.log(snapshot.val())
      callBack.callBackFn(snapshot.val());
    })
  }

  resetData(){
    const db = getDatabase();
    set(ref(db, 'calls/'), null)
  }
}

