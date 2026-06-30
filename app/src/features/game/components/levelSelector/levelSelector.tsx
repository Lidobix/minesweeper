'use client'
import { memo, useCallback } from 'react'
import styles from './levelSelector.module.css'
import { LevelSelectorProps, LevelType } from '../../types'
import { useGame } from '../../hooks/useGame'

interface LevelInputProps {
  toggle: (level: LevelType) => void
  level: LevelType
}

const RawLevelInput = ({ toggle, level }: LevelInputProps) => {
  console.log('levelinput')
  const handleClick = useCallback(() => {
    toggle(level)
  }, [toggle, level])

  return (
    <div style={{ fontSize: '1rem' }}>
      <input type="radio" checked={level.selected} onChange={handleClick} />
      <label htmlFor={level.value}>{level.value}</label>
    </div>
  )
}
//
const LevelInput = memo(RawLevelInput)

const RawLevelSelector = ({ style }: LevelSelectorProps) => {
  const { levels, selectLevel } = useGame()
  console.log('LevelSelector', levels, selectLevel)
  const toggleLevel = useCallback(
    (level: LevelType) => {
      selectLevel(level)
    },
    [selectLevel],
  )

  return (
    <div className={styles.main_container} style={{ ...style }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {levels.map((level, index) => (
          <LevelInput
            key={index}
            level={level}
            toggle={toggleLevel}
          ></LevelInput>
        ))}
      </div>
    </div>
  )
}

const LevelSelector = memo(RawLevelSelector)
export default LevelSelector
