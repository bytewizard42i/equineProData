# EquineProData — Research & Reference Links

*Curated resources relevant to the EquineProData mission of privacy-preserving equine identity, records, provenance, and RWA infrastructure.*

---

## Epic Systems

- **Website**: https://www.epic.com/
- **Open@Epic**: https://open.epic.com/
- **What they do**: Founded in 1979, Epic is the largest electronic health record (EHR) vendor in the United States, serving over 305 million patients (~38% US market share). Their software powers clinical workflows, patient portals (MyChart), interoperability pipelines, and population health analytics.
- **Why it matters for EquineProData**: Epic's architecture demonstrates how centralized health record infrastructure can scale to serve hundreds of millions of subjects while maintaining interoperability across thousands of institutions. EquineProData can adapt proven patterns from Epic's ecosystem while adding privacy-preserving layers unique to the equine industry. An outreach letter to Open@Epic has been drafted (see `EPIC_OPEN_OUTREACH_LETTER.md` in this repo).
- **Architectural lessons from Epic**:
  - **Interoperability-first design** — Epic's FHIR R4 APIs enable third-party integration; EquineProData should be built for interoperability with existing equine registries (Jockey Club, AQHA, USEF, FEI)
  - **Network effects** — Epic's Care Everywhere network grows more valuable with each participant; equine health record networks follow the same dynamic
  - **Research data pipelines** — Epic's Cosmos shows how aggregated health data can power research; EquineProData could enable privacy-preserving equine health research at population scale
  - **Identity as foundation** — Just as Epic ties records to patient identity, EquineProData ties records to persistent equine DIDs that survive ownership transfers

### Equine-Specific Opportunities

- **Performance and competition records** that need to be verified without revealing training methods or conditioning programs
- **Breeding and lineage provenance** — Verified pedigree without exposing proprietary breeding strategies
- **Insurance and claims** — Prove health status for insurance purposes without revealing full veterinary history
- **RWA tokenization** — Ownership shares, breeding rights, stud contracts, and racing syndicate management require trusted health verification

---

## Roots & Wings Foundation

- **Website**: https://rootswings.org/
- **Mission**: "We help children grow strong from the roots up." Partners with nonprofits supporting low-income children and families across basic needs, early learning, health, and safety & justice.
- **Grantmaking**: Multi-year, unrestricted support. Does not accept unsolicited proposals.
- **Key partners**: No Kid Hungry, Kids Forward, Alameda Health System Foundation, Just Dane

### Relevance to EquineProData

1. **Equine therapy programs**: Many youth-serving nonprofits operate or partner with equine therapy programs for children with disabilities, trauma, or behavioral challenges. These programs need to verify horses are healthy and safe without exposing complex veterinary histories that could alarm parents or create liability concerns.
2. **Youth equestrian programs**: Programs that provide horseback riding opportunities to low-income children (e.g., therapeutic riding, 4-H, Pony Club) need portable, verifiable health records that move with horses between programs and facilities.
3. **Agricultural education**: Rural youth development programs often involve horse care and management. Privacy-preserving records could help coordinate veterinary care across multiple youth participants without creating data custody risks for the nonprofit.
4. **Grant reporting for animal welfare**: Foundations funding equine rescue or therapy programs need to verify animal welfare outcomes. ZK proofs could allow reporting on aggregate equine health metrics without exposing individual animal records or organizational operational details.

---

## X / Twitter References

*(Pending — see tweet from @histories_arch: https://x.com/histories_arch/status/2035798351829245972)*

---

*Last updated: March 22, 2026*
