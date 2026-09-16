# Clinical workbench overlay

Read this only for healthcare or medical interfaces. It is a human-factors
layout aid, not clinical, regulatory, or legal advice. The product's clinical
safety file, intended-use definition, authority model, and validated workflows
override this reference.

## Safety invariants before layout

- Use synthetic data in design artifacts and evaluations.
- Identify the clinician role, patient/encounter scope, intended use, final
  authority, and exact commit/sign/send boundary.
- Treat wrong-patient, wrong-side, wrong-segment, unit, negation, dose,
  allergy, stale-data, and lost-work errors as layout inputs where relevant.
- Keep accountable human review explicit. AI output is a source-linked draft,
  not a signed record, order, prescription, or final report.
- Never show an uncalibrated LLM confidence percentage as clinical certainty.
  Prefer actionable states such as source missing, contradiction, low audio
  quality, or clinician review required.

## P0 clinical elements

The relevant subset stays visible in every clinical work region and cannot be
placed behind tabs, accordions, hover, or a narrow hidden column:

- patient identity using the identifiers required by the product;
- encounter/exam context, laterality, units, and current scope;
- recording, connectivity, autosave, unsaved/recovered, and document state;
- unresolved blocking risks and abnormal/critical state distinction;
- AI-generated, clinician-reviewed, verified, signed/final, and amended state;
- the authority and consequence of the imminent final action.

Do not repeat every item everywhere. Maintain one consistent persistent source
and repeat only what is required at a high-risk decision or final review.

## Transcription and anamnesis

- Keep capture continuity, recording state, unresolved questions, structured
  summary, and next action in the main loop.
- Place a generated fact near its source segment or provide a direct,
  perceivable relationship. “Not mentioned” must not be presented as a
  negative finding.
- Make speaker, timestamp, audio-quality, negation, number, dose, allergy, and
  laterality uncertainty actionable at the affected content.
- Preserve cursor, source selection, last confirmed save, and unreviewed items
  after interruption. Never silently merge conflicting recovered dictation.

## Orders and prescriptions

- Use a visible progression such as proposed → clinician review → sign/send;
  accepting a suggestion and signing/sending are separate actions.
- Keep patient scope and relevant safety context visible at entry and final
  review.
- Group by clinical intent and decision sequence: reason/indication, item,
  structured instructions, safety checks, review, sign, transmit.
- Put warnings at the decision they affect and summarize unresolved blockers at
  final review. Disabled final actions must explain the reason and correction.
- Make retries idempotent and distinguish draft saved, signed, transmitted,
  transmission uncertain, and failed.

## Duplex report and vascular mapping

For the Azigos duplex workflow, treat report and vascular map as coordinated
co-primary representations when the physician must verify them together.

- Use one structured source of truth for side, vessel, segment, measurement,
  unit, and finding; narrative and map derive from or reconcile against it.
- Coordinate selection: choosing a transcript segment, structured finding,
  report phrase, or map segment locates and highlights its counterparts.
- Keep laterality and segment labels fixed and perceivable without color alone.
- Keep raw measurement and the criterion/version behind any derived severity
  available at the decision point.
- Block finalization on unresolved side, segment, unit, source, or map/report
  mismatch. Show technical limitations and missing views.
- Provide an accessible structured list/table alternative to the anatomical
  map and a defined keyboard model for map navigation.
- On narrow screens, preserve review sequence and P0 context. If safe
  simultaneous verification is impossible, mark finalization unsupported
  instead of hiding one co-primary artifact.

## Validation scenarios

Use representative clinicians and realistic tasks. Include interruption,
wrong-patient or wrong-side setup, low-quality/partial audio, negation,
decimal/unit ambiguity, contradictory report/map state, offline recovery,
duplicate transmission risk, keyboard-only map use, and amendment after sign.

Do not claim clinical safety from heuristic review alone.
