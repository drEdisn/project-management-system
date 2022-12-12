enum Api {
  url = 'https://kanban-rest-production-e4de.up.railway.app/',
  user = 'users/',
  users = 'users',
  board = 'boards/',
  boards = 'boards',
  columns = 'columns',
  column = 'columns/',
  task = 'tasks/',
  tasks = 'tasks',
}

enum Auth {
  singin = 'signin',
  signup = 'signup',
}

enum WarnString {
  taskWarn = 'modal.task-warn',
  boardWarn = 'modal.board-warn',
  columnWarn = 'modal.column-warn',
  userWarn = 'modal.user-warn'
}

enum ConfirmModal {
  userChange = 'modal.user-change',
  noUserChange = 'modal.user-not-change',
  userCreate = 'modal.user-create',
  userExists = 'modal.user-exists',
  userNotFound = 'modal.user-not-found'
}

enum Errors {
  DISCONECT = 0,
  NOT_FOUND = 404,
}

export {
  Api,
  Auth,
  WarnString,
  ConfirmModal,
  Errors
};