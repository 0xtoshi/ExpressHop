DELETE FROM addressesMetadataAllUsers WHERE addressesMetadataAllUsers.address NOT IN (SELECT e.address FROM eligibleAddresses e);
DELETE FROM finalDistribution WHERE finalDistribution.address NOT IN (SELECT e.address FROM eligibleAddresses e);
DELETE FROM transferSentETH WHERE transferSentETH.address_from NOT IN (SELECT e.address FROM eligibleAddresses e);
DELETE FROM transferSentARB WHERE transferSentARB.address_from NOT IN (SELECT e.address FROM eligibleAddresses e);
DELETE FROM transferSentOP WHERE transferSentOP.address_from NOT IN (SELECT e.address FROM eligibleAddresses e);
DELETE FROM transferSentPOLY WHERE transferSentPOLY.address_from NOT IN (SELECT e.address FROM eligibleAddresses e);
DELETE FROM transferSentXDAI WHERE transferSentXDAI.address_from NOT IN (SELECT e.address FROM eligibleAddresses e);