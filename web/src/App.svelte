<script lang="ts">
  import { wisesight } from "../../data/wisesight"

  // console.log("length", wisesight["ที่"])

  let layout = '[" ", "๒", "๓", "๔", "๕", "ู", "๗", "๘", "๙", "๐", "๑", "๖"]\n' +
               '["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"]\n' +
               '["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"]\n' +
               '["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"]\n' +
               '["1", \'"\', "/", ",", "?", "ุ", "_", ".", "(", ")", "-", "%"]\n' +
               '["๊", "ฤ", "ๆ", "ญ", "ษ", "ึ", "ฝ", "ซ", "ถ", "ฒ", "ฯ", "ฦ", "ฅ"]\n' +
               '["๋", "ธ", "ำ", "ณ", "์", "ื", "ผ", "ช", "โ", "ฆ", "ฑ"]\n' +
               '["ฎ", "ฏ", "ฐ", "ภ", "ั", "ศ", "ฮ", "ฟ", "ฉ", "ฬ"]\n'
  $: layoutData = layout.trim().split("\n").map((line) => {
    console.log({line})
    let data = []
    try {
      data = JSON.parse(line.replaceAll('\'"\'', '"\\\""'))
      console.log({data})
    } catch (e) {
      console.log({e})
      return []
    }
    return data
  })
  console.log({layoutData})
</script>

<main>
  <textarea bind:value={layout}></textarea>
  <!-- {layout} -->
  {layoutData}
  <div class="keyboard-container">
    <div class="keyboard">
      <!-- First row -->
      <div class="key">
        <div class="key__top">±</div>
        <div class="key__bottom">§</div>
      </div>
      <div class="key">
        <div class="key__top">!</div>
        <div class="key__bottom">1</div>
      </div>
      <div class="key">
        <div class="key__top">@</div>
        <div class="key__bottom">2</div>
      </div>
      <div class="key">
        <div class="key__top">#</div>
        <div class="key__bottom">3</div>
      </div>
      <div class="key">
        <div class="key__top">$</div>
        <div class="key__bottom">4</div>
      </div>
      <div class="key">
        <div class="key__top">%</div>
        <div class="key__bottom">5</div>
      </div>
      <div class="key">
        <div class="key__top">^</div>
        <div class="key__bottom">6</div>
      </div>
      <div class="key">
        <div class="key__top">&amp;</div>
        <div class="key__bottom">7</div>
      </div>
      <div class="key">
        <div class="key__top">*</div>
        <div class="key__bottom">8</div>
      </div>
      <div class="key">
        <div class="key__top">(</div>
        <div class="key__bottom">9</div>
      </div>
      <div class="key">
        <div class="key__top">)</div>
        <div class="key__bottom">0</div>
      </div>
      <div class="key">
        <div class="key__top">_</div>
        <div class="key__bottom">-</div>
      </div>
      <div class="key">
        <div class="key__top">+</div>
        <div class="key__bottom">=</div>
      </div>
      <div class="key is-backspace">
        <div class="key__bottom">&larr;</div>
      </div>
      <!-- Second row -->
      <div class="key is-tab">
        <div class="key__bottom">&rarrb;</div>
      </div>
      <div class="key">Q</div>
      <div class="key">W</div>
      <div class="key">E</div>
      <div class="key">R</div>
      <div class="key">T</div>
      <div class="key">Y</div>
      <div class="key">U</div>
      <div class="key">I</div>
      <div class="key">O</div>
      <div class="key">P</div>
      <div class="key">
        <div class="key__top">{"{"}</div>
        <div class="key__bottom">[</div>
      </div>
      <div class="key">
        <div class="key__top">{"}"}</div>
        <div class="key__bottom">]</div>
      </div>

      <div class="key">
        <div class="key__top">|</div>
        <div class="key__bottom">\</div>
      </div>
      <!-- Third row -->
      <div class="key is-capslock"></div>
      <div class="key">A</div>
      <div class="key">S</div>
      <div class="key">D</div>
      <div class="key">F</div>
      <div class="key">G</div>
      <div class="key">H</div>
      <div class="key">J</div>
      <div class="key">K</div>
      <div class="key">L</div>
      <div class="key">
        <div class="key__top">:</div>
        <div class="key__bottom">;</div>
      </div>
      <div class="key">
        <div class="key__top">"</div>
        <div class="key__bottom">'</div>
      </div>
      <div class="key is-enter">
        <div class="key__top"></div>
        <div class="key__bottom">&larrhk;</div>
      </div>
      <!-- Fourth row -->
      <div class="key is-shift-left"></div>
      <div class="key">
        <div class="key__top">~</div>
        <div class="key__bottom">`</div>
      </div>
      <div class="key">Z</div>
      <div class="key">X</div>
      <div class="key">C</div>
      <div class="key">V</div>
      <div class="key">B</div>
      <div class="key">N</div>
      <div class="key">M</div>
      <div class="key">
        <div class="key__top">&lt;</div>
        <div class="key__bottom">,</div>
      </div>
      <div class="key">
        <div class="key__top">&gt;</div>
        <div class="key__bottom">.</div>
      </div>
      <div class="key">
        <div class="key__top">?</div>
        <div class="key__bottom">/</div>
      </div>
      <div class="key is-shift-right"></div>
      <!-- Fifth row -->
      <div class="key is-left">
        <div class="key__bottom">fn</div>
      </div>
      <div class="key is-right">
        <div class="key__bottom">control</div>
      </div>
      <div class="key is-right">
        <div class="key__top">alt</div>
        <div class="key__bottom">option</div>
      </div>
      <div class="key is-command is-right">
        <div class="key__bottom">command</div>
      </div>
      <div class="key is-space"></div>
      <div class="key is-command is-left">
        <div class="key__bottom">command</div>
      </div>
      <div class="key is-left">
        <div class="key__top">alt</div>
        <div class="key__bottom">option</div>
      </div>
      <div class="key is-arrow-left">&ltrif;</div>
      <div class="key is-arrow-up">&utrif;</div>
      <div class="key is-arrow-down">&dtrif;</div>
      <div class="key is-arrow-right">&rtrif;</div>
    </div>
  </div>

</main>

<style lang="scss">
  @import "./styles.scss"
</style>
