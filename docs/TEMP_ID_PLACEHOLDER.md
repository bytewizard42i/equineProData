# tDIDz — Temporary Identity Placeholder (dev only)

While real Midnight **DIDz** wiring is in progress, the DIDzMonolith data plane
(HelixChain) uses a **temporary-ID authority** ("tDIDz" = temp DIDz) as a
swappable stand-in for horse/owner identities. This note exists so there is
**no confusion** when you see `TEMP-*` labels or `id_scheme = 'temp'`.

EquinePro is the **equine** vertical of the three-verticals-one-architecture
family (SafeHealthData=human, EquinePro=equine, PetProData=pet). All three share
ONE `health_records` table in HelixChain. Equine identities are notable because
a horse is BOTH a health subject AND an ownable asset (RWAz).

- **What it is**: a placeholder that issues labels like `TEMP-ANIMAL-0001`, with
  `commitment = sha256("helix:temp:" + label)`.
- **Why**: lets us build equine health + ownership flows now; swaps to real DIDz
  with **zero business-logic changes** (one-line provider swap).
- **Not production identity.** Real DIDz commitments are non-resolvable by
  design (privacy); the temp scheme's resolvable labels are a dev convenience.

## The four ecosystem classes (do NOT conflate)

Powered by **DIDz + AgenticDID + RWAz + HelixChain**:

| Class | Engine | What it is | Transferable? |
|---|---|---|---|
| Identity | **DIDz** | who/what this is (the horse, the owner) | no |
| Verifiable Credential (VC) | DIDz-branch | a claim ABOUT a holder (lineage cert, breeding license) | no |
| Asset | **RWAz** | a thing OWNED (the horse as property, ownership shares) | yes |
| Grant | **AgenticDID** | what an agent/vet may DO | delegated |

A horse's *health record* (EquinePro) is separate from its *ownership record*
(RWAz asset) — same subject identity, two different classes.

**Canonical spec** (authoritative, with full detail + migration path):
`helixchain/docs/IDENTITY_PLACEHOLDER_SCHEME.md`
Reference implementation: `helixchain/hackathon/app/src/identity.ts`
