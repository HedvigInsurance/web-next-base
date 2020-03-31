import styled from '@emotion/styled'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { Peril, TypeOfContract } from './types'

interface Props {
  insuranceType: TypeOfContract
}

export const Perils: React.FC<Props> = ({ insuranceType }) => {
  const [perils, setPerils] = useState<[] | Peril[]>([])
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)

  useEffect(() => {
    const fetchPerils = async () => {
      const url = `https://graphql.dev.hedvigit.com/graphql`
      const data = `{"operationName":"Perils","variables":{"typeOfContract":"${insuranceType}","locale":"sv_SE"},"query":"query Perils($typeOfContract: TypeOfContract!, $locale: Locale!) {\\n perils(contractType: $typeOfContract, locale: $locale) {\\n title\\n description\\n covered\\n icon {\\n variants {\\n light {\\n svgUrl\\n }\\n }\\n }\\n }\\n}\\n"}`
      try {
        const perilsRequest = await axios.post(url, data, {
          withCredentials: false,
          headers: {
            Accept: '*/*',
            'content-type': 'application/json',
          },
        })
        const perilsData = await perilsRequest.data.data.perils
        setPerils(perilsData)
      } catch (e) {
        throw e
      }
    }

    fetchPerils()
  }, [insuranceType])

  return (
    <>
      <PerilCollection
        perils={perils}
        setCurrentPeril={setCurrentPeril}
        setIsShowingPeril={setIsShowingPeril}
      />
      {/* TODO Add Peril modal */}
    </>
  )
}
