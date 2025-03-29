/* Autogenerated file. Do not edit manually. */
/* tslint:disable */

import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export interface InfoContractInterface extends utils.Interface {
  functions: {
    'setInfo(string,uint256)': FunctionFragment;
    'sayHi()': FunctionFragment;
    'getInfo()': FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: 'setInfo' | 'sayHi' | 'getInfo'): FunctionFragment;

  encodeFunctionData(functionFragment: 'setInfo', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'sayHi', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getInfo', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'setInfo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sayHi', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getInfo', data: BytesLike): Result;

  events: {
    'Instructor(string,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Instructor'): EventFragment;
}

export interface InstructorEventObject {
  name: string;
  age: BigNumber;
}
export type InstructorEvent = TypedEvent<[string, BigNumber], InstructorEventObject>;

export type InstructorEventFilter = TypedEventFilter<InstructorEvent>;

export interface InfoContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: InfoContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    setInfo(
      _name: string,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;

    sayHi(overrides?: CallOverrides): Promise<[string]>;

    getInfo(overrides?: CallOverrides): Promise<[string, BigNumber]>;
  };

  setInfo(
    _name: string,
    _age: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  sayHi(overrides?: CallOverrides): Promise<string>;

  getInfo(overrides?: CallOverrides): Promise<[string, BigNumber]>;

  callStatic: {
    setInfo(_name: string, _age: BigNumberish, overrides?: CallOverrides): Promise<void>;

    sayHi(overrides?: CallOverrides): Promise<string>;

    getInfo(overrides?: CallOverrides): Promise<[string, BigNumber]>;
  };

  filters: {
    'Instructor(string,uint256)'(name?: null, age?: null): InstructorEventFilter;
    Instructor(name?: null, age?: null): InstructorEventFilter;
  };

  estimateGas: {
    setInfo(
      _name: string,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;

    sayHi(overrides?: CallOverrides): Promise<BigNumber>;

    getInfo(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    setInfo(
      _name: string,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    sayHi(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
