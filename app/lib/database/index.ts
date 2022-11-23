import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {schema} from './models/schema';
import migrations from './models/migrations';
import Post from './models/Post';
import Comment from './models/Comment';
import User from './models/User';
import Rooms from './models/Rooms';
import Room from './models/Room';

export class DB {
  adapter: SQLiteAdapter;
  database: Database;

  constructor() {
    // First, create the adapter to the underlying database:
    this.adapter = new SQLiteAdapter({
      schema,
      // (You might want to comment it out for development purposes -- see Migrations documentation)
      migrations,
      // (optional database name or file system path)
      // dbName: 'myapp',
      // (recommended option, should work flawlessly out of the box on iOS. On Android,
      // additional installation steps have to be taken - disable if you run into issues...)
      jsi: true /* Platform.OS === 'ios' */,
      // (optional, but you should implement this method)
      onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
      },
    });

    // Then, make a Watermelon database from it!
    this.database = new Database({
      adapter: this.adapter,
      modelClasses: [Post, Comment, User, Rooms, Room],
    });
  }
}
