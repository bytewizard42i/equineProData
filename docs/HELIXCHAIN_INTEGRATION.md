# HelixChain Integration (pointer)

**equineProData (EquinePro)** integrates with **HelixChain**, the ecosystem's
privacy-preserving data plane + AI agent (powered by
**DIDz + AgenticDID + RWAz + HelixChain**).

**This repo primarily writes:** `health_records` with `vertical='equinepro'`,
`subject_type='equine'` — the **equine** vertical. A horse is BOTH a health
subject (health_records) AND an ownable asset (`rwa_objects`, object_type
`equine`); keep the two records distinct, same subject identity.

**Integration contract (summary):**
- every subject/owner is a 32-byte **commitment**, never a name
- use the identity layer (DIDz ⇄ tID swappable at runtime) — never hard-code a provider
- store **coarse** data only (age buckets, condition categories) + a `*_hash` anchor
- pick the right class: **DIDz** identity / **VC** credential / **RWAz** asset / **AgenticDID** grant

**Canonical integration schema:** `helixchain/docs/HELIXCHAIN_INTEGRATION.md`
**Alternate-ID (tDIDz) scheme:** `helixchain/docs/IDENTITY_PLACEHOLDER_SCHEME.md`
(local pointer: `docs/TEMP_ID_PLACEHOLDER.md`)
