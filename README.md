# Carpalx (Thai)

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

## Result

```plaintext
┌─────────┬───────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────┬──────────┐
│ (index) │       name        │                                                                 efforts                                                                 │     effortSum      │  better  │
├─────────┼───────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────┼──────────┤
│    0    │    'kedmanee'     │ 'thai5k : ~4.77, wisesight : ~4.43, wongnai : ~4.19, thaisumTestset : ~4.51, thaisum : ~4.50, sugreeTweets : ~4.53, thaiTweets : ~4.62' │ 31.55609610218203  │ '0.00%'  │
│    1    │   'pattachote'    │ 'thai5k : ~4.14, wisesight : ~3.81, wongnai : ~3.57, thaisumTestset : ~3.75, thaisum : ~3.70, sugreeTweets : ~3.82, thaiTweets : ~3.82' │ 26.611813771811285 │ '18.58%' │
│    2    │     'ikbaeb'      │ 'thai5k : ~3.90, wisesight : ~4.00, wongnai : ~3.53, thaisumTestset : ~3.64, thaisum : ~3.62, sugreeTweets : ~3.74, thaiTweets : ~3.66' │ 26.079912973959217 │ '21.00%' │
│    3    │ 'manoonchai_v01'  │ 'thai5k : ~3.61, wisesight : ~3.67, wongnai : ~3.14, thaisumTestset : ~3.31, thaisum : ~3.29, sugreeTweets : ~3.47, thaiTweets : ~3.46' │  23.9388401546314  │ '31.82%' │
│    4    │ 'manoonchai_v02'  │ 'thai5k : ~3.11, wisesight : ~3.41, wongnai : ~2.83, thaisumTestset : ~3.00, thaisum : ~2.98, sugreeTweets : ~3.24, thaiTweets : ~3.24' │ 21.800355169321442 │ '44.75%' │
│    5    │ 'manoonchai_v02b' │ 'thai5k : ~3.16, wisesight : ~3.45, wongnai : ~2.86, thaisumTestset : ~3.04, thaisum : ~3.02, sugreeTweets : ~3.29, thaiTweets : ~3.28' │ 22.102722562406974 │ '42.77%' │
│    6    │ 'manoonchai_v03'  │ 'thai5k : ~3.14, wisesight : ~3.44, wongnai : ~2.87, thaisumTestset : ~3.05, thaisum : ~3.02, sugreeTweets : ~3.26, thaiTweets : ~3.28' │ 22.066642355747785 │ '43.00%' │
└─────────┴───────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────┴──────────┘
```

## Features

- [x] Thai layout support, with Kedmanee & Pattachote
- [x] Shifted keys typing effort model
- [x] Generate layout from randomized data
  - [x] Greedy search for best effort
  - [x] Locked keys (No swapping)
  - [x] Simulated annealing
- [x] Layout preview on browser
  - [x] Preview with data from optimizer
  - [x] Effort calculation API
  - [x] Deploy
  - [x] Drag & drop keys to swap
  - [x] Calculate effort from custom text input
- [ ] Adjustable parameters (eg. Dominant hand, pinky penalty weight, etc.)
- [x] Ortholinear-layout support (eg. Planck, Ergodox)
- [x] Generate usable keyboard layout (Use tool like [klfc](https://github.com/39aldo39/klfc))

## Triads Datasets

- [Thai National Corpus](http://www.arts.chula.ac.th/ling/tnc/searchtnc/)
- [Wongnai-corpus](https://github.com/wongnai/wongnai-corpus)
- [PyThaiNLP's Wisesight Sentiment Corpus](https://github.com/PyThaiNLP/wisesight-sentiment)
- [ThaiSum](https://github.com/nakhunchumpolsathien/ThaiSum)
- Thai language tweets scraped with [Twint](https://github.com/twintproject/twint), triads extracted with https://github.com/Manoonchai/triads_extractor
- [@sugree's](https://twitter.com/sugree) tweets scraped with [Twint](https://github.com/twintproject/twint), triads extracted with https://github.com/Manoonchai/triads_extractor

## References

- [Carpalx](http://mkweb.bcgsc.ca/carpalx)
- <https://github.com/jackhumbert/typing_model>
- <https://github.com/dmtrs/carpalx.js>
