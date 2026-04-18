# EquinePro — On-Chain Contract

**Status**: MVP — compile-validated on `compactc v0.30.0` via the hosted Compact playground.
**Language pragma**: `>= 0.16 && <= 0.21`
**Last validated**: Apr 17, 2026

---

## What's Here

| File | Purpose | Exported circuits |
|------|---------|-------------------|
| `equineProData.compact` | Horse identity + health folders + **RWA ownership shares** + **breeding lineage** + **performance events** + valuation snapshots | `registerHorse`, `transferPrimaryOwnership`, `deactivateHorse`, `transferShares`, `getShareBalance`, `proveMinimumShareHolding`, `recordBreeding`, `getBreedingRecord`, `recordPerformance`, `setValuation`, `grantFolderAccess`, `revokeFolderAccess`, `hasFolderAccess`, `setEmergencyPacket`, `logEmergencyAccess`, `setResearchConsent`, `proveResearchEligible`, `getHorseRecord`, `isHorseActive` |

---

## Why Horses Need More Than PetProData

Horses are simultaneously four things:

1. **A living animal** — identity, health, emergency access (same pattern as pets)
2. **A financial asset** — fractional ownership, valuation snapshots, appraisal (RWA)
3. **An athlete** — race/show results, prize purses, placement history (performance)
4. **Breeding stock** — sire/dam lineage, foaling records, stud-fee economics

`petProData` handles (1). `equineProData` handles all four in one contract, because the privacy model and owner-authorization pattern are shared across all of them.

---

## The RWA Layer — What Makes This Contract Different

**Fractional ownership shares** are the keystone feature. At registration the primary owner specifies a total share count (e.g. 1000). They start with all 1000 shares. They can then `transferShares` in any amount to other wallets — creating a syndicate, selling breeding rights, or listing shares on an off-chain secondary market.

```
┌─ Primary owner (1000 shares) ──────────────────────┐
│                                                    │
│   transferShares(horseId, syndicateA, 300)         │
│   transferShares(horseId, syndicateB, 300)         │
│   transferShares(horseId, breedingHolding, 200)    │
│                                                    │
│   Result:                                          │
│     Primary owner :   200 shares                   │
│     syndicateA    :   300 shares                   │
│     syndicateB    :   300 shares                   │
│     breedingHolding :   200 shares                 │
└────────────────────────────────────────────────────┘
```

**ZK ownership proofs** via `proveMinimumShareHolding(horseId, holderKey, minShares)` — returns a Boolean. Use cases:
- Tournament / race-entry gating (e.g., "prove you own at least 10 shares to receive owner-badge access")
- Voting on stable / training decisions
- Revenue-share distribution (off-chain)
- Collateralized lending — prove you own enough of this horse to qualify

Critically: the contract does NOT reveal the full cap table. Share balances are keyed by `hash(horseId, holderKey)`, so only holders who know their own key can look up their balance. Observers can't enumerate all shareholders.

---

## Primary Owner vs Shareholders — Two Different Authorities

| Role | Who | What they can do |
|------|-----|------------------|
| **Primary Owner** | One wallet at a time (the `primaryOwnerKey` on the record) | All administrative actions: grant/revoke folder access, set emergency packet, record breeding, record performance, set valuation, transfer primary ownership, deactivate the horse. Starts with 100% shares but can sell them down. |
| **Shareholder** | Any wallet holding >= 1 share | `transferShares` to send their own shares; `getShareBalance` to read their own balance; `proveMinimumShareHolding` to prove holdings to third parties. Cannot administer the horse. |

This separation enables real-world patterns:
- **Trainer holds primary ownership** while a syndicate of investors holds shares
- **Breeding-rights holder gets shares** without needing administrative authority over health records
- **Primary ownership transfers** (e.g., horse moves from race training to stud) do NOT move shares — share-holders are unaffected by admin changes

---

## The 13 Equine Record Folders

Defined in `enum EquineFolder`, matching the schemas in `../schemas/`:

| Uint<8> | Folder | Typical contents |
|---------|--------|------------------|
| 0 | `IDENTITY` | Breed, coloring, registration number, markings |
| 1 | `VACCINES` | EEE/WEE/WNV, rabies, flu/rhino, strangles compliance |
| 2 | `CLINICAL` | Labs, imaging, diagnostic reports, treatment plans |
| 3 | `BREEDING` | Breeding soundness exams, stallion reports, mare repro |
| 4 | `LINEAGE` | Pedigree, DNA tests, parentage verification |
| 5 | `PERFORMANCE` | Race/show results, prize money, placements |
| 6 | `HOOF_DENTAL` | Farrier, trimming, dental floats |
| 7 | `TRANSPORT` | Health certificates, Coggins, travel papers |
| 8 | `INSURANCE` | Mortality, major medical, loss-of-use policies |
| 9 | `RESEARCH` | Study participation, opt-ins |
| 10 | `END_OF_LIFE` | Euthanasia, disposition |
| 11 | `REGISTRATION` | Breed registry papers (Jockey Club, AQHA, USEF) |
| 12 | `OWNERSHIP` | Sale docs, syndicate agreements, bill of sale |

---

## Breeding & Performance — One-Write and Append-Only Respectively

**Breeding records** (`recordBreeding`): one per horse. Parentage is immutable after recording — you can't change a foal's dam. Fails if a record already exists. Use for verifying pedigree claims in races, syndications, and breed-registry applications.

**Performance events** (`recordPerformance`): append-only log. Each event is keyed by `(horseId, timestamp)`. The `eventCommit` hashes off-chain event metadata (placement, prize purse, time, judge scores). Enables prize-money verification and performance-linked valuation.

**Valuation** (`setValuation`): snapshot — overwrites the prior appraisal. The `currentAppraisalCommit` + `lastAppraisedAt` give lenders and insurers a provenance trail for RWA-backed lending and claims.

---

## Key Workflows

### 1. Syndicate Formation
```
// Trainer registers the horse with 1000 shares, starts with all of them:
trainer.registerHorse(registrationCommit, chipCommit, RACING, 1000, now) → horseId

// Syndicate investors each buy in off-chain; trainer transfers shares:
trainer.transferShares(horseId, investor1, 100)
trainer.transferShares(horseId, investor2, 100)
// ... 10 investors each get 100 shares

// Trainer retains 0 shares but remains the primary owner for admin duties.
```

### 2. Breeding Registration
```
// Primary owner records parentage ONCE:
owner.recordBreeding(foalId, sireId, damId, foalingCommit, now)

// Now anyone can verify the foal's lineage:
const record = contract.getBreedingRecord(foalId)
// record.sireHorseId, record.damHorseId → usable for pedigree verification
```

### 3. Race Entry with Verified Ownership
```
// Race organizer requires minimum 10% stake for owner-entry privilege:
const minShares = 100  // 10% of 1000

// Investor proves eligibility in ZK:
contract.proveMinimumShareHolding(horseId, investorKey, minShares) → true
// Race organizer grants owner-level race-day access without learning
// the exact share count or the full cap table.
```

### 4. Veterinary Attestation Flow (same pattern as petProData)
```
// Primary owner grants vet time-bounded clinical access:
owner.grantFolderAccess(horseId, CLINICAL, vetKey, expiresAt, now)

// Vet attests new records via DIDz.io:
DIDz.attestToDid(horseId, pad(32, "COGGINS_2026"), testCommit, expiresAt, now)

// Access auto-expires; owner can force-revoke early:
owner.revokeFolderAccess(horseId, CLINICAL, vetKey)
```

### 5. RWA-Backed Lending
```
// Horse owner wants a loan against the horse as collateral.

// Borrower publishes current valuation:
owner.setValuation(horseId, appraisalCommit, now)

// Lender verifies:
//   1. Borrower is the primary owner (reads getHorseRecord(horseId))
//   2. Borrower owns >= X% of shares (proveMinimumShareHolding)
//   3. Current appraisal was updated recently (lastAppraisedAt)

// Loan terms are executed off-chain; the on-chain data anchors the
// collateral proof for the life of the loan.
```

### 6. Performance-Linked Revenue Distribution
```
// After a race, the primary owner logs the event:
trainer.recordPerformance(horseId, prizeEventCommit, now)

// Off-chain accounting:
//   - Each shareholder queries their share balance: getShareBalance(horseId, holder)
//   - Total shares is on-chain: horseRecord.totalShares
//   - Prize-money split = (shareholderBalance / totalShares) × prizePurse
//   - Distribution executes off-chain with on-chain audit trail
```

---

## Privacy Guarantees

| Layer | What's visible | To whom |
|-------|----------------|---------|
| Public ledger | Primary owner key, discipline class, total shares, registration time, performance event timestamps | Anyone reading the chain |
| Share ownership | Individual share balances are keyed by `hash(horseId, holderKey)` — only queryable if you know the holder key | Holders know their own; observers cannot enumerate |
| Private hashes | `registrationCommit`, `microchipCommit`, `emergencyPacketCommit`, `researchCohortCommit`, `currentAppraisalCommit`, `foalingCommit`, `eventCommit` | Opaque to observers; preimage held by authorized parties off-chain |
| Encrypted off-chain | Breed registry papers, pedigree details, actual clinical data, emergency packet contents, appraisal report, event placements | Only primary owner + active folder grantees |
| ZK predicates | `proveMinimumShareHolding`, `proveResearchEligible`, `hasFolderAccess` | Returned as Booleans — no data exposed |

---

## Integration With DIDzMonolith

**DIDz.io** — The same wallet key registers the horse on `DIDzRegistry` with `EntityType.ANIMAL`. Both IDs derive from the same inputs. DIDz.io's attestation mechanism handles per-record veterinary attestations.

**TrustedIssuerRegistry (DIDz.io)** — Breed registries (Jockey Club, AQHA, USEF), veterinary boards, and appraisal guilds register as Trusted Issuers in the `EQUINE` domain, enabling verifiers to gate attestations by issuer assurance level.

**KYCz** — Syndicate investors, breeders, and lenders prove their KYC before joining a cap table (off-chain gating at the UI layer; on-chain share transfers are permissionless at the contract level).

**SilentLedger** — Off-chain secondary market for horse shares. SilentLedger's obfuscated orderbook lets shares trade privately; execution on the orderbook triggers `transferShares` on this contract.

**SentinelDID** — Emergency-access protocol. If a primary owner becomes incapacitated, a SentinelDID release policy temporarily promotes a designated successor to primary ownership authority.

**PetProData** — Sister platform. Shares the folder-access + emergency-packet pattern. Core difference is horses have the RWA layer; pets don't.

---

## Known Gaps (Phase 2)

1. **Share-weighted voting** — not modeled. Add a proposal / vote state machine in a companion contract.
2. **Revenue distribution automation** — prize-money split happens off-chain today. Could use Zswap native tokens in a future pool-distribution contract.
3. **Bulk share operations** — would reduce gas cost for listing shares to many recipients at once.
4. **Lineage traversal** — `getBreedingRecord` returns one hop. A UI / SDK can walk sire/dam IDs recursively; full pedigree proofs would be a nicer ZK primitive.
5. **Event categorization** — performance events are freeform `eventCommit`. Future revision could add an event-type enum (race/show/breeding/etc.) for indexability.

---

## Compile & Deploy

Quick validation via the Midnight MCP compiler playground (no local `compactc` required):
```bash
midnight-compile-contract --code "$(cat contracts/equineProData.compact)" --skipZk
```

For preprod deployment:
```bash
compactc contracts/equineProData.compact build/equineProData/
```

---

## References

- **Record schemas**: `../schemas/*.json`
- **RWA valuation ideation**: `../schemas/rwa-and-valuation.json`
- **Breeding & lineage schema**: `../schemas/breeding-and-lineage.json`
- **Performance schema**: `../schemas/performance-and-competition.json`
- **Emergency protocol**: `../docs/SENTINELDID_EMERGENCY_PROTOCOL.md`
- **DIDz.io contracts**: `../../DIDz-io/contracts/`
- **Sister platform (pets)**: `../../petProData/contracts/`

---

*Built by Penny 🎀 and John on Apr 17, 2026. Compiles clean on `compactc v0.30.0`.*
