type Token = { token: string };
type ChangeValue = 'password' | 'name' | null;
type ModalAdd = 'column' | 'task' | 'board';
type PartString = Partial<string | undefined>;

export {
  Token,
  ChangeValue,
  ModalAdd,
  PartString
}