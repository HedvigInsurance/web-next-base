import React from 'react'
import { InsuranceInfoBlock } from './InsuranceInfoBlock'

export default {
  title: 'Blocks/InsuranceInfoBlock',
  component: InsuranceInfoBlock,
  parameters: {
    paddings: [
      { name: 'Medium', value: '32px' },
      { name: 'Large', value: '64px', default: true },
    ],
  },
}

export const Default = () => (
  <InsuranceInfoBlock
    _uid="5678"
    component="image_block"
    color={{
      _uid: '2134',
      color: 'purple300',
      plugin: 'hedvig_minimal_color_picker',
    }}
    index={2}
    value_1_description="Dina saker är försäkrade till"
    value_1_value="1 500 000 SEK"
    value_2_description="Självrisk"
    value_2_value="1 500 SEK"
    value_3_description="Drulle"
    value_3_value="Ingår"
    value_4_description="Reseskyddet gäller"
    value_4_value="45 dagar per resa"
    value_5_description="Reseskyddet gäller"
    value_5_value="45 dagar per resa"
    value_6_description="Reseskyddet gäller"
    value_6_value="45 dagar per resa"
    value_7_description="Reseskyddet gäller"
    value_7_value="45 dagar per resa"
    terms_link="https://www.hedvig.com/villkor/villkor/hyresratt.pdf"
    terms_link_text="Fullständiga villkor"
    terms_link_2="https://www.hedvig.com/villkor/villkor/hyresratt.pdf"
    terms_link_text_2="Villkor för reseskydd"
    terms_link_3=""
    terms_link_text_3=""
    presale_info_link="https://www.hedvig.com/villkor/forkopsinformation-eu/hyresratt.pdf"
    presale_info_link_text="Förköpsinformation"
    cta_link="#"
    cta_text="Skaffa"
  />
)
