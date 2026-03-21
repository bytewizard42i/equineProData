# EquineProData — Data Schema Reference

> Equine-grade data schemas for privacy-preserving horse identity, records, provenance, and RWA on Midnight.

## Schema Files

| File | Description |
|------|-------------|
| `horse-identity.json` | Signalment, registration, pedigree, DNA, brand/tattoo, competition IDs |
| `ownership-and-provenance.json` | Legal ownership, co-ownership, syndication, liens, sale history, breeding rights, full provenance chain |
| `clinical-records.json` | SOAP-format vet visits, lameness exams, pre-purchase exams, surgery, diagnostics |
| `vaccination-and-compliance.json` | Vaccines, Coggins, health certificates, quarantine, drug withdrawal, competition drug testing |
| `breeding-and-lineage.json` | Pedigree, stallion reports, mare records, foaling, AI/embryo transfer, genetic panels |
| `performance-and-competition.json` | Show records, race results, titles, points, rankings, discipline history |
| `hoof-farrier-and-dental.json` | Shoeing cycles, hoof radiographs, corrective work, dental floats, wolf teeth |
| `rwa-and-valuation.json` | Asset classification, valuation, syndication, stud fees, insurance, lifetime costs, revenue |
| `transport-and-movement.json` | Interstate health certs, Coggins, import/export, quarantine, hauling records |
| `emergency-packet.json` | Pre-authorized emergency disclosure — colic history, laminitis, sedation risks, meds |
| `permissions-and-consent.json` | Role-based access (owner, trainer, barn, vet, buyer, insurer, regulator), audit log |

## Privacy Classifications

Every field carries a `privacyClass`:

| Class | Meaning | Storage | Midnight Role |
|-------|---------|---------|---------------|
| `public` | Non-sensitive, can be on-chain | On-chain or off-chain | Stored openly |
| `shielded` | Sensitive, requires selective disclosure | Encrypted off-chain | zk-proof attestation only |
| `emergency` | Critical medical, pre-authorized reveal | Encrypted off-chain | Emergency Reveal Policy contract |
| `restricted` | Highly sensitive (financial, legal, behavioral) | Encrypted off-chain | Owner-only or court-ordered |

## Equine Terminology Guide

- **Signalment** — Breed, age, sex, color, markings
- **Coggins** — EIA (Equine Infectious Anemia) test — required for interstate transport, shows, boarding
- **AAEP** — American Association of Equine Practitioners
- **PPE** — Pre-Purchase Examination
- **BCS** — Body Condition Score (Henneke 1-9 scale)
- **NSAID** — Non-steroidal anti-inflammatory (bute, banamine, equioxx)
- **Withdrawal period** — Time after drug administration before competition eligibility
- **USEF/FEI/AQHA** — Major competition governing bodies
- **AI** — Artificial Insemination
- **ET** — Embryo Transfer
- **Float** — Dental rasping procedure
- **Corrective shoeing** — Therapeutic farrier work for hoof issues

## Design Principles

1. **Horse-centric** — The horse is the root entity, not the owner, barn, or trainer
2. **Multi-party native** — Designed for the reality that 5-10 different people/entities touch a horse's records
3. **RWA-first** — Every horse is a real-world asset with provenance, valuation, breeding rights, and ownership shares
4. **Competition-aware** — Drug withdrawal, testing compliance, and regulatory requirements are built in
5. **Transfer-safe** — Records survive sale, lease, boarding, training, and breeding arrangements
6. **Equine, not "big pet"** — Horses have unique workflows that pets don't (farrier, Coggins, breeding, transport)
