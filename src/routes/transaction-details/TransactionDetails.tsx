import {
  TransactionDetailsProps,
  TransactionDetailsScreenNavigationProp,
  TransactionDetailsScreenRouteProp,
} from '@/types/types';
import {getFormatteddate} from '@/utils';
import {colors, screenTitles, strings} from '@/utils/constants.json';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginBottom: 36,
    backgroundColor: colors.uiWhite,
  },
  transactionIdContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  transactionIdText: {
    fontWeight: '700',
  },
  copyIcon: {
    paddingHorizontal: 5,
  },
  divider: {
    borderColor: colors.uiGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  transactionDetailsHeaderContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coverButton: {
    color: colors.uiOrange,
  },
  transactionDetailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  senderToBeneficiaryBankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  bankNameText: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 2,
  },
  arrowIcon: {
    marginHorizontal: 5,
  },
  leftPane: {
    width: '60%',
  },
  rightPane: {
    width: '40%',
  },
  detailsBold: {
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 2,
  },
  detailsNormal: {
    fontSize: 15,
    paddingVertical: 2,
  },
});

export const TransactionDetails: React.FC<TransactionDetailsProps> =
  (): JSX.Element => {
    const navigation = useNavigation<TransactionDetailsScreenNavigationProp>();
    const route = useRoute<TransactionDetailsScreenRouteProp>();
    const transactionDetails = route.params.transaction;

    useEffect(() => {
      navigation.setOptions({headerTitle: screenTitles.transactionDetails});
    }, [navigation]);

    return (
      <>
        <View style={styles.container}>
          <View style={styles.transactionIdContainer}>
            <Text style={styles.transactionIdText}>
              {strings.transactionId + transactionDetails.id}
            </Text>
            <TouchableOpacity>
              <MaterialIcon
                style={styles.copyIcon}
                name="content-copy"
                size={15}
                color={colors.uiOrange}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.transactionDetailsHeaderContainer}>
            <Text style={styles.transactionIdText}>
              {strings.transactionDetails}
            </Text>
            <TouchableOpacity>
              <Text style={styles.coverButton}>{strings.cover}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.transactionDetailsContainer}>
            <View style={styles.senderToBeneficiaryBankContainer}>
              <Text style={styles.bankNameText}>
                {transactionDetails.sender_bank}
              </Text>
              <FontistoIcon
                style={styles.arrowIcon}
                name="arrow-right"
                size={15}
                color={colors.uiBlack}
              />
              <Text style={styles.bankNameText}>
                {transactionDetails.beneficiary_bank}
              </Text>
            </View>
            <View style={styles.senderToBeneficiaryBankContainer}>
              <View style={styles.leftPane}>
                <Text style={styles.detailsBold}>
                  {transactionDetails.beneficiary_name.toUpperCase()}
                </Text>
                <Text style={styles.detailsNormal}>
                  {transactionDetails.account_number}
                </Text>
              </View>
              <View style={styles.rightPane}>
                <Text style={styles.detailsBold}>{strings.nominal}</Text>
                <Text style={styles.detailsNormal}>
                  {strings.rupiyah + transactionDetails.amount}
                </Text>
              </View>
            </View>
            <View style={styles.senderToBeneficiaryBankContainer}>
              <View style={styles.leftPane}>
                <Text style={styles.detailsBold}>
                  {strings.transferRemarks}
                </Text>
                <Text style={styles.detailsNormal}>
                  {transactionDetails.remark}
                </Text>
              </View>
              <View style={styles.rightPane}>
                <Text style={styles.detailsBold}>{strings.uniqueCode}</Text>
                <Text style={styles.detailsNormal}>
                  {transactionDetails.unique_code}
                </Text>
              </View>
            </View>
            <View style={styles.senderToBeneficiaryBankContainer}>
              <View>
                <Text style={styles.detailsBold}>{strings.dateOfTransfer}</Text>
                <Text style={styles.detailsNormal}>
                  {getFormatteddate(transactionDetails.completed_at)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };
