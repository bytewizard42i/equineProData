# EquinePro — Deployment Guide

**Product role**: Horse identity + health records + **RWA ownership shares** + breeding lineage + performance tracking. Highest-value product in the monolith — fractional ownership enables syndicates, breeding-rights sales, and lending.
**Current status**: `contracts/equineProData.compact` saved locally (not yet pushed). DApp not yet scaffolded.
**Validated against**: `compactc v0.30.0`, pragma `>= 0.16 && <= 0.21`.
**Reference architecture**: `bricktowers/midnight-rwa` (accredited-investor flow) + `bricktowers/midnight-identity` (folder access pattern).

See the master roadmap at `PixyPi/DEPLOYMENT_ROADMAP.md` for ecosystem-wide patterns. This file covers equineProData specifics only.

---

## Why This Deployment Is More Involved Than petProData

Horses are four things at once — animal, financial asset, athlete, breeding stock. That means four integration surfaces:

| Surface | Portal | Integration partner |
|---------|--------|---------------------|
| Health | `vet.equinepro.app` | Equine vet practices (same EPIC-style integration as petProData) |
| Financial (RWA) | `syndicate.equinepro.app` | Accredited-investor KYC via KYCz + off-chain fiat rails |
| Athletic | `trainer.equinepro.app` | Event organizers (Jockey Club, AQHA, USEF) |
| Breeding | `breeder.equinepro.app` | Breed registries (Jockey Club DNA lab, AQHA parentage) |

Plus the owner-facing `equinepro.app` that ties everything together.

---

## What Gets Deployed

```
┌─────────────────────────────────────────────────────────────────┐
│ Vercel (Pro tier $20/mo recommended — 5+ portals)               │
│  ─ equinepro.app              — primary owner portal            │
│  ─ syndicate.equinepro.app    — RWA investor / cap-table portal │
│  ─ vet.equinepro.app          — vet portal                      │
│  ─ trainer.equinepro.app      — trainer / performance portal    │
│  ─ breeder.equinepro.app      — breeder / lineage portal        │
└───────────────┬─────────────────────────────────────────────────┘
                │ HTTPS
                ▼
┌─────────────────────────────────────────────────────────────────┐
│ VPS / Railway — est. $15-30/mo (higher than petProData)         │
│  ─ proof-server          :6300  (shared)                        │
│  ─ didz-integration      :3001  (DIDz.io attestations)         │
│  ─ kycz-bridge           :3002  (accredited-investor checks)   │
│  ─ registry-connector    :3003  (Jockey Club / AQHA feeds)     │
│  ─ appraisal-witness     :3004  (signs valuation commits)      │
│  ─ records-storage       :3005  (same S3/R2 pattern as pet)    │
│  ─ share-indexer         :3006  (watches share-transfer events)│
└───────────────────┬─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ Midnight + DIDz.io + KYCz + SilentLedger (secondary share mkt)  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Repo Layout (planned)

```
equineProData/
├── contracts/                      # ✅ Existing — equineProData.compact + README
├── schemas/                        # ✅ Existing — breeding, lineage, performance, RWA schemas
├── equine-contract/                # TS bindings + Vitest simulators
├── equine-api/                     # Shared RxJS SDK
│   └── src/
│       ├── didz-bridge.ts
│       ├── kycz-bridge.ts          # Accredited-investor gates
│       ├── share-transfer.ts
│       ├── breeding.ts
│       └── appraisal.ts
├── equine-ui/                      # Primary owner portal
├── equine-syndicate-ui/            # RWA / investor portal
├── equine-vet-ui/                  # Vet portal
├── equine-trainer-ui/              # Trainer / performance-logging portal
├── equine-breeder-ui/              # Breeder / lineage portal
├── registry-connector/             # Node: syncs Jockey Club / AQHA registry updates
├── appraisal-witness/              # Node: trusted appraiser signing service
├── share-indexer/                  # Watches share transfers + pushes to UI
└── equine-cli/                     # Admin CLI
```

---

## The RWA Layer Needs Extra Care

Fractional ownership + real-world appraisal + regulatory compliance = **materially higher compliance surface than any other product in the monolith**.

### Accredited-investor gating (KYCz integration)
Before any share transfer, `syndicate.equinepro.app` should check:
1. Recipient holds a valid KYCz credential matching the target jurisdiction
2. Recipient's accreditation tier meets the product's minimum (e.g., US Reg D 506(c))
3. On-chain: the `KYCz.proveAccredited(wallet, jurisdiction, tier)` proof returns true

The kycz-bridge service handles the off-chain KYC workflow; the final on-chain proof check happens in the smart-contract circuit.

### Appraisal witness service
`setValuation(horseId, appraisalCommit, now)` writes an appraisal commit to chain. The commit is a hash of a signed appraisal document (off-chain PDF). The `appraisal-witness` service:
1. Receives the appraisal PDF from a trusted appraiser (AHC, EquiNation, or similar)
2. Verifies the appraiser's signing key is registered on `DIDz.io TrustedIssuerRegistry`
3. Computes `hash(PDF)` and submits via the owner's wallet

Deploy this as a Docker container on the VPS. Keep the appraiser's signing keys in Vault / 1Password (NEVER in the repo).

### Secondary-market integration (SilentLedger)
When a shareholder wants to sell shares, the flow is:
1. List shares on `SilentLedger` (obfuscated orderbook — separate product in the monolith)
2. Match off-chain
3. Execute on-chain via `transferShares(horseId, buyerKey, amount)`

This needs a bridge service (`share-indexer` + a listener on SilentLedger events). Build this AFTER primary shareholder transfers work end-to-end.

---

## Jockey Club / Registry Integration

The `registry-connector` service is unique to equineProData. It:
1. Periodically pulls new horse registrations + parentage records from breed registries (Jockey Club API, AQHA data feeds, USEF)
2. Creates DIDz.io attestations anchoring the registry ID to the horse's `registrationCommit`
3. Marks horses as "registry-verified" in the UI (a trust badge)

**Not a launch blocker** — horses can be registered manually in Phase 1 without this. But for scale + credibility, registry feeds are a Phase 3 must-have.

---

## Pinned SDK Versions

Same as DIDz.io. See `DIDz-io/DEPLOYMENT.md` for the full table.

---

## Environments

| Env | Network | Portals | Proof server | Records storage |
|-----|---------|---------|--------------|-----------------|
| `local` | Undeployed | `localhost:5173-5177` | `localhost:6300` | Local MinIO |
| `testnet` | TestNet | `*.equinepro.vercel.app` | `proof.equinepro.app` | Cloudflare R2 (testnet bucket) |
| `mainnet` | MainNet | `*.equinepro.app` | `proof.equinepro.app` | Cloudflare R2 (mainnet bucket) |

---

## Frontend Deploy (Vercel)

5 separate Vercel projects, same monorepo. Pattern identical to petProData — see `petProData/DEPLOYMENT.md` for details. Vercel Pro tier is strongly recommended here because of the 5+ portals + team-collaboration features.

---

## Backend Deploy

This is the most services of any product in the monolith. Strategy:

1. **Proof server** — shared with other DIDzMonolith products (run one per environment)
2. **records-storage** — Cloudflare R2 bucket (shared pattern with petProData, separate bucket)
3. **didz-integration + kycz-bridge** — deploy as Vercel Edge Functions if latency sensitive, OR Railway services if >10 s execution time
4. **appraisal-witness** — Railway service (single-instance, requires persistent signing keys)
5. **registry-connector** — Railway cron service (runs every 6 hrs)
6. **share-indexer** — Railway worker (long-lived, reconnects on failure)

**Total monthly cost estimate**: ~$30-50 for a production-grade deployment with ~1000 active horses and moderate share-transfer volume.

---

## Phase Roadmap

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 0 | Compact contract compiles + saved | ✅ Local (awaiting push) |
| 1 | Monorepo scaffold + owner portal | ⏳ |
| 2 | Share-transfer flow working (primary owner → 2 syndicate members) | ⏳ (KYCz required) |
| 3 | Vet portal + first vet attestation | ⏳ (DIDz.io required) |
| 4 | Breeding record + lineage verification | ⏳ |
| 5 | Performance event logging + trainer portal | ⏳ |
| 6 | Appraisal witness + RWA-backed lending demo | ⏳ |
| 7 | Jockey Club / AQHA registry feed integration | ⏳ |
| 8 | SilentLedger secondary-market integration | ⏳ |
| 9 | MainNet launch | ⏳ |

---

## Legal / Compliance Note

**RWA = securities regulation in most jurisdictions.** Before any MainNet deployment:
1. Get a securities lawyer opinion on the structure (Reg D 506(c) / Reg A+ / Reg S)
2. Confirm the KYCz integration meets the identified framework's KYC/AML requirements
3. Verify the appraisal workflow meets the jurisdiction's valuation standards
4. Document the share-transfer restrictions (lock-up periods, accredited-only sales, etc.)

Testnet deployments with synthetic data are fine without legal review — but real share issuance is not.

---

## References

- Master roadmap: `PixyPi/DEPLOYMENT_ROADMAP.md`
- Contract README: `contracts/README.md`
- RWA reference DApp: https://github.com/bricktowers/midnight-rwa
- Accredited-investor pattern: https://github.com/midnightntwrk/example-zkloan
- Sister platform: `../petProData/` (pets, no RWA layer)
- Edda Labs property auctions pattern: https://github.com/eddalabs (certificate-hash verification)

---

*Built by Penny 🎀 on Apr 17, 2026.*
