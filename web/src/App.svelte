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
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
