import React, { useState } from 'react'
import './App.css'

const Tabs = props => {
  const [activeIndex, setActiveIndex] = useState(0)
  const children = React.Children.map(props.children, child => {
    if (child.type === TabPanels) {
      return React.cloneElement(child, { activeIndex })
    } else if (child.type === TabList) {
      return React.cloneElement(child, {
        activeIndex,
        onActiveTab: activeIndex => setActiveIndex(activeIndex),
      })
    } else {
      return child
    }
  })
  return <div>{children}</div>
}

const TabList = ({ activeIndex, onActiveTab, ...props }) => {
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      onActivate: () => onActiveTab(index),
    })
  })
  return <div className="tab-list">{children}</div>
}

const Tab = ({ isDisabled, isActive, onActivate, children }) => {
  const style = isDisabled ? 'disabled-tab' : isActive ? 'active-tab' : 'tab'
  return (
    <div className={style} onClick={isDisabled ? null : () => onActivate()}>
      {children}
    </div>
  )
}

const TabPanels = ({ activeIndex, children }) => (
  <div className="tab-panels">{children[activeIndex]}</div>
)

const TabPanel = ({ children }) => <div>{children}</div>

function App() {
  return (
    <div className="app">
      <Tabs>
        <TabList>
          <Tab>Tacos</Tab>
          <Tab isDisabled>Burritos</Tab>
          <Tab>Coconut Korma</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Tacos are delicious</p>
          </TabPanel>
          <TabPanel>
            <p>Sometimes a burrito is what you really need</p>
          </TabPanel>
          <TabPanel>Might be your best option</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default App
