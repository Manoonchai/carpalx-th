<script lang="ts">
  let layout = '[" ", "๒", "๓", "๔", "๕", "ู", "๗", "๘", "๙", "๐", "๑", "๖"]\n' +
               '["็", "ต", "ย", "อ", "ร", "่", "ด", "ม", "ว", "แ", "ใ", "ฌ", "ฃ"]\n' +
               '["้", "ท", "ง", "ก", "ั", "ี", "า", "น", "เ", "ไ", "ข"]\n' +
               '["บ", "ป", "ล", "ห", "ิ", "ค", "ส", "ะ", "จ", "พ"]\n' +
               '["1", \'"\', "/", ",", "?", "ุ", "_", ".", "(", ")", "-", "%"]\n' +
               '["๊", "ฤ", "ๆ", "ญ", "ษ", "ึ", "ฝ", "ซ", "ถ", "ฒ", "ฯ", "ฦ", "ฅ"]\n' +
               '["๋", "ธ", "ำ", "ณ", "์", "ื", "ผ", "ช", "โ", "ฆ", "ฑ"]\n' +
               '["ฎ", "ฏ", "ฐ", "ภ", "ั", "ศ", "ฮ", "ฟ", "ฉ", "ฬ"]\n'
  $: layoutData = layout.trim().split("\n").map((line) => {
    let data = []
    try {
      data = JSON.parse(line.replaceAll('\'"\'', '"\\\""'))
    } catch (e) {
      return []
    }
    return data
  })
</script>

<main>
  <textarea bind:value={layout} cols="55" rows="11"></textarea>
  <div class="keyboard-container">
    <div class="keyboard">
      <!-- First row -->
      <div class="key">
        <div class="key__top">~</div>
        <div class="key__bottom">`</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][0]}</div>
        <div class="key__bottom">{layoutData[0][0]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][1]}</div>
        <div class="key__bottom">{layoutData[0][1]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][2]}</div>
        <div class="key__bottom">{layoutData[0][2]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][3]}</div>
        <div class="key__bottom">{layoutData[0][3]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][4]}</div>
        <div class="key__bottom">{layoutData[0][4]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][5]}</div>
        <div class="key__bottom">{layoutData[0][5]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][6]}</div>
        <div class="key__bottom">{layoutData[0][6]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][7]}</div>
        <div class="key__bottom">{layoutData[0][7]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][8]}</div>
        <div class="key__bottom">{layoutData[0][8]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][9]}</div>
        <div class="key__bottom">{layoutData[0][9]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][10]}</div>
        <div class="key__bottom">{layoutData[0][10]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[4][11]}</div>
        <div class="key__bottom">{layoutData[0][11]}</div>
      </div>
      <div class="key is-backspace">
        <div class="key__bottom">&larr;</div>
      </div>
      <!-- Second row -->
      <div class="key is-tab">
        <div class="key__bottom">&rarrb;</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][0]}</div>
        <div class="key__bottom">{layoutData[1][0]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][1]}</div>
        <div class="key__bottom">{layoutData[1][1]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][2]}</div>
        <div class="key__bottom">{layoutData[1][2]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][3]}</div>
        <div class="key__bottom">{layoutData[1][3]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][4]}</div>
        <div class="key__bottom">{layoutData[1][4]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][5]}</div>
        <div class="key__bottom">{layoutData[1][5]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][6]}</div>
        <div class="key__bottom">{layoutData[1][6]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][7]}</div>
        <div class="key__bottom">{layoutData[1][7]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][8]}</div>
        <div class="key__bottom">{layoutData[1][8]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][9]}</div>
        <div class="key__bottom">{layoutData[1][9]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][10]}</div>
        <div class="key__bottom">{layoutData[1][10]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][11]}</div>
        <div class="key__bottom">{layoutData[1][11]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[5][12]}</div>
        <div class="key__bottom">{layoutData[1][12]}</div>
      </div>
      <!-- Third row -->
      <div class="key is-capslock is-left">
        <div class="key__bottom">ก/A</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][0]}</div>
        <div class="key__bottom">{layoutData[2][0]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][1]}</div>
        <div class="key__bottom">{layoutData[2][1]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][2]}</div>
        <div class="key__bottom">{layoutData[2][2]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][3]}</div>
        <div class="key__bottom">{layoutData[2][3]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][4]}</div>
        <div class="key__bottom">{layoutData[2][4]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][5]}</div>
        <div class="key__bottom">{layoutData[2][5]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][6]}</div>
        <div class="key__bottom">{layoutData[2][6]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][7]}</div>
        <div class="key__bottom">{layoutData[2][7]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][8]}</div>
        <div class="key__bottom">{layoutData[2][8]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][9]}</div>
        <div class="key__bottom">{layoutData[2][9]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[6][10]}</div>
        <div class="key__bottom">{layoutData[2][10]}</div>
      </div>
      <div class="key is-enter is-right">
        <div class="key__top"></div>
        <div class="key__bottom">&larrhk;</div>
      </div>
      <!-- Fourth row -->
      <div class="key is-shift-left is-left">
        <div class="key__bottom">⬆</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][0]}</div>
        <div class="key__bottom">{layoutData[3][0]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][1]}</div>
        <div class="key__bottom">{layoutData[3][1]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][2]}</div>
        <div class="key__bottom">{layoutData[3][2]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][3]}</div>
        <div class="key__bottom">{layoutData[3][3]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][4]}</div>
        <div class="key__bottom">{layoutData[3][4]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][5]}</div>
        <div class="key__bottom">{layoutData[3][5]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][6]}</div>
        <div class="key__bottom">{layoutData[3][6]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][7]}</div>
        <div class="key__bottom">{layoutData[3][7]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][8]}</div>
        <div class="key__bottom">{layoutData[3][8]}</div>
      </div>
      <div class="key">
        <div class="key__top">{layoutData[7][9]}</div>
        <div class="key__bottom">{layoutData[3][9]}</div>
      </div>
      <div class="key is-shift-right is-right">
        <div class="key__bottom">⬆</div>
      </div>
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
