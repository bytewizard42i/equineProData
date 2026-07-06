const { runStructuralTests } = require('../../midnight-modules/tests/structural-test-helper.cjs');
const path = require('path');

runStructuralTests('equineProData', path.join(__dirname, '..', 'build', 'equineProData', 'contract', 'index.d.ts'), {
  expected: ['deactivateHorse', 'getBreedingRecord', 'getHorseRecord', 'getShareBalance', 'grantFolderAccess', 'hasFolderAccess', 'isHorseActive', 'logEmergencyAccess', 'proveMinimumShareHolding', 'proveResearchEligible', 'recordBreeding', 'recordPerformance', 'registerHorse', 'revokeFolderAccess', 'setEmergencyPacket', 'setResearchConsent', 'setValuation', 'transferPrimaryOwnership', 'transferShares'],
  mustHave: ['registerHorse', 'transferPrimaryOwnership', 'transferShares', 'proveResearchEligible'],
});
