# Calpalx (Thai)

[![codecov](https://codecov.io/gh/narze/carpalx-th/branch/main/graph/badge.svg?token=0Y35AhUbcg)](https://codecov.io/gh/narze/carpalx-th)

Keyboard Layout Optimizer for Thai layouts, in TypeScript

## Why?

[Carpalx](http://mkweb.bcgsc.ca/carpalx) does not support Thai language, which has around 60+ unique alphabets and without capitalized letters.
So this is a Thai version of Carpalx, and also the extension which introduce typing effort model for shifted keys as well.

## Result

```plaintext
Carpalx Typing Effort (Lower is better)
========================================
Kedmanee Typing Effort (Thai5k triads) : 4.076513366676074
Pattachote Typing Effort (Thai5k triads) : 3.356498152381288
Ikbaeb Typing Effort (Thai5k triads) : 2.9105104444648116
========================================
Kedmanee Typing Effort (Wisesight Sentiment triads) : 4.086891294991928
Pattachote Typing Effort (Wisesight Sentiment triads) : 3.319388410270449
Ikbaeb Typing Effort (Wisesight Sentiment triads) : 3.0730987480917435
========================================
Kedmanee Typing Effort (Wongnai Corpus triads) : 3.9049700947722217
Pattachote Typing Effort (Wongnai Corpus triads) : 3.23248660685021
Ikbaeb Typing Effort (Wongnai Corpus triads) : 2.9628737674961156
========================================
Kedmanee Typing Effort (Thaisum Testset triads) : 4.173794748762248
Pattachote Typing Effort (Thaisum Testset triads) : 3.3058621456211474
Ikbaeb Typing Effort (Thaisum Testset triads) : 2.998725469378483
========================================
Kedmanee Typing Effort (Thaisum triads) : 4.173628770597141
Pattachote Typing Effort (Thaisum triads) : 3.298540855408573
Ikbaeb Typing Effort (Thaisum triads) : 2.9977849658768037
```

## Features

- [x] Thai layout support, with Kedmanee & Pattachote
- [x] Shifted keys typing effort model
- [ ] Generate layout from randomized data
  - [x] Greedy search for best effort
  - [ ] Locked keys (No swapping)
  - [ ] Simulated annealing
- [ ] Adjustable parameters (eg. Dominant hand, pinky penalty weight, etc.)
- [ ] Ortholinear-layout support (eg. Planck, Ergodox)

## Triads Datasets

- [Thai National Corpus](http://www.arts.chula.ac.th/ling/tnc/searchtnc/)
- [Wongnai-corpus](https://github.com/wongnai/wongnai-corpus)
- [PyThaiNLP's Wisesight Sentiment Corpus](https://github.com/PyThaiNLP/wisesight-sentiment)
- [ThaiSum](https://github.com/nakhunchumpolsathien/ThaiSum)

## References

- [Carpalx](http://mkweb.bcgsc.ca/carpalx)
- <https://github.com/jackhumbert/typing_model>
- <https://github.com/dmtrs/carpalx.js>
