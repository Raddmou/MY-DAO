# Avoiding Common Attacks

Measures taken to counter attacks and avoid security breaches of created smart contracts.

## Ownable
We extensively use Ownable of OppenZippelin and a custom modifier to set access to certain functions

## Re-Entrancy
We extensively use reentrancyGuard of OppenZippelin and modifiers to prevent re-entrancy calls of payable functions.

## Signature Replay
We don't use Signature

## Arithmetic Overflow and Underflow
We used SaFeMath from @openzeppelin to revert and throw and error on overflow and underflow.

## Accessing Private Data
My-DAO does not store any sensitive and private data. Only essential data to contracts are stored, such as addresses of members.

## Delegatecall
We do not use delegatecall.

## Source of Randomness
We do not use block.timestamp to compute a random number.

## Denial of Service
We use a maximum of 10 iterations when create the dao

## Phishing with tx.origin
We do not use directly tx.origin in our contracts.

## Floating pragma
Pragma is set as ^0.8.9

## Returns values
We check every returns values

## Block Timestamp Manipulation
We don't use block.timestamp as a random number. We use it to store the information "creation time vote".

## Calls to untrusted sources
All calls to other contract are trust contracts

## Call to the unknown
We don't use call et delegatecall functions.