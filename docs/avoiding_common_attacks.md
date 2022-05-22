# Avoiding Common Attacks

Measures taken to counter attacks and avoid security breaches of created smart contracts.

# Tools


## Re-Entrancy
We extensively use reentrancyGuard of OppenZippelin and modifiers to prevent re-entrancy calls of payable functions and some non-payable functions in our contracts.

## Signature Replay


## Pausable


## Arithmetic Overflow and Underflow
We used SaFeMath from @openzeppelin to revert and throw and error on overflow and underflow.

## Selfdestruct


## Accessing Private Data
My-DAO does not store any sensitive and private data. Only essential data to contracts are stored, such as addresses of members.

## Delegatecall
We do not use delegatecall.


## Source of Randomness
We do not use block.timestamp to compute a random number.

## Denial of Service


## Phishing with tx.origin
We do not use directly tx.origin in our contracts.


## Block Timestamp Manipulation
We don't use block.timestamp as a random number. We use it to store the information "creation time vote".

# Call to the unknown
We don't use call et delegatecall functions.