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

## Roots & Wings Foundation — Founded by Judy Faulkner (Epic's Founder)

- **Website**: https://rootswings.org/
- **Source**: https://x.com/histories_arch/status/2035798351829245972
- **Mission**: "We help children grow strong from the roots up." Partners with nonprofits supporting low-income children and families across basic needs, early learning, health, and safety & justice.
- **Grantmaking**: Multi-year, unrestricted support. Does not accept unsolicited proposals.
- **Key partners**: No Kid Hungry, Kids Forward, Alameda Health System Foundation, Just Dane

### The Judy Faulkner Connection — Epic & Roots & Wings Are the Same Story

**This is critical context: Roots & Wings Foundation was created by Judy Faulkner and her husband — the same Judy Faulkner who founded Epic Systems.**

In 1979, in a basement office in Madison, Wisconsin, Judy Faulkner started Epic Systems with $6,000–$7,000 of her own money plus ~$70,000 from friends and family. No venture capital. No Silicon Valley. Just a conviction that the American healthcare system was killing people because doctors couldn't access the information they needed.

She had watched medical records stay trapped in filing cabinets and incompatible systems. Doctors made critical decisions in the dark, lacking patient histories. People died from preventable mistakes. That systemic failure became her mission — building software that would let patient information follow the patient, no matter where they went.

Decades later, Epic manages medical records for over 300 million patients worldwide. Roughly half of all U.S. hospital beds run on her systems. Her wealth sits between $7–$8 billion. **She never took Epic public. Never accepted venture capital. Never sold out.** Epic remains one of the largest privately held software companies in the world — thousands of employees, zero outside investors.

Now in her eighties, she signed the Giving Pledge in 2015 and committed to give away **99% of her wealth**. She and her husband created Roots & Wings, named after advice she gave her children: *"You need roots and wings. Values to anchor you. Freedom to grow. Everything else is noise."* The foundation distributes tens of millions annually, aiming for $100 million/year.

### Relevance to EquineProData

The fact that **Epic and Roots & Wings share the same founder** creates a unique alignment for EquineProData:

1. **Equine therapy programs**: Many youth-serving nonprofits in Roots & Wings' network operate or partner with equine therapy programs for children with disabilities, trauma, or behavioral challenges. These programs need to verify horses are healthy and safe without exposing complex veterinary histories that could alarm parents or create liability concerns — a perfect fit for ZK-verified health attestations.
2. **Youth equestrian programs**: Programs providing horseback riding to low-income children (therapeutic riding, 4-H, Pony Club) need portable, verifiable health records that move with horses between programs and facilities.
3. **Agricultural education**: Rural youth development programs involve horse care and management. Privacy-preserving records could coordinate veterinary care across multiple youth participants without creating data custody risks for the nonprofit.
4. **Grant reporting for animal welfare**: Foundations funding equine rescue or therapy programs need to verify animal welfare outcomes. ZK proofs could allow reporting on aggregate equine health metrics without exposing individual animal records.
5. **Values alignment**: Faulkner built Epic to make health records portable and accessible. EquineProData extends that vision to equine health — persistent DIDs that survive ownership transfers, records that follow the horse, and privacy that protects competitive interests (breeding strategies, training methods, performance data).

---

*Last updated: March 22, 2026*
