---
# DRAFT: raw material from marketing/Strata Story Material §6.2. Rewrite in your own voice, then set status: published.
title: "Your duplicate check is not a check."
summary: "If it's a SELECT followed by an INSERT, two concurrent writers both pass it. The guarantee has to live in the database."
description: "Why a read-then-write duplicate check lets two concurrent writers through, and why a database uniqueness constraint has to be the real guarantee."
date: 2026-10-31
series: build-notes
number: 2
tags: [payments, postgresql, concurrency]
linkedin: ""
x: ""
status: draft
---

Here's a duplicate check that looks correct:

```text
if not exists(settlement where reference = r and leg = l):
    insert settlement(reference = r, leg = l, ...)
```

Run it once and it works. Run it from two requests at the same moment and both of them read "not there", both of them insert, and you have two settlements for one payment.

## The gap between the read and the write

The check and the insert are two separate steps. Between them is a window where another writer can do exactly the same thing. No amount of care in the application closes that window, because the application can't see what the other request is doing.

## Put the guarantee in the database

The database can see every writer. So the rule goes there:

```sql
UNIQUE (reference, leg)
```

Now the second insert fails, whatever the timing. The application handles that failure as "already done" and returns the existing result.

The read before the insert doesn't disappear. It becomes a fast path: most of the time it finds the row and skips the work. But it's an optimisation, not the protection. The constraint is the protection.

## Why the reference has to be deterministic

A uniqueness constraint only catches duplicates if a duplicate looks the same. That's why the rail reference is derived from the payment ID (Build notes · 01): a retry produces the same `(reference, leg)` pair, so the database recognises it.

## The general lesson

If correctness depends on "check, then act", ask where the check lives. If it lives in the application and the action lives in the database, there's a gap, and concurrent traffic will find it.

---

*This is Build notes · 02, the long version of a LinkedIn post. I'm building Strata, a payment core and, next, the controls between an AI agent and the money it spends.*
