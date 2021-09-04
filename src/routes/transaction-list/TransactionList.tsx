import LoadingIndicator from '@/components/common/loading-indicator/LoadingIndicator';
import {OverlayRadioButtons} from '@/components/common/overlay-radio-buttons/OverlayRadioButtons';
import {SearchBox} from '@/components/common/search-box/SearchBox';
import {TransactionListItem} from '@/components/common/transaction-list-item/TransactionListItem';
import {useFetchTransactions} from '@/hooks/useFetchTransactions';
import {
  RadioButtonOption,
  TransactionItem,
  TransactionListItemProps,
  TransactionListScreenNavigationProp,
} from '@/types/types';
import {compare, getDatesForCompare} from '@/utils';
import {
  colors,
  overlayRadioPopupMenuKeys,
  screenTitles,
  strings,
} from '@/utils/constants.json';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
  noResultsFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  noResultsText: {
    fontSize: 18,
    color: colors.uiOrange,
  },
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: 36,
      },
      default: {
        marginBottom: 0,
      },
    }),
  },
  searchBoxContainer: {
    margin: 5,
    height: 48,
    backgroundColor: colors.uiWhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  sortText: {
    color: colors.uiOrange,
    paddingHorizontal: 5,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
});

export const TransactionList: React.FC<TransactionListItemProps> =
  (): JSX.Element => {
    const navigation = useNavigation<TransactionListScreenNavigationProp>();
    const [transactionList, setTransactionList] = useState<TransactionItem[]>();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOptionSelected, setSortOptionSelected] = useState<number>(0);
    const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
    const [isLoading, isError, transactions] = useFetchTransactions();
    const sortOptions: RadioButtonOption[] = [
      {
        key: overlayRadioPopupMenuKeys.noSort,
        value: 0,
        label: strings.noSortSelected,
      },
      {
        key: overlayRadioPopupMenuKeys.sortByNameAscending,
        value: 1,
        label: strings.sortByNameAscending,
      },
      {
        key: overlayRadioPopupMenuKeys.sortByNameDescending,
        value: 2,
        label: strings.sortByNameDescending,
      },
      {
        key: overlayRadioPopupMenuKeys.sortByDateNewest,
        value: 3,
        label: strings.sortByDateNewest,
      },
      {
        key: overlayRadioPopupMenuKeys.sortByDateOldest,
        value: 4,
        label: strings.sortByDateOldest,
      },
    ];

    useEffect(() => {
      navigation.setOptions({headerTitle: screenTitles.transactionList});
    }, [navigation]);

    const handleItemPress = useCallback(
      (transaction: TransactionItem) => {
        navigation.navigate({
          name: 'TransactionDetails',
          params: {transaction: transaction},
        });
      },
      [navigation],
    );

    const renderTransactionItem: ListRenderItem<TransactionItem> = useCallback(
      ({item}): JSX.Element => {
        return <TransactionListItem onPress={handleItemPress} data={item} />;
      },
      [handleItemPress],
    );

    const EmptyListComponent = (): JSX.Element => (
      <View style={styles.noResultsFoundContainer}>
        <Text style={styles.noResultsText}>{strings.noResultsFound}</Text>
      </View>
    );

    const keyExtractor = useCallback(
      (_item: TransactionItem): string => _item.unique_code.toString(),
      [],
    );

    const filterTransactions = (
      query: string,
    ): TransactionItem[] | undefined => {
      const filteredData = transactions?.filter(
        item =>
          item.beneficiary_name.toLowerCase().includes(query.toLowerCase()) ||
          item.beneficiary_bank.toLowerCase().includes(query.toLowerCase()) ||
          item.sender_bank.toLowerCase().includes(query.toLowerCase()) ||
          item.amount.toString().toLowerCase().includes(query.toLowerCase()),
      );
      return filteredData;
    };

    const getSortedTransactions = (
      data?: TransactionItem[],
    ): TransactionItem[] | undefined => {
      if (!data) {
        return undefined;
      }
      let sortedData: TransactionItem[];
      switch (sortOptionSelected) {
        case 1:
          sortedData = data.sort((item1, item2) =>
            compare(item1.beneficiary_name, item2.beneficiary_name),
          );
          return sortedData;
        case 2:
          sortedData = data
            .sort((item1, item2) =>
              compare(item1.beneficiary_name, item2.beneficiary_name),
            )
            .reverse();
          return sortedData;
        case 3:
          sortedData = data.sort((item1, item2) => {
            const [date1, date2] = getDatesForCompare(
              item1.completed_at,
              item2.completed_at,
            );
            return compare(date1.getTime(), date2.getTime());
          });
          return sortedData;
        case 4:
          sortedData = data
            .sort((item1, item2) => {
              const [date1, date2] = getDatesForCompare(
                item1.completed_at,
                item2.completed_at,
              );
              return compare(date1.getTime(), date2.getTime());
            })
            .reverse();
          return sortedData;
        default:
          return data;
      }
    };

    const handleOnChange = useCallback(
      (value: string, isDelayed?: boolean): void => {
        if (isDelayed) {
          setSearchQuery(value);
        }
      },
      [],
    );

    useEffect(() => {
      const filteredData = filterTransactions(searchQuery);
      const sortedData = getSortedTransactions(filteredData);
      setTransactionList(sortedData); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOptionSelected, transactions, searchQuery]);

    const onOptionSelected = useCallback(
      (selectedOption: RadioButtonOption) => {
        setSortOptionSelected(selectedOption.value);
        setIsOverlayVisible(false);
      },
      [],
    );

    return (
      <>
        <View style={styles.container}>
          <View style={styles.searchBoxContainer}>
            <SearchBox
              onChange={handleOnChange}
              placeHolderText={strings.searchBarPlaceHolder}
              iconComponent={
                <Icon name={'search'} size={36} color={colors.uiGray} />
              }
              deBounce={500}
            />
            <TouchableOpacity
              style={styles.sortFilterButton}
              onPress={() => {
                setIsOverlayVisible(true);
              }}>
              <Text style={styles.sortText}>
                {sortOptions[sortOptionSelected].label}
              </Text>
              <EntypoIcon
                name={'chevron-thin-down'}
                size={20}
                color={colors.uiOrange}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            {isError && EmptyListComponent}
            {isLoading || !transactionList ? (
              <LoadingIndicator />
            ) : (
              transactionList && (
                <FlatList
                  data={transactionList}
                  renderItem={renderTransactionItem}
                  keyExtractor={keyExtractor}
                  ListEmptyComponent={EmptyListComponent}
                />
              )
            )}
          </View>
          <OverlayRadioButtons
            isVisible={isOverlayVisible}
            options={sortOptions}
            selectedOption={sortOptionSelected}
            onOptionSelected={onOptionSelected}
            onCancel={() => {
              setIsOverlayVisible(false);
            }}
          />
        </View>
      </>
    );
  };
