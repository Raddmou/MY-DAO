export const homeSelector = (state: any) => ({
    citizensCount: state.citizens.citizensCount,
    citizenNote: state.citizens.citizenNote,
    account: state.application.account,
    chainId: state.application.chainId,
    contract: state.application.contract,
});