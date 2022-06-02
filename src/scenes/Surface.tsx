import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'

import 'rc-dock/dist/rc-dock.css'

import { DraggableContainer } from '@/components/draggable-container'
import { useSnapshot } from 'valtio'
import { tabs } from '@/states/tabs'
import { LayoutData } from 'rc-dock'

export interface SurfaceHandle {
  addWidget: () => void
}

export const Surface = forwardRef(
  (props, ref) => {
    const tabSnap = useSnapshot(tabs)

    return (
      <Box h="100%" w="100%" position="relative">
        <DraggableContainer draggableRef={ref} />
      </Box>
    )
  }
)
