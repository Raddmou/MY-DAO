export const homeSelector = (state: any) => ({
    // citizensCount: state.citizens.citizensCount,
    // citizenNote: state.citizens.citizenNote,
    daosCount: state.daos.daosCount,
    daoNote: state.daos.daoNote,
    voteSessions: state.daos.voteSessions,
    account: state.application.account,
    chainId: state.application.chainId,
    contract: state.application.contract,
});