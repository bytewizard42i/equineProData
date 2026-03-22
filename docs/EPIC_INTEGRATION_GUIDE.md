# EquineProData — Epic Integration Guide

*How EquineProData can leverage Epic's open ecosystem for equine-human health interoperability and institutional verification workflows.*

**Source**: https://open.epic.com/ (parsed March 22, 2026)
**Parent guide**: See `safeHealthData/docs/EPIC_INTEGRATION_GUIDE.md` for the full Epic platform reference.

---

## Why Epic Matters for EquineProData

While Epic is a human healthcare platform, the equine industry intersects with human health systems in several critical areas:

1. **Equine therapy programs** — Hospitals, rehabilitation centers, and mental health facilities operating equine-assisted therapy programs need verified health records for therapy horses. Epic-connected facilities could check ZK-verified equine health attestations.
2. **Occupational health** — Equine industry workers (jockeys, trainers, farriers, veterinarians) have occupational health risks tied to horse health. Zoonotic disease, injury patterns, and environmental exposures create cross-domain data needs.
3. **Research institutions** — Academic medical centers on Epic conduct One Health research spanning human and animal subjects. Privacy-preserving equine health data could feed into these research programs.
4. **Insurance verification** — Equine insurance claims often require veterinary health verification. Building on FHIR/healthcare interoperability patterns positions EquineProData for cross-domain insurance workflows.

---

## Epic Platform Overview (Key Numbers)

| Metric | Value |
|--------|-------|
| Annual patient records exchanged | **8.54 billion** (54% with non-Epic orgs) |
| Live apps using open.epic APIs | **2,487** |
| No-cost APIs and interfaces | **750+** |
| Developer playbooks | **40+** |
| Epic hospitals on TEFCA | **2,000+** |

---

## Relevant Technical Standards

### FHIR R4

Epic's primary API standard. EquineProData should adopt FHIR R4 patterns so that:
- Equine health records are structured in interoperable formats
- Registry data (Jockey Club, AQHA, USEF, FEI) can map to FHIR identifiers
- RWA tokenization metadata can reference standardized health records
- Research data can bridge human and equine health domains

**Key resources**:
- FHIR Specifications: https://fhir.epic.com/Specifications
- FHIR Sandbox: https://fhir.epic.com/Sandbox

### CDS Hooks

**EquineProData integration point**: Equine therapy facilities connected to Epic could use CDS Hooks to verify therapy horse health status before scheduling patient sessions — privacy-preserving verification that the horse is cleared for therapy work without exposing full veterinary history.

### SMART on FHIR

**EquineProData integration point**: A SMART on FHIR app launching from an Epic rehabilitation facility's workflow could display ZK-verified equine therapy certifications, vaccination status, and behavioral assessments for therapy horses.

---

## 5-Step Integration Path

Epic uses a **self-service, vendor-neutral** federated model. No special relationship required.

1. **Data Sharing Design** — Review playbooks at https://open.epic.com/Playbooks
2. **Register Client ID** — Self-service at https://fhir.epic.com/Documentation?docId=epiconfhirrequestprocess
3. **Develop & Test** — Use sandbox at https://fhir.epic.com/Sandbox
4. **Customer Implementation** — Connect directly to Epic customer instances
5. **Showroom Listing** — Optional visibility at https://vendorservices.epic.com/Showroom

---

## Integration Strategy for EquineProData

### Phase 1: FHIR-Compatible Equine Records

Build equine health records using FHIR R4 resource patterns:
- `Patient` resource adapted for equines (breed, registration, owner-link, stable-link)
- `Immunization` for vaccination records (Coggins, EHV, West Nile, etc.)
- `Condition` for chronic conditions, injuries, lameness records
- `Observation` for bloodwork, imaging, performance metrics
- `Provenance` for lineage, ownership history, breeding records

### Phase 2: Equine Therapy Verification

Build a **SMART on FHIR verification widget** that:
- Verifies therapy horse health and certification via ZK proof
- Checks vaccination currency and behavioral clearance
- Provides facility-specific compliance verification
- Integrates with rehabilitation facility workflows in Epic

### Phase 3: Occupational Health Bridge

Connect equine health data to **occupational health workflows**:
- Privacy-preserving zoonotic exposure tracking for equine workers
- Injury correlation between horse health events and handler injuries
- Environmental health data (barn air quality, allergen levels) linked to worker respiratory health

### Phase 4: Research & RWA

Leverage **FHIR Bulk Data** patterns for:
- One Health research connecting equine and human health datasets
- Privacy-preserving breeding outcome research
- Performance genetics research with ZK-verified lineage
- RWA tokenization backed by verifiable health attestations

---

## Key Links

| Resource | URL |
|----------|-----|
| Open@Epic Home | https://open.epic.com/ |
| Developer Guide | https://open.epic.com/DeveloperResources |
| FHIR Sandbox | https://fhir.epic.com/Sandbox |
| CDS Hooks | https://fhir.epic.com/Documentation?docId=cds-hooks |
| SMART on FHIR | https://fhir.epic.com/Documentation?docId=launching |
| Technology Guidance | https://open.epic.com/Contact#DataSharingGuidance |

---

*Last updated: March 22, 2026*
