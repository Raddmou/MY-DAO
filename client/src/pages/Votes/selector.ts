export const VotesSelector = (state: any) => ({
    voteSessions: state.daos.voteSessions,
    voteModule: state.daos.voteModule,
    daoNote: state.daos.daoNote,
    account: state.application.account,
    contract: state.application.contract,
});