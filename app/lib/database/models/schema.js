import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'posts',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string', isOptional: true },
        { name: 'body', type: 'string' },
        { name: 'is_pinned', type: 'boolean' },
      ]
    }),
    tableSchema({
      name: 'comments',
      columns: [
        { name: 'body', type: 'string' },
        { name: 'post_id', type: 'string', isIndexed: true },
      ]
    }),
    tableSchema({
      name: 'user',
      columns: [
      ]
    }),
    tableSchema({
      name: 'room',
      columns: [
      ]
    }),
    tableSchema({
      name: 'subscriptions',
      columns: [
        { name: '_id', type: 'string', isIndexed: true },
        { name: 'badgeUnread', type: 'string' },
        { name: 'exUpdatedAt', type: 'string' },
        { name: 'lastMessage', type: 'string', isOptional: true},
        { name: 'lastMessages', type: 'string', isOptional: true},
        { name: 'lm', type: 'string' },
        { name: 'name', type: 'string', isIndexed: true },
        { name: 'open', type: 'boolean', isOptional: true },
        { name: 'rid', type: 'string', isIndexed: true },
        { name: 'status', type: 'string' },
        { name: 'subName', type: 'string', isIndexed: true },
        { name: 'hasMeetInvite', type: 'boolean' },
        { name: 't', type: 'string', isIndexed: true },
        { name: 'u', type: 'string' },
        { name: 'unread', type: 'number' },
        { name: 'username', type: 'string', isIndexed: true },
      ]
    }),
  ]
})