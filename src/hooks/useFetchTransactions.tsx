import {TransactionItem, TransactionsResponse} from '@/types/types';
import {urls} from '@/utils/constants.json';
import {useEffect, useState} from 'react';

export const useFetchTransactions = (): [
  boolean,
  boolean,
  TransactionItem[] | undefined,
] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [transactionsList, setTransactionList] = useState<TransactionItem[]>();

  const prepareTransactionsArray = (
    responseObj: TransactionsResponse,
  ): void => {
    const keys = Object.keys(responseObj);
    const transactions: TransactionItem[] = [];
    keys.forEach((key: string) => {
      transactions.push(responseObj[key]);
    });
    setTransactionList(transactions);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(urls.fetchTransactions)
      .then(res => res.json())
      .then((res: TransactionsResponse) => {
        setIsLoading(false);
        setIsError(false);
        prepareTransactionsArray(res);
      })
      .catch(e => {
        console.warn(e);
        setIsError(true);
        setIsLoading(false);
        prepareTransactionsArray({});
      });
  }, []);

  return [isLoading, isError, transactionsList];
};
