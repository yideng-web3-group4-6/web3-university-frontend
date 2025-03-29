/*
// 以下是使用 immer 库的示例 
const [person, updatePerson] = useImmer({
  name: "Jack",
  age: 20,
});
function updateName(name) {
  updatePerson((draft) => {
    draft.name = name;
  });
}

{name: 'ldh'}
updatePerson({name: 'ldh'})
*/

// 以下是实现了 useImmer 函数
import { useCallback, useState } from 'react';
import { freeze, produce, Draft } from 'immer';

// 为了让 useImmer 函数支持泛型，我们需要定义一些类型
// DraftFunction 是一个函数签名，接收一个 draft 参数，返回 void
export type DraftFunction<S> = (draft: Draft<S>) => void;
// Updater 是一个函数签名，接收一个参数，可以是一个值或者 DraftFunction
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
// ImmerHook 是一个数组，包含两个元素，第一个元素是状态值，第二个元素是更新状态的函数
export type ImmerHook<S> = [S, Updater<S>];
// 函数的签名
// useImmer 函数接收一个参数，可以是一个值或者一个函数，返回一个 ImmerHook
export function useImmer<S = unknown>(initValue: S | (() => S)): ImmerHook<S>;
// 函数的实现
export function useImmer<T>(initValue: T) {
  const [val, updateValue] = useState(() =>
    // 原来初始化的对象是不可变的，这里使用 freeze 方法进行冻结
    freeze(typeof initValue === 'function' ? initValue() : initValue, true),
  );

  // useImmer 函数的实现，返回一个数组，第一个元素是状态值，第二个元素是更新状态的函数
  return [
    val,
    // 更新状态的函数接收一个参数，可以是一个值或者一个函数，如果参数是一个函数，那么使用 produce 函数处理这个函数
    useCallback((updater: T | DraftFunction<T>) => {
      if (typeof updater === 'function') {
        updateValue(produce(updater as DraftFunction<T>));
      } else {
        // 如果参数是一个值，那么使用 freeze 函数处理这个值
        updateValue(freeze(updater));
      }
    }, []),
  ];
}
