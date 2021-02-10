interface DummyDataTypes {
  count: number;
  title: string;
  time: string;
  edited: string;
}

interface DummyColumnTypes {
  Header: string;
  accessor: string;
  className: string;
  sortable: boolean;
  width?: number
}

export const DUMMY_COLUMN: any[] = [
  {
    'Header': 'Contact Name',
    'accessor': 'title',
    'className': 'font-bold',
    'sortable': true
  },
  {
    'Header': 'Email',
    'accessor': 'edited',
    'className': 'font-bold',
    'sortable': true
  },
  {
    'Header': 'Phone',
    'accessor': 'count',
    'className': 'font-bold',
    'sortable': true,
    'width': 100
  },
]

export const DUMMY_DATA: any[] = [
  {
    'count': 1,
    'title': 'test1',
    'time': new Date().toString(),
    'edited': 'user1',
  },
  {
    'count': 2,
    'title': 'test2',
    'time': new Date().toString(),
    'edited': 'user2',
  },
  {
    'count': 3,
    'title': 'test3',
    'time': new Date().toString(),
    'edited': 'user3',
  },
  {
    'count': 4,
    'title': 'test4',
    'time': new Date().toString(),
    'edited': 'user4',
  },
  {
    'count': 5,
    'title': 'test5',
    'time': new Date().toString(),
    'edited': 'user5',
  },
  {
    'count': 6,
    'title': 'test6',
    'time': new Date().toString(),
    'edited': 'user6',
  },
  {
    'count': 7,
    'title': 'test7',
    'time': new Date().toString(),
    'edited': 'user7',
  },
  {
    'count': 8,
    'title': 'test8',
    'time': new Date().toString(),
    'edited': 'user8',
  },
  {
    'count': 9,
    'title': 'test9',
    'time': new Date().toString(),
    'edited': 'user9',
  },
  {
    'count': 10,
    'title': 'test10',
    'time': new Date().toString(),
    'edited': 'user10',
  },
  {
    'count': 11,
    'title': 'test11',
    'time': new Date().toString(),
    'edited': 'user11',
  },
  {
    'count': 12,
    'title': 'test12',
    'time': new Date().toString(),
    'edited': 'user12',
  },
  {
    'count': 13,
    'title': 'test13',
    'time': new Date().toString(),
    'edited': 'user13',
  },
  {
    'count': 14,
    'title': 'test14',
    'time': new Date().toString(),
    'edited': 'user14',
  },
  {
    'count': 15,
    'title': 'test15',
    'time': new Date().toString(),
    'edited': 'user15',
  },
  {
    'count': 16,
    'title': 'test16',
    'time': new Date().toString(),
    'edited': 'user16',
  },
]