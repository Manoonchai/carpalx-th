# Calpalx (Thai)

[![codecov](https://codecov.io/gh/narze/carpalx-th/branch/main/graph/badge.svg?token=0Y35AhUbcg)](https://codecov.io/gh/narze/carpalx-th)

Keyboard Layout Optimizer for Thai layouts, in TypeScript

## Why?

[Carpalx](http://mkweb.bcgsc.ca/carpalx) does not support Thai language, which has around 60+ unique alphabets and without capitalized letters.
So this is a Thai version of Carpalx, and also the extension which introduce typing effort model for shifted keys as well.

Ultimately, I will also use this to create [my own Thai keyboard layout](https://github.com/narze/manoonchai).

## Usage

- Calculate effort from layouts

```shell
yarn start
```

- Optimize layout using Stochastic Optimization method

```shell
yarn optimize [layout_name] [output_file.txt]
```

- Layout previewer

```shell
yarn web
```

## Result

```plaintext
┌─────────┬──────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────┬──────────┐
│ (index) │       name       │                                            efforts                                            │     effortSum      │  better  │
├─────────┼──────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────┼──────────┤
│    0    │    'kedmanee'    │ 'thai5k : ~4.70, wisesight : ~4.36, wongnai : ~4.13, thaisumTestset : ~4.45, thaisum : ~4.44' │ 22.080485875562218 │ '0.00%'  │
│    1    │   'pattachote'   │ 'thai5k : ~4.14, wisesight : ~3.70, wongnai : ~3.56, thaisumTestset : ~3.73, thaisum : ~3.70' │ 18.82508737117029  │ '17.29%' │
│    2    │     'ikbaeb'     │ 'thai5k : ~3.90, wisesight : ~3.59, wongnai : ~3.49, thaisumTestset : ~3.60, thaisum : ~3.59' │ 18.167805526073572 │ '21.54%' │
│    3    │ 'manoonchai_v01' │ 'thai5k : ~3.60, wisesight : ~3.26, wongnai : ~3.09, thaisumTestset : ~3.28, thaisum : ~3.28' │ 16.503597799198495 │ '33.79%' │
│    4    │ 'manoonchai_v02' │ 'thai5k : ~3.09, wisesight : ~2.99, wongnai : ~2.77, thaisumTestset : ~2.97, thaisum : ~2.96' │ 14.76995072609058  │ '49.50%' │
└─────────┴──────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────┴──────────┘
```

## Features

- [x] Thai layout support, with Kedmanee & Pattachote
- [x] Shifted keys typing effort model
- [ ] Generate layout from randomized data
  - [x] Greedy search for best effort
  - [x] Locked keys (No swapping)
  - [x] Simulated annealing
- [x] Layout preview on browser
  - [x] Preview with data from optimizer
  - [x] Effort calculation API
  - [ ] Deploy
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
