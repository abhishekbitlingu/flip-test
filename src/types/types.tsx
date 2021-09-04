import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ColorValue} from 'react-native';

export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetails: {
    transaction: TransactionItem;
  };
};

export type TransactionListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TransactionList'
>;

export type TransactionListScreenRouteProp = RouteProp<
  RootStackParamList,
  'TransactionList'
>;

export type TransactionListProps = {
  route: TransactionListScreenRouteProp;
  navigation: TransactionListScreenNavigationProp;
};

export type TransactionDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TransactionDetails'
>;

export type TransactionDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>;

export type TransactionDetailsProps = {
  route: TransactionDetailsScreenNavigationProp;
  navigation: TransactionDetailsScreenRouteProp;
};

export type TransactionItem = {
  id: string;
  amount: number;
  unique_code: number;
  status: string;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
};

export type TransactionsResponse = {
  [key: string]: TransactionItem;
};

export type OverlayProps = {
  isVisible: boolean;
  onMaskTapped: () => void;
};

export type OverlayRadioButtonsProps = {
  isVisible: boolean;
  options: RadioButtonOption[];
  onOptionSelected: (selectedOption: RadioButtonOption) => void;
  onCancel: () => void;
  selectedOption: number;
};

export type RadioButtonOption = {
  key: string;
  value: number;
  label: string;
};

export type SearchBoxProps = {
  onChange: (value: string, isDelayed?: boolean) => void;
  onFocus?: () => void;
  onSubmitEditing?: (text: string) => void;
  autoFocus?: boolean;
  maxLength?: number;
  value?: string;
  numKeyboard?: boolean;
  placeHolderText?: string;
  iconComponent?: JSX.Element;
  placeholderTextColor?: ColorValue;
  deBounce?: number;
};

export type TransactionListItemProps = {
  data: TransactionItem;
  onPress: (transaction: TransactionItem) => void;
};
