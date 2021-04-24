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
Kedmanee Typing Effort (Thai5k triads) : 4.521230008425675
Pattachote Typing Effort (Thai5k triads) : 3.6484480097588947
Ikbaeb Typing Effort (Thai5k triads) : 3.1517306059437047
========================================
Kedmanee Typing Effort (Wisesight Sentiment triads) : 4.471218614474043
Pattachote Typing Effort (Wisesight Sentiment triads) : 3.60479984531367
Ikbaeb Typing Effort (Wisesight Sentiment triads) : 3.3130963771643605
========================================
Kedmanee Typing Effort (Wongnai Corpus triads) : 4.238078555193414
Pattachote Typing Effort (Wongnai Corpus triads) : 3.508272809489892
Ikbaeb Typing Effort (Wongnai Corpus triads) : 3.2354116252199523
========================================
Kedmanee Typing Effort (ThaisumTestset triads) : 4.613853139916257
Pattachote Typing Effort (ThaisumTestset triads) : 3.63318341745942
Ikbaeb Typing Effort (ThaisumTestset triads) : 3.302197598988309
========================================
Kedmanee Typing Effort (Thaisum triads) : 4.610060570710398
Pattachote Typing Effort (Thaisum triads) : 3.620971626359677
Ikbaeb Typing Effort (Thaisum triads) : 3.295402654892655
========================================
SUMMARY
{
  kedmaneeEffort: 22.45444088871979,
  pattachoteEffort: 18.015675708381554,
  ikbaebEffort: 16.297838862208984
}
```

## Features

- [x] Thai layout support, with Kedmanee & Pattachote
- [x] Shifted keys typing effort model
- [ ] Generate layout from randomized data
  - [x] Greedy search for best effort
  - [x] Locked keys (No swapping)
  - [ ] Simulated annealing
- [x] Layout preview on browser
  - [x] Preview with data from optimizer
  - [ ] Deploy
  - [ ] Effort calculation API
  - [ ] Drag & drop keys to swap
  - [ ] Calculate effort from custom text input
- [ ] Adjustable parameters (eg. Dominant hand, pinky penalty weight, etc.)
- [ ] Ortholinear-layout support (eg. Planck, Ergodox)
- [ ] Generate usable keyboard layout (Use tool like [klfc](https://github.com/39aldo39/klfc))

## Triads Datasets

- [Thai National Corpus](http://www.arts.chula.ac.th/ling/tnc/searchtnc/)
- [Wongnai-corpus](https://github.com/wongnai/wongnai-corpus)
- [PyThaiNLP's Wisesight Sentiment Corpus](https://github.com/PyThaiNLP/wisesight-sentiment)
- [ThaiSum](https://github.com/nakhunchumpolsathien/ThaiSum)

## References

- [Carpalx](http://mkweb.bcgsc.ca/carpalx)
- <https://github.com/jackhumbert/typing_model>
- <https://github.com/dmtrs/carpalx.js>
