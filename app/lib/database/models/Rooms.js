import {Model, Q} from '@nozbe/watermelondb';
import Database from '@nozbe/watermelondb/Database';
import {field, text, date, json, writer} from '@nozbe/watermelondb/decorators';
export const TABLE_SUBSCRIPTIONS = 'subscriptions';
const sanitizeReactions = json => json;
export default class Rooms extends Model {
  static table = TABLE_SUBSCRIPTIONS;

  @field('_id') _id;

  @field('badgeUnread') badgeUnread;

  @date('exUpdatedAt') exUpdatedAt;

  @json('lastMessage', sanitizeReactions) lastMessage;

  @json('lastMessages', sanitizeReactions) lastMessage;

  @date('lm') lm;

  @field('name') name;

  @field('open') open;

  @field('rid') rid;

  @field('status') subName;

  @field('subName') hasMeetInvite;

  @field('hasMeetInvite') hasMeetInvite;

  @field('t') t;

  @json('u', sanitizeReactions) u;

  @field('unread') unread;

  @json('username', sanitizeReactions) username;


   static msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days"
  }
  
  /**
   *
   * @param {*} database
   * @param {*} _subscription
   */
  static syncSubscriptions = async (database, _subscriptions) => {
    const batchActions = [];
    const subscriptionsCollection = database.get(TABLE_SUBSCRIPTIONS);

    for(let _subscription of _subscriptions) {
      const {_id} = _subscription || {};
      if (!_id) return false;
      const subscriptionsFind = await subscriptionsCollection.query(
        Q.where('_id', _id),
      );
      // console.log('createRoom:::update start', subscriptionsFind);
      if (subscriptionsFind.length > 0) {
        const idWt = subscriptionsFind[0].id;
        const subscription = await subscriptionsCollection.find(idWt);
        batchActions.push(
          subscription.prepareUpdate(subscription => {
            subscription._id = _subscription._id;
            subscription.badgeUnread = _subscription.badgeUnread;
            subscription.exUpdatedAt = _subscription.exUpdatedAt;
            subscription.lastMessage = _subscription.lastMessage;
            subscription.lastMessages = _subscription.lastMessages;
            subscription.lm = _subscription;
            subscription.name = _subscription.name;
            subscription.open = _subscription.open;
            subscription.rid = _subscription.rid;
            subscription.status = _subscription.status;
            subscription.subName = _subscription.subName;
            subscription.hasMeetInvite = _subscription.hasMeetInvite;
            subscription.t = _subscription.t;
            subscription.u = _subscription.u;
            subscription.username = _subscription.username;
          })
        );
      } else {
        batchActions.push(
          subscriptionsCollection.prepareCreate(subscription => {
            subscription._id = _subscription._id;
            subscription.badgeUnread = _subscription.badgeUnread;
            subscription.exUpdatedAt = _subscription.exUpdatedAt;
            subscription.lastMessage = _subscription.lastMessage;
            subscription.lastMessages = _subscription.lastMessages;
            subscription.lm = _subscription;
            subscription.name = _subscription.name;
            subscription.open = _subscription.open;
            subscription.rid = _subscription.rid;
            subscription.status = _subscription.status;
            subscription.subName = _subscription.subName;
            subscription.hasMeetInvite = _subscription.hasMeetInvite;
            subscription.t = _subscription.t;
            subscription.u = _subscription.u;
            subscription.username = _subscription.username;
          })
        );
      }
    }
   
    var startTime = this.msToTime(new Date(Date.now()).getMilliseconds());
    await database.write(async () => {
      database.batch(batchActions);
    })
    var endTime =this.msToTime(new Date(Date.now()).getMilliseconds());

    console.log('startTime:::',startTime)
    console.log('endTime:::',endTime)
  };
}
