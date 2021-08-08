import React, { useRef, useEffect, useState } from 'react'
import Head from '@docusaurus/Head'

import useThemeContext from '@theme/hooks/useThemeContext'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loader from '@theme/Loaders'
import './styles.module.css'
import localApi from '/cardfactory.json'

const customThemeColors = {
  'darkmode-background': '#121E24',
  'xp-primary-500': '#FFCC00',
  'xp-tertiaries': {
    'primary-ciel': '#63C2C7',
    'secondary-blue': '#006D8C',
  },
}

const Rapidoc = ({ apiUrl }) => {
  const { isDarkTheme } = useThemeContext()
  const { siteConfig } = useDocusaurusContext()
  const baseAPIUrl = siteConfig.themeConfig.baseAPIUrl
  const fullAPIUrl = `${baseAPIUrl}${apiUrl}`

  // Rapidoc rendering
  const rapidocRef = useRef()
  const [renderRapidoc, setRenderRapidoc] = useState(false)

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      require('rapidoc')
    }
  }, [])

  // React Query
  const fetchAPI = async () => {
    try {
      const response = await axios.get(fullAPIUrl)
      return response.data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const { isLoading, isError, data, error } = useQuery(
    ['fetchAPI', { apiUrl }],
    fetchAPI,
    {
      retry: false,
    },
  )

  // Rapidoc parsing
  const loadRapidocSpec = async (stringifiedData) => {
    await rapidocRef.current.loadSpec(stringifiedData)
  }

  useEffect(() => {
    if (data) {
      data.components.securitySchemes['Sts authentication']['x-client-id'] =
        'Swagman'
      data.components.securitySchemes['Sts authentication']['x-client-secret'] =
        'Swagman'
      delete data.components.securitySchemes['Bearer token authorization']

      console.log(data)
      const stringifiedData = JSON.stringify(data)

      if (rapidocRef.current) {
        loadRapidocSpec(JSON.parse(stringifiedData))

        const handleRenderRapidoc = (e) => {
          setRenderRapidoc(true)
        }

        rapidocRef.current.addEventListener(
          'before-render',
          handleRenderRapidoc,
        )

        setRenderRapidoc(true)

        // Cleanup
        return () => {
          rapidocRef.current.removeEventListener(
            'before-render',
            handleRenderRapidoc,
          )
        }
      }
    }
  }, [data])

  return (
    <>
      <Head>
        <style>{'body { overflow: visible; }'}</style>
        <body className="api"></body>
      </Head>

      <div className="flex items-center justify-center p-5 lg:p-0">
        {(isLoading || (!renderRapidoc && !isError)) && (
          <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <Loader />
            <div className="mt-4 font-semibold ">Fetching API...</div>
          </div>
        )}
        {isError && (
          <div className="absolute flex flex-col items-center text-red-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div className="font-bold ">Error: </div>
            <div>{error.message}</div>
          </div>
        )}
        <div
          style={{
            visibility:
              !renderRapidoc || isError || isLoading ? 'hidden' : 'visible',
          }}
        >
          {/*
         https://demo.identityserver.io/ */}
          {/* spec-url="https://mrin9.github.io/RapiDoc/specs/oauth.yaml" */}
          <rapi-doc
            // spec-url="https://mrin9.github.io/RapiDoc/specs/oauth.yaml"
            ref={rapidocRef}
            theme={isDarkTheme ? 'dark' : 'light'}
            // server-url="https://ic-api.s-money.net/swagger/docs"
            // server-url="https://ic-api.s-money.net"
            // server-url="https://ic-connect.s-money.net"
            // server-url="https://ic-connect.s-money.net/connect/token"
            bg-color={
              isDarkTheme ? customThemeColors['darkmode-background'] : '#fff'
            }
            nav-bg-color={isDarkTheme ? '#081014' : '#f7f7f7'}
            nav-text-color={isDarkTheme ? '#ffffff' : '#000000'}
            nav-accent-color={
              isDarkTheme
                ? customThemeColors['xp-tertiaries']['primary-ciel']
                : customThemeColors['xp-tertiaries']['secondary-blue']
            }
            nav-item-spacing="relaxed"
            layout="row"
            sort-tags="true"
            render-style="read"
            allow-server-selection="false"
            // allow-authentication="false"
            // api-key-name="api_key"
            // api-key-location="header"
            // api-key-value="-"
            // fetch-credentials="include"
            load-fonts="false"
            regular-font="Poppins"
            primary-color="#63C2C7"
            show-header="false"
            show-info="true"
            show-components="false"
            allow-api-list-style-selection="false"
            style={{ height: 'calc(100vh - 60px)', width: '100%' }}
          ></rapi-doc>
        </div>
      </div>
    </>
  )
}

export default Rapidoc
