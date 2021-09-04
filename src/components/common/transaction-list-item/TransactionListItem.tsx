import {TransactionListItemProps} from '@/types/types';
import {colors} from '@/utils/constants.json';
import {getFormatteddate, toTitleCase} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import OctIcon from 'react-native-vector-icons/Octicons';

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'stretch',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderLeftWidth: 8,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.uiWhite,
    padding: 10,
  },
  transactionDetailsContainer: {
    flex: 4,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  senderToBeneficiaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  bankNameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  arrowIcon: {
    marginHorizontal: 5,
  },
  beneficiarynametext: {
    fontSize: 14,
    paddingVertical: 2,
  },
  amountAndDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  transactionStatusContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionStatusText: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 2,
    overflow: 'hidden',
    fontWeight: '500',
    fontSize: 13,
  },
});
export const TransactionListItem: React.FC<TransactionListItemProps> = (
  props,
): JSX.Element => {
  const isTransactionSuccessful = props.data.status.toLowerCase() === 'success';
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderLeftColor: isTransactionSuccessful
            ? colors.uiGreen
            : colors.uiOrange,
        },
      ]}
      onPress={() => {
        props.onPress(props.data);
      }}>
      <View style={styles.contentContainer}>
        <View style={styles.transactionDetailsContainer}>
          <View style={styles.senderToBeneficiaryContainer}>
            <Text style={styles.bankNameText}>{props.data.sender_bank}</Text>
            <FontistoIcon
              style={styles.arrowIcon}
              name="arrow-right"
              size={12}
              color={colors.uiBlack}
            />
            <Text style={styles.bankNameText}>
              {props.data.beneficiary_bank}
            </Text>
          </View>
          <Text style={styles.beneficiarynametext}>
            {props.data.beneficiary_name}
          </Text>
          <View style={styles.amountAndDateContainer}>
            <Text style={styles.beneficiarynametext}>
              {'Rp' + props.data.amount}
            </Text>
            <OctIcon
              style={styles.arrowIcon}
              name="primitive-dot"
              size={12}
              color={colors.uiBlack}
            />
            <Text style={styles.beneficiarynametext}>
              {getFormatteddate(props.data.completed_at)}
            </Text>
          </View>
        </View>
        <View style={styles.transactionStatusContainer}>
          <Text
            style={[
              styles.transactionStatusText,
              {
                borderColor: isTransactionSuccessful
                  ? colors.uiGreen
                  : colors.uiOrange,
                backgroundColor: isTransactionSuccessful
                  ? colors.uiGreen
                  : colors.uiWhite,
                color: isTransactionSuccessful
                  ? colors.uiWhite
                  : colors.uiBlack,
              },
            ]}>
            {toTitleCase(props.data.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
