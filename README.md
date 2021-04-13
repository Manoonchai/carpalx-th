# Calpalx (Thai)

Keyboard Layout Optimizer for Thai layouts, in TypeScript

## Why?

[Carpalx](http://mkweb.bcgsc.ca/carpalx) does not support Thai language, which has around 60+ unique alphabets and without capitalized letters.
So this is a Thai version of Carpalx, and also the extension which introduce typing effort model for shifted keys as well.

## Result

```plaintext
Carpalx Typing Effort (Lower is better)
Kedmanee Typing Effort (Thai5k triads) : 4.076513366676074
Pattachote Typing Effort (Thai5k triads) : 3.356498152381288
Kedmanee Typing Effort (Wisesight Sentiment triads) : 4.086891294991928
Pattachote Typing Effort (Wisesight Sentiment triads) : 3.319388410270449
Kedmanee Typing Effort (Wongnai Corpus triads) : 3.9049700947722217
Pattachote Typing Effort (Wongnai Corpus triads) : 3.23248660685021
```

## Features

- [x] Thai layout support, with Kedmanee & Pattachote
- [x] Shifted keys typing effort model
- [ ] Adjustable parameters (eg. Dominant hand, pinky penalty weight, etc.)
- [ ] Ortholinear-layout support (eg. Planck, Ergodox)

## References

- [Carpalx](http://mkweb.bcgsc.ca/carpalx)
- <https://github.com/jackhumbert/typing_model>
- <https://github.com/dmtrs/carpalx.js>
