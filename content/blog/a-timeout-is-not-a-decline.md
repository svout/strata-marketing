---
# DRAFT: raw material from marketing/Strata Story Material §6.1. Rewrite in your own voice, then set status: published.
title: "A timeout is not a decline."
summary: "When the rail never answers, the payment's state is unknown. Treat it as failed and a retry charges twice."
description: "Why a payment with no answer from the rail is unknown, not failed, and how deterministic references and status recovery stop a retry from charging twice."
date: 2026-10-31
series: build-notes
number: 1
tags: [payments, reliability, idempotency, settlement]
linkedin: ""
x: ""
status: draft
---

You send a payment to the rail. You wait. Nothing comes back: the connection drops, the request times out, the process restarts. What happened to the money?

The tempting answer is "it failed". The request didn't succeed, so mark the payment as failed and let the caller try again. That answer is how a settled payment gets charged a second time.

## Three outcomes, not two

A rail call doesn't have two outcomes. It has three:

| Outcome | What you know | What to do |
| --- | --- | --- |
| **Settled** | The rail answered: the money moved. | Record it. |
| **Failed** | The rail answered: it declined. | Record it. A retry is safe. |
| **Unknown** | No answer. The money may or may not have moved. | Ask the rail. Don't retry blind. |

The timeout belongs in the third row. The rail may have received the request, settled it and lost only the response on the way back. If you record that as failed and retry, the customer pays twice, and your ledger says they paid once.

## Make the retry land on the same operation

The first half of the fix is the reference you send to the rail. If every attempt gets a fresh random reference, the rail sees two different payments. If the reference is derived from the payment ID, a retry is the same operation as the original, and the rail can recognise it.

```text
reference = derive(payment_id, leg)   # same input, same reference, every time
```

The guarantee that two settlements can't exist for one reference is a database constraint, not a lookup before the insert. That's its own post: a `SELECT` followed by an `INSERT` lets two concurrent writers both pass the check.

## Resolve "unknown" by asking

The second half is recovery. A payment whose rail call didn't answer is stored as unknown, and a recovery process asks the rail for the status of that reference:

1. The rail says settled: record the settlement.
2. The rail says failed or never received: record the failure, and only now is a retry safe.
3. The rail still doesn't answer: leave it unknown and ask again later.

Nothing in that loop guesses. Unknown stays unknown until the rail settles the question.

## How it's tested

Two rail implementations, an internal ledger rail and a fake payment provider whose state survives a restart, pass the same shared contract test suite. The fake keeping its state matters more than it sounds; that's a post of its own.

## The general lesson

Any time a system talks to something it doesn't control, "I didn't hear back" is a state of its own. Name it, store it and resolve it by asking, not by assuming.

---

*This is Build notes · 01, the long version of a LinkedIn post. I'm building Strata, a payment core and, next, the controls between an AI agent and the money it spends.*
