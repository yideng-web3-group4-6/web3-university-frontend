import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

interface User {
  name: string;
  age: number;
  skills: string[];
}
const initialUser: User = {
  name: '张三',
  age: 30,
  skills: ['React', 'TypeScript'],
};

export const todoCountAtom = atom(0);
export const userImmerAtom = atomWithImmer<User>(initialUser);
