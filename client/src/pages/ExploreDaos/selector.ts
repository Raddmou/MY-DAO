export const exploreDaoSelector = (state: any) => ({
    // citizensCount: state.citizens.citizensCount,
    // citizenNote: state.citizens.citizenNote,
    daosCount: state.daos.daosCount,
    daoNote: state.daos.daoNote,
    account: state.application.account,
    chainId: state.application.chainId,
    contract: state.application.contract,
});