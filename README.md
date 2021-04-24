# Calpalx (Thai)

[![codecov](https://codecov.io/gh/narze/carpalx-th/branch/main/graph/badge.svg?token=0Y35AhUbcg)](https://codecov.io/gh/narze/carpalx-th)

Keyboard Layout Optimizer for Thai layouts, in TypeScript

## Why?

[Carpalx](http://mkweb.bcgsc.ca/carpalx) does not support Thai language, which has around 60+ unique alphabets and without capitalized letters.
So this is a Thai version of Carpalx, and also the extension which introduce typing effort model for shifted keys as well.

Ultimately, I will also use this to create [my own Thai keyboard layout](https://github.com/narze/manoonchai).

## Result

```plaintext
Carpalx Typing Effort (Lower is better)
========================================
Kedmanee Typing Effort (Thai5k-freq triads) : 4.568587982241603
Pattachote Typing Effort (Thai5k-freq triads) : 3.721466171054276
Ikbaeb Typing Effort (Thai5k-freq triads) : 3.3112141700279105
Manoonchai Typing Effort (Thai5k-freq triads) : 3.0456039432593194
========================================
Kedmanee Typing Effort (Wisesight Sentiment triads) : 4.471218614474043
Pattachote Typing Effort (Wisesight Sentiment triads) : 3.60479984531367
Ikbaeb Typing Effort (Wisesight Sentiment triads) : 3.3130963771643605
Manoonchai Typing Effort (Wisesight Sentiment triads) : 3.0249962116471933
========================================
Kedmanee Typing Effort (Wongnai Corpus triads) : 4.238078555193414
Pattachote Typing Effort (Wongnai Corpus triads) : 3.508272809489892
Ikbaeb Typing Effort (Wongnai Corpus triads) : 3.2354116252199523
Manoonchai Typing Effort (Wongnai Corpus triads) : 2.885227582906717
========================================
Kedmanee Typing Effort (ThaisumTestset triads) : 4.6138531399162295
Pattachote Typing Effort (ThaisumTestset triads) : 3.633183417459415
Ikbaeb Typing Effort (ThaisumTestset triads) : 3.302197598988324
Manoonchai Typing Effort (ThaisumTestset triads) : 3.033418252046343
========================================
Kedmanee Typing Effort (Thaisum triads) : 4.610060570710407
Pattachote Typing Effort (Thaisum triads) : 3.620971626359698
Ikbaeb Typing Effort (Thaisum triads) : 3.295402654892645
Manoonchai Typing Effort (Thaisum triads) : 3.030033623828917
========================================
SUMMARY
{
  kedmaneeEffort: 22.501798862535697,
  pattachoteEffort: 18.088693869676952,
  ikbaebEffort: 16.457322426293192,
  manoonchaiEffort: 15.01927961368849
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
